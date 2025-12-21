import { Fragment, useCallback, useEffect, useRef, useState, lazy, Suspense } from "react";
import Transcript from "./features/voice/Transcript.jsx";
import { useDeepgram } from "../context/DeepgramContextProvider";
import { useMicrophone } from "../context/MicrophoneContextProvider.jsx";
import { EventType, useVoiceBot, VoiceBotStatus } from "../context/VoiceBotContextProvider";
import { createAudioBuffer, playAudioBuffer } from "../utils/audioUtils";
import { sendSocketMessage, sendMicToSocket } from "../utils/deepgramUtils";
import { isMobile } from "react-device-detect";
import { usePrevious } from "@uidotdev/usehooks";
import { useStsQueryParams } from "../hooks/UseStsQueryParams";
import RateLimited from "./RateLimited.tsx";
import { searchKb } from "../lib/kbSearch.ts";

const AnimationManager = lazy(() => import("./layout/AnimationManager.tsx"));

export const App = ({
  defaultStsConfig,
  onMessageEvent = () => { },
  requiresUserActionToInitialize = false,
  className = "",
}) => {
  const {
    status,
    messages,
    addVoicebotMessage,
    addBehindTheScenesEvent,
    isWaitingForUserVoiceAfterSleep,
    toggleSleep,
    startListening,
    startSpeaking,
  } = useVoiceBot();
  const {
    setupMicrophone,
    microphone,
    microphoneState,
    processor,
    microphoneAudioContext,
    startMicrophone,
  } = useMicrophone();
  const { socket, connectToDeepgram, socketState, rateLimited } = useDeepgram();
  const { voice, instructions, applyParamsToConfig } = useStsQueryParams();
  const audioContext = useRef(null);
  const agentVoiceAnalyser = useRef(null);
  const userVoiceAnalyser = useRef(null);
  const startTimeRef = useRef(-1);
  const [data, setData] = useState();
  const [isInitialized, setIsInitialized] = useState(requiresUserActionToInitialize ? false : null);
  const previousVoice = usePrevious(voice);
  const previousInstructions = usePrevious(instructions);
  const scheduledAudioSources = useRef([]);
  const [isRootPath, setIsRootPath] = useState(window.location.pathname === "/");

  // AUDIO MANAGEMENT
  /**
   * Initialize the audio context for managing and playing audio. (just for TTS playback; user audio input logic found in Microphone Context Provider)
   */
  useEffect(() => {
    if (!audioContext.current) {
      audioContext.current = new (window.AudioContext || window.webkitAudioContext)({
        latencyHint: "interactive",
        sampleRate: 24000,
      });
      agentVoiceAnalyser.current = audioContext.current.createAnalyser();
      agentVoiceAnalyser.current.fftSize = 2048;
      agentVoiceAnalyser.current.smoothingTimeConstant = 0.96;
    }
  }, []);

  /**
   * Callback to handle audio data processing and playback.
   * Converts raw audio into an AudioBuffer and plays the processed audio through the web audio context
   */
  const bufferAudio = useCallback((data) => {
    const audioBuffer = createAudioBuffer(audioContext.current, data);
    if (!audioBuffer) return;
    scheduledAudioSources.current.push(
      playAudioBuffer(audioContext.current, audioBuffer, startTimeRef, agentVoiceAnalyser.current),
    );
  }, []);

  const clearAudioBuffer = () => {
    scheduledAudioSources.current.forEach((source) => source.stop());
    scheduledAudioSources.current = [];
  };

  const formatSlotRange = useCallback((startIso, endIso) => {
    try {
      const start = new Date(startIso);
      const end = new Date(endIso);
      const dayFmt = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        timeZone: "America/Chicago",
      });
      const timeFmt = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone: "America/Chicago",
      });
      return `${dayFmt.format(start)} ${timeFmt.format(start)} - ${timeFmt.format(end)}`;
    } catch {
      return `${startIso} - ${endIso}`;
    }
  }, []);

  const handleFunctionCallRequest = useCallback(
    async (message) => {
      if (!socket) return false;
      if (message?.type !== "FunctionCallRequest") return false;

      for (const func of message.functions ?? []) {
        try {
          const args = JSON.parse(func.arguments ?? "{}");

          if (func?.name === "search_kb") {
            const query = String(args.query ?? "");
            const hits = searchKb(query, 4);
            sendSocketMessage(socket, {
              type: "FunctionCallResponse",
              id: func.id,
              name: "search_kb",
              content: JSON.stringify({ query, hits }, null, 2),
            });
            continue;
          }

          if (func?.name === "check_availability") {
            const date = String(args.date ?? "");
            const resp = await fetch("/api/check-availability", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ date }),
            });
            const json = await resp.json().catch(() => ({}));
            if (!resp.ok || !json?.success) {
              throw new Error(json?.error || `check_availability failed (status ${resp.status})`);
            }

            const slots = Array.isArray(json.slots) ? json.slots : [];
            const formatted = slots.slice(0, 6).map((startIso) => {
              const start = new Date(startIso);
              const end = new Date(start.getTime() + 90 * 60 * 1000);
              return {
                label: formatSlotRange(start.toISOString(), end.toISOString()),
                startTime: start.toISOString(),
                endTime: end.toISOString(),
              };
            });

            const content =
              formatted.length === 0
                ? `No openings found for ${date}. Ask for a different date.`
                : [
                  `Available 90-minute slots for ${date} (Central Time - Texas):`,
                  ...formatted.map(
                    (s, i) => `${i + 1}) ${s.label}\n   startTime: ${s.startTime}\n   endTime: ${s.endTime}`,
                  ),
                ].join("\n");

            sendSocketMessage(socket, {
              type: "FunctionCallResponse",
              id: func.id,
              name: "check_availability",
              content,
            });
            continue;
          }

          if (func?.name === "book_appointment") {
            const payload = {
              startTime: String(args.startTime ?? ""),
              endTime: String(args.endTime ?? ""),
              customerName: String(args.customerName ?? ""),
              customerPhone: String(args.customerPhone ?? ""),
              serviceType: String(args.serviceType ?? ""),
            };

            const resp = await fetch("/api/book-appointment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            });
            const json = await resp.json().catch(() => ({}));
            if (!resp.ok || !json?.success) {
              throw new Error(json?.error || `book_appointment failed (status ${resp.status})`);
            }

            const start = String(json?.event?.start?.dateTime ?? payload.startTime);
            const end = String(json?.event?.end?.dateTime ?? new Date(new Date(payload.startTime).getTime() + 90 * 60 * 1000).toISOString());
            const label = formatSlotRange(start, end);
            sendSocketMessage(socket, {
              type: "FunctionCallResponse",
              id: func.id,
              name: "book_appointment",
              content: `Booked successfully: ${label}.`,
            });
            continue;
          }

          // Unknown function: reply so the agent doesn't hang.
          sendSocketMessage(socket, {
            type: "FunctionCallResponse",
            id: func.id,
            name: func?.name ?? "unknown",
            content: `Unknown function: ${String(func?.name)}`,
          });
        } catch (e) {
          sendSocketMessage(socket, {
            type: "FunctionCallResponse",
            id: func?.id ?? "unknown",
            name: func?.name ?? "unknown",
            content: e instanceof Error ? e.message : String(e),
          });
        }
      }

      return true;
    },
    [socket, formatSlotRange],
  );

  // MICROPHONE AND SOCKET MANAGEMENT
  useEffect(() => {
    console.log('Initial setup - calling setupMicrophone()');
    // Only setup if not already in progress
    if (microphoneState === null) {
      setupMicrophone();
    }
  }, [microphoneState]);

  useEffect(() => {
    console.log('Microphone state changed:', { microphoneState, hasSocket: !!socket, hasConfig: !!defaultStsConfig });
    if (microphoneState === 1 && socket && defaultStsConfig) {
      const onOpen = () => {
        console.log('Socket opened - sending Settings message');
        console.log('Config has functions:', defaultStsConfig.agent.think.functions?.length || 0);
        console.log('Config has greeting:', !!defaultStsConfig.agent.greeting);
        const combinedStsConfig = {
          ...defaultStsConfig,
          agent: {
            ...defaultStsConfig.agent,
            // Preserve all agent properties
            language: defaultStsConfig.agent.language,
            think: {
              ...defaultStsConfig.agent.think,
              prompt: instructions ? `${defaultStsConfig.agent.think.prompt}\n${instructions}` : defaultStsConfig.agent.think.prompt,
              // Explicitly preserve functions array
              functions: defaultStsConfig.agent.think.functions || [],
            },
            greeting: defaultStsConfig.agent.greeting,
            speak: defaultStsConfig.agent.speak,
            listen: defaultStsConfig.agent.listen,
          },
        };
        console.log('Sending config with functions:', combinedStsConfig.agent.think.functions?.length || 0);
        sendSocketMessage(socket, combinedStsConfig);

        // Wait for Settings to be processed before starting microphone
        setTimeout(() => {
          console.log('Starting microphone after Settings sent');
          startMicrophone();
          if (isRootPath) {
            startSpeaking(true);
            isWaitingForUserVoiceAfterSleep.current = false;
          } else {
            startListening(true);
          }
        }, 1000); // Give a small delay to ensure Settings is processed
      };

      socket.addEventListener("open", onOpen);
      return () => {
        socket.removeEventListener("open", onOpen);
        microphone.ondataavailable = null;
      };
    }
  }, [microphone, socket, microphoneState, defaultStsConfig, isRootPath]);

  useEffect(() => {
    console.log('Checking processor setup:', {
      hasMicrophone: !!microphone,
      hasSocket: !!socket,
      microphoneState,
      socketState
    });
    if (!microphone) return;
    if (!socket) return;
    if (microphoneState !== 2) return;
    if (socketState !== 1) return;

    // Only set up audio processor after Settings has been sent
    const setupProcessor = () => {
      console.log('Setting up audio processor');
      processor.onaudioprocess = sendMicToSocket(socket);
    };

    // Add a small delay to ensure Settings is processed
    setTimeout(setupProcessor, 1500);
  }, [microphone, socket, microphoneState, socketState, processor]);

  /**
   * Create AnalyserNode for user microphone audio context.
   * Exposes audio time / frequency data which is used in the
   * AnimationManager to scale the animations in response to user/agent voice
   */
  useEffect(() => {
    if (microphoneAudioContext) {
      userVoiceAnalyser.current = microphoneAudioContext.createAnalyser();
      userVoiceAnalyser.current.fftSize = 2048;
      userVoiceAnalyser.current.smoothingTimeConstant = 0.96;
      microphone.connect(userVoiceAnalyser.current);
    }
  }, [microphoneAudioContext, microphone]);

  /**
   * Handles incoming WebSocket messages. Differentiates between ArrayBuffer data and other data types (basically just string type).
   * */
  const onMessage = useCallback(
    async (event) => {
      if (event.data instanceof ArrayBuffer) {
        // Sometimes Deepgram sends JSON as binary frames; try parsing before treating as audio.
        try {
          const text = new TextDecoder().decode(event.data);
          if (text && (text.trimStart().startsWith("{") || text.trimStart().startsWith("["))) {
            const message = JSON.parse(text);
            if (await handleFunctionCallRequest(message)) return;
          }
        } catch {
          // fall through to audio
        }
        if (status !== VoiceBotStatus.SLEEPING && !isWaitingForUserVoiceAfterSleep.current) {
          bufferAudio(event.data); // Process the ArrayBuffer data to play the audio
        }
      } else {
        console.log(event?.data);
        // Handle other types of messages such as strings
        setData(event.data);
        onMessageEvent(event.data);

        // Also handle function calls if they come as string frames.
        try {
          const message = JSON.parse(event.data);
          await handleFunctionCallRequest(message);
        } catch {
          // ignore non-JSON
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [bufferAudio, status, handleFunctionCallRequest],
  );

  /**
   * Opens Deepgram when the microphone opens.
   * Runs whenever `microphone` changes state, but exits if no microphone state.
   */
  useEffect(() => {
    if (
      microphoneState === 1 &&
      socketState === -1 &&
      (!requiresUserActionToInitialize || (requiresUserActionToInitialize && isInitialized))
    ) {
      connectToDeepgram();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    microphone,
    socket,
    microphoneState,
    socketState,
    isInitialized,
    requiresUserActionToInitialize,
  ]);

  /**
   * Sets up a WebSocket message event listener to handle incoming messages through the 'onMessage' callback.
   */
  useEffect(() => {
    if (socket) {
      socket.addEventListener("message", onMessage);
      return () => socket.removeEventListener("message", onMessage);
    }
  }, [socket, onMessage]);

  useEffect(() => {
    if (previousVoice && previousVoice !== voice && socket && socketState === 1) {
      sendSocketMessage(socket, {
        type: "UpdateSpeak",
        model: voice,
      });
    }
  }, [voice, socket, socketState, previousVoice]);

  const handleUpdateInstructions = useCallback(
    (instructions) => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        sendSocketMessage(socket, {
          type: "UpdateInstructions",
          prompt: `${defaultStsConfig.agent.think.prompt}\n${instructions}`,
        });
      }
    },
    [socket, defaultStsConfig]
  );

  /**
   * Manage responses to incoming data from WebSocket.
   * This useEffect primarily handles string-based data that is expected to represent JSON-encoded messages determining actions based on the nature of the message
   * */
  useEffect(() => {
    /**
     * When the API returns a message event, several possible things can occur.
     *
     * 1. If it's a user message, check if it's a wake word or a stop word and add it to the queue.
     * 2. If it's an agent message, add it to the queue.
     * 3. If the message type is `AgentAudioDone` switch the app state to `START_LISTENING`
     */

    if (typeof data === "string") {
      const userRole = (data) => {
        const userTranscript = data.content;

        /**
         * When the user says something, add it to the conversation queue.
         */
        if (status !== VoiceBotStatus.SLEEPING) {
          addVoicebotMessage({ user: userTranscript });
        }
      };

      /**
       * When the assistant/agent says something, add it to the conversation queue.
       */
      const assistantRole = (data) => {
        if (status !== VoiceBotStatus.SLEEPING && !isWaitingForUserVoiceAfterSleep.current) {
          startSpeaking();
          const assistantTranscript = data.content;
          addVoicebotMessage({ assistant: assistantTranscript });
        }
      };

      try {
        const parsedData = JSON.parse(data);

        /**
         * Nothing was parsed so return an error.
         */
        if (!parsedData) {
          throw new Error("No data returned in JSON.");
        }

        maybeRecordBehindTheScenesEvent(parsedData);

        /**
         * If it's a user message.
         */
        if (parsedData.role === "user") {
          startListening();
          userRole(parsedData);
        }

        /**
         * If it's an agent message.
         */
        if (parsedData.role === "assistant") {
          if (status !== VoiceBotStatus.SLEEPING) {
            startSpeaking();
          }
          assistantRole(parsedData);
        }

        /**
         * The agent has finished speaking so we reset the sleep timer.
         */
        if (parsedData.type === EventType.AGENT_AUDIO_DONE) {
          // Note: It's not quite correct that the agent goes to the listening state upon receiving
          // `AgentAudioDone`. When that message is sent, it just means that all of the agent's
          // audio has arrived at the client, but the client will still be in the process of playing
          // it, which means the agent is still speaking. In practice, with the way the server
          // currently sends audio, this means Talon will deem the agent speech finished right when
          // the agent begins speaking the final sentence of its reply.
          startListening();
        }
        if (parsedData.type === EventType.USER_STARTED_SPEAKING) {
          isWaitingForUserVoiceAfterSleep.current = false;
          startListening();
          clearAudioBuffer();
        }
        if (parsedData.type === EventType.AGENT_STARTED_SPEAKING) {
          const { tts_latency, ttt_latency, total_latency } = parsedData;
          if (!tts_latency || !ttt_latency) return;
          const latencyMessage = { tts_latency, ttt_latency, total_latency };
          addVoicebotMessage(latencyMessage);
        }
      } catch (error) {
        console.error(data, error);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, socket]);

  const handleVoiceBotAction = () => {
    if (requiresUserActionToInitialize && !isInitialized) {
      setIsInitialized(true);
    }

    if (status !== VoiceBotStatus.NONE) {
      toggleSleep();
    }
  };

  const maybeRecordBehindTheScenesEvent = (serverMsg) => {
    switch (serverMsg.type) {
      case EventType.SETTINGS_APPLIED:
        addBehindTheScenesEvent({
          type: EventType.SETTINGS_APPLIED,
        });
        break;
      case EventType.USER_STARTED_SPEAKING:
        if (status === VoiceBotStatus.SPEAKING) {
          addBehindTheScenesEvent({
            type: "Interruption",
          });
        }
        addBehindTheScenesEvent({
          type: EventType.USER_STARTED_SPEAKING,
        });
        break;
      case EventType.AGENT_STARTED_SPEAKING:
        addBehindTheScenesEvent({
          type: EventType.AGENT_STARTED_SPEAKING,
        });
        break;
      case EventType.CONVERSATION_TEXT: {
        const role = serverMsg.role;
        const content = serverMsg.content;
        addBehindTheScenesEvent({
          type: EventType.CONVERSATION_TEXT,
          role: role,
          content: content,
        });
        break;
      }
      case EventType.END_OF_THOUGHT:
        addBehindTheScenesEvent({
          type: EventType.END_OF_THOUGHT,
        });
        break;
    }
  };

  const handleInitialize = async () => {
    if (!isInitialized) {
      setIsInitialized(true);
      await setupMicrophone();
    }
  };

  if (requiresUserActionToInitialize && !isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <button
          onClick={handleInitialize}
          className="px-4 py-2 bg-amber-500 text-black font-semibold rounded hover:bg-amber-400"
        >
          Start Voice Assistant
        </button>
      </div>
    );
  }

  if (rateLimited) {
    return <RateLimited />;
  }

  // MAIN UI
  return (
    <div className={className}>
      <div className="w-full flex items-center justify-center py-5">
        <div className="text-center">
          <div className="text-xs tracking-[0.25em] text-gray-400">VOICE AGENT DEMO</div>
          <h1 className="text-3xl font-semibold text-gray-100 mt-2">EquipTech Dental</h1>
          <div className="text-sm text-gray-400 mt-2">
            You’re connected to the EquipTech Dental Service Coordinator. Talk naturally—she’ll keep replies short and booking-focused.
          </div>
        </div>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <AnimationManager
          agentVoiceAnalyser={agentVoiceAnalyser.current}
          userVoiceAnalyser={userVoiceAnalyser.current}
          onOrbClick={toggleSleep}
        />
        {!microphone ? (
          <div className="text-base text-gray-400 text-center w-full">Loading microphone...</div>
        ) : (
          <Fragment>
            {socketState === 0 && (
              <div className="text-base text-gray-400 text-center w-full">Loading Deepgram...</div>
            )}
            {socketState > 0 && status === VoiceBotStatus.SLEEPING && (
              <div className="text-xl flex flex-col items-center justify-center">
                <div className="text-gray-400 text-sm">
                  I've stopped listening. {isMobile ? "Tap" : "Click"} the orb to resume.
                </div>
              </div>
            )}

            <div className="w-full max-w-4xl mx-auto mt-8">
              <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6">
                <div className="text-sm text-gray-300">
                  <span className="text-gray-400">Tip:</span> Click the orb to pause/resume listening.
                </div>
              </div>
            </div>

            {/* Transcript Section */}
            <div className="text-sm md:text-base mt-2 flex flex-col items-center text-gray-200 overflow-y-auto">
              {messages.length > 0 ? <Transcript /> : null}
            </div>
          </Fragment>
        )}
      </Suspense>
    </div>
  );
};

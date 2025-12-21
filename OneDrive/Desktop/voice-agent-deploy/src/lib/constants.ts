import { type StsConfig, type Voice } from "../utils/deepgramUtils";

// Knowledge base retrieval (client-side). Keep this lightweight for low latency.
export const knowledgeBaseFunction = {
  name: "search_kb",
  description:
    "Search EquipTech Dental's knowledge base for service policies, equipment types we support, warranty coverage, availability guidelines, and maintenance offerings. Returns short, relevant snippets to answer company-specific questions.",
  parameters: {
    type: "object",
    properties: {
      query: {
        type: "string",
        description: "What to look up in the knowledge base",
      },
    },
    required: ["query"],
  },
};

export const calendarFunctions = [
  {
    name: "check_availability",
    description:
      "Check available appointment time slots for dental equipment service calls. Call this when a practice asks about availability or wants to schedule service.",
    parameters: {
      type: "object",
      properties: {
        date: {
          type: "string",
          description: "The date to check in YYYY-MM-DD format",
        },
      },
      required: ["date"],
    },
  },
  {
    name: "book_appointment",
    description:
      "Book a confirmed service appointment after the practice agrees to a time. Only call this after confirming all details: practice name, address, phone, equipment type, and problem description.",
    parameters: {
      type: "object",
      properties: {
        startTime: {
          type: "string",
          description: "ISO datetime string for appointment start",
        },
        endTime: {
          type: "string",
          description: "ISO datetime string for appointment end",
        },
        customerName: {
          type: "string",
          description: "Practice name or contact person's full name",
        },
        customerPhone: {
          type: "string",
          description: "Practice phone number",
        },
        serviceType: {
          type: "string",
          description: "Type of service (e.g., 'Emergency repair - Dental chair', 'Scheduled maintenance - X-ray unit', 'Handpiece repair - Expedited')",
        },
      },
      required: ["startTime", "endTime", "customerName", "customerPhone", "serviceType"],
    },
  },
];

const equipTechPrompt = `You are the EquipTech Dental Service Coordinator for EquipTech Dental, a certified local dental equipment repair and maintenance company that supports Chicago and surrounding suburbs.

PRIMARY GOAL
Triage every call: determine if it is an emergency needing immediate dispatch or a scheduled visit, collect the practice details and equipment context, and book service confidently using the calendar tools.

STYLE (CRITICAL)
- Keep replies to 1–2 short sentences unless the caller explicitly asks for more.
- Ask exactly one question per turn.
- Sound professional, calm, and reassuring.
- Reference the equipment type naturally.
- Use the caller’s name at most twice.
- Never say “as an AI,” invent availability, or overwhelm with long lists.

PRE-CALL DATA (may be empty)
Practice name: {{Practice_Name}}
Contact phone: {{phone_number}}
Equipment: {{Equipment_Type}}
Issue: {{Problem_Description}}

DEFAULT OPEN
"Hi, this is EquipTech Dental. I understand you need equipment service—do you have a quick minute?"

TRIAGE PROCESS (FIRST QUESTION)
"Is this an emergency that needs immediate attention, or can we schedule a service visit?"
- Emergency: "I'll get a technician out right away—let me gather the critical details and mark this urgent."
- Scheduled: "Perfect, let me get you on the schedule."

INFORMATION COLLECTION (ONE QUESTION AT A TIME)
1) "What's the name of your dental practice?"
2) "Can I get the full address where the equipment is located?"
3) "What's the best phone number to reach you?"
4) "What equipment needs service?" (Listen for dental chairs, compressors, X-ray units, sterilizers, sensors, delivery systems, lights, ultrasonic cleaners, Cavitrons, cabinetry, electrical or plumbing systems, handpiece tubing, vacuum tubing or canisters, autoclaves, film processors, scalers, model trimmers, full clinic setups, back-up generators, and related fixtures.)
5) "Do you know the brand or model?"
6) "Can you describe the problem or symptoms?"
7) "What's your preferred date and time for service?"

HANDPIECE REPAIR FOCUS
When the issue is a handpiece or other high-speed device:
- "Do you need expedited turnaround? We can prioritize same-day repairs when crews are available."
- "Would you like information about our preventative maintenance plans or recurring service?"

SETTING EXPECTATIONS
- "Our standard turnaround is 24-72 hours. Same-day is available for emergencies."
- "We use genuine parts, and our workmanship is backed by a strong warranty."
- "For lengthy repairs we can keep you running with loaner gear—would that help while yours is in service?"

ADDITIONAL SERVICES TO MENTION (when relevant)
- Preventative maintenance plans to keep equipment reliable.
- Chair reupholstering to refresh operatories without replacing the whole chair.
- Loaner or rental equipment while extensive repairs take place.

BOOKING WORKFLOW (Benco-style service capture)
Ask "Want me to check our availability?" then:
1) Ask for a date (YYYY-MM-DD). If they name a day without a year (e.g., "Oct 28"), infer the next upcoming date and include the year.
2) Call 'check_availability' with the full YYYY-MM-DD (Central Time - Chicago).
3) Offer 2-3 available 90-minute windows returned by the tool.
4) Confirm practice name, address, phone, equipment type, and problem description before booking.
5) Only after explicit agreement call 'book_appointment' and include the service type (note "Emergency" when urgent).
6) After booking, confirm in one short sentence ("You're set for [date] at [time] to service [equipment].").

EMERGENCIES
- Collect every detail but emphasize urgency: "I'm marking this urgent and dispatching a technician within the hour."
- Use the calendar tools to lock in a slot quickly and mark the service type as urgent.

PRICING (ONLY WHEN ASKED)
- "We share transparent pricing once we diagnose the repair."
- "Final cost depends on the exact equipment and issue; we’ll confirm before work starts."

OBJECTIONS
- Too expensive: "I understand. I can provide a detailed estimate before the technician arrives—will that help?"
- Need to think: "No problem. Want me to text you the service summary and availability?"
- Not interested: "Totally get it. If anything changes you can reach us at the number you called. Have a great day!"

KEY PHRASES TO USE NATURALLY
- "Our certified technicians are equipped to get the job done right the first time, minimizing your downtime."
- "We use high-quality, genuine parts, and our workmanship is backed by a strong warranty."
- "For urgent handpiece repairs, we offer expedited turnaround options to get you back on schedule quickly."
- "Beyond repairs, we can help with preventative maintenance plans and even reupholster your chairs to refresh your operatories at a fraction of the cost of replacement."
- "We can provide loaner equipment if a repair will take a few days."
- "This is EquipTech Dental—we prioritize fast, reliable, local support with certified experts."

TOOL (FAST)
If the customer asks about EquipTech-specific policies, coverage area, equipment list, warranties, or turnaround, call 'search_kb' with that query and answer using the returned snippets. If 'search_kb' comes back empty, ask a clarifying question.

CONFIRMATION ENDING
Always close with: "Perfect! I've got everything scheduled. Our technician will arrive at [time] on [date] to service your [equipment type]. You'll receive a confirmation text shortly. Is there anything else I can help with today?"

IMPORTANT REMINDERS
- Always call 'check_availability' before offering times.
- Use Central Time (Chicago) for scheduling.
- Never invent open slots or mention availability without tool data.
- Ask questions one at a time and keep responses short.
- Sound confident, calm, and professional.`;

const baseConfig = {
  type: "Settings",
  experimental: false,
  mip_opt_out: false,
  audio: {
    input: {
      encoding: "linear16",
      sample_rate: 16000
    },
    output: {
      encoding: "linear16",
      sample_rate: 24000,
      container: "none"
    }
  },
  agent: {
    language: "en",
    listen: {
      provider: {
        type: "deepgram",
        model: "nova-3"
      }
    },
    think: {
      provider: {
        type: "open_ai",
        model: "gpt-4",
        temperature: 0.7
      },
      prompt: equipTechPrompt,
      functions: [...calendarFunctions, knowledgeBaseFunction]
    },
    speak: {
      provider: {
        type: "deepgram",
        model: "aura-2-vesta-en"
      }
    },
    greeting: "Hi, this is EquipTech Dental. I’m standing by to coordinate your equipment service—do you have a quick minute?"
  }
};

// Update the stsConfig to use the function definitions
export const stsConfig: StsConfig = {
  type: "Settings",
  experimental: false,
  mip_opt_out: false,
  audio: {
    input: {
      encoding: "linear16",
      sample_rate: 16000
    },
    output: {
      encoding: "linear16",
      sample_rate: 24000,
      container: "none"
    }
  },
  agent: {
    language: "en",
    listen: {
      provider: {
        type: "deepgram",
        model: "nova-3"
      }
    },
    think: {
      provider: {
        type: "open_ai",
        model: "gpt-4o-mini",
        temperature: 0.7
      },
      prompt: equipTechPrompt,
      functions: [...calendarFunctions, knowledgeBaseFunction]
    },
    speak: {
      provider: {
        type: "deepgram",
        model: "aura-2-vesta-en"
      }
    },
    greeting: "Hi, this is EquipTech Dental. I’m standing by to coordinate your equipment service—do you have a quick minute?"
  }
};

// Drive-thru constants
export const driveThruStsConfig = (id: string, menu: string): StsConfig => ({
  ...baseConfig,
  context: {
    messages: [
      {
        role: "assistant",
        content: "Welcome to the Krusty Krab drive-thru. What can I get for you today?",
      },
    ],
    replay: true,
  },
  agent: {
    ...baseConfig.agent,
    think: {
      ...baseConfig.agent.think,
      instructions:
        "You work taking orders at a drive-thru. Only respond in 2-3 sentences at most. Don't mention prices until the customer confirms that they're done ordering. The menu, including the names, descriptions, types, and prices for the items that you sell, is as follows:" +
        id + menu,
      functions: [
        {
          name: "add_item_to_order",
          description:
            "Adds an item to the customer's order. The item must be on the menu. The tool will add the requested menu item to the customer's order. It should only be used when the user explicitly asks for a particular item. Only add the exact item a customer asks for.",
          parameters: {
            type: "object",
            properties: {
              item: {
                type: "string",
                description:
                  "The name of the item that the user would like to order. The valid values come from the names of the items on the menu.",
              },
            },
            required: ["item"],
          },
        },
        {
          name: "get_order",
          description:
            "Gets the order, including all items and their prices. Use this function when cross-checking things like the total cost of the order, or items included in the order.",
          parameters: {
            type: "object",
            properties: {},
            required: [],
          },
        },
        {
          name: "remove_item_from_order",
          description:
            "Removes an item to the customer's order. The item must be on the menu and in the order. The tool will remove the requested menu item from the customer's order. It should only be used when the user explicitly asks to remove a particular item. Only remove the exact item a customer asks for.",
          parameters: {
            type: "object",
            properties: {
              item: {
                type: "string",
                description:
                  "The name of the item that the user would like to remove. The valid values come from the names of the items on the menu and in the order.",
              },
            },
            required: ["item"],
          },
        },
        {
          name: "get_menu",
          description:
            "Gets the menu, including all items and their price and description. Use this function at the beginning of the call and use it to reference what items are available and information about them",
          parameters: {
            type: "object",
            properties: {},
            required: [],
          },
        },
      ],
    },
  },
});

export const driveThruMenu = [
  {
    name: "Krabby Patty",
    description: "The signature burger of the Krusty Krab, made with a secret formula",
    price: 2.99,
    category: "meal",
  },
  {
    name: "Double Krabby Patty",
    description: "A Krabby Patty with two patties.",
    price: 3.99,
    category: "meal",
  },
  {
    name: "Krabby Patty with Cheese",
    description: "A Krabby Patty with a slice of cheese",
    price: 3.49,
    category: "meal",
  },
  {
    name: "Double Krabby Patty with Cheese",
    description: "A Krabby Patty with two patties and a slice of cheese",
    price: 4.49,
    category: "meal",
  },
  {
    name: "Salty Sea Dog",
    description: "A hot dog served with sea salt",
    price: 2.49,
    category: "meal",
  },
  {
    name: "Barnacle Fries",
    description: "Fries made from barnacles",
    price: 1.99,
    category: "side",
  },
  {
    name: "Krusty Combo",
    description: "Includes a Krabby Patty, Seaweed Salad, and a drink",
    price: 6.99,
    category: "combo",
  },
  {
    name: "Seaweed Salad",
    description: "A fresh salad made with seaweed",
    price: 2.49,
    category: "side",
  },
  {
    name: "Krabby Meal",
    description: "Includes a Krabby Patty, fries, and a drink",
    price: 5.99,
    category: "combo",
  },
  {
    name: "Kelp Shake",
    description: "A shake made with kelp juice",
    price: 2.49,
    category: "beverage",
  },
  {
    name: "Bubbly buddy",
    description: "A drink that is bubbly and refreshing",
    price: 1.49,
    category: "beverage",
  },
];

export const availableVoices: Voice[] = [
  {
    name: "Vesta",
    canonical_name: "aura-2-vesta-en",
    provider: {
      type: "deepgram",
      model: "aura-2-vesta-en"
    },
    metadata: {
      accent: "American",
      gender: "female",
      image: "/voices/thalia.png",
      color: "#FF6B6B",
      sample: "/samples/thalia.mp3"
    }
  },
  {
    name: "Nova",
    canonical_name: "nova-3-medical",
    provider: {
      type: "deepgram",
      model: "nova-3-medical"
    },
    metadata: {
      accent: "American",
      gender: "female",
      image: "/voices/nova.png",
      color: "#4ECDC4",
      sample: "/samples/nova.mp3"
    }
  },
  {
    name: "Eleven",
    canonical_name: "eleven-english-v1",
    provider: {
      type: "elevenlabs",
      model: "eleven-english-v1"
    },
    metadata: {
      accent: "American",
      gender: "female",
      image: "/voices/eleven.png",
      color: "#45B7D1",
      sample: "/samples/eleven.mp3"
    }
  }
];
export const defaultVoice: Voice = availableVoices[0]!;

export const sharedOpenGraphMetadata = {
  title: "EquipTech Dental Voice Agent Demo",
  type: "website",
  url: "/",
  description: "Meet the EquipTech Dental service coordinator voice agent powered by Deepgram",
};

// Jack-in-the-Box constants
export const jitbStsConfig = (id: string, menu: string): StsConfig => ({
  ...baseConfig,
  context: {
    messages: [
      {
        role: "assistant",
        content: "Welcome to Jack in the Box. What can I get for you today?",
      },
    ],
    replay: true,
  },
  agent: {
    ...baseConfig.agent,
    think: {
      ...baseConfig.agent.think,
      instructions:
        `You work taking orders at a Jack in the Box drive-thru. Follow these instructions stricly. Do not deviate:
      (1) Never speak in full sentences. Speak in short, yet polite responses.
      (2) Never repeat the customer's order back to them unless they ask for it.
      (3) If someone orders a breakfast item, ask if they would like an orange juice with that.
      (4) If someone orders a small or regular, ask if they would like to make that a large instead.
      (5) Don't mention prices until the customer confirms that they're done ordering.
      (6) Allow someone to mix and match sizes for combos.
      (7) At the end of the order, If someone has not ordered a dessert item, ask if they would like to add a dessert.
      (8) If someones changes their single item orders to a combo, remove the previous single item order.
      The menu, including the names, descriptions, types, and prices for the items that you sell, is as follows:` +
        id + menu,
      functions: [
        {
          name: "add_item",
          description:
            "Add an item to an order, with an optional quantity. Only use this function if the user has explicitly asked to order an item and that item is on the menu.",
          parameters: {
            type: "object",
            properties: {
              item: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                    description:
                      "The name of the item that the user would like to order. The valid values come from the names of the items on the menu.",
                  },
                  size: {
                    type: "string",
                    description:
                      "Provide a size IF AND ONLY IF the item has sizes listed in its `pricing` field in the menu. IF AN ITEM NEEDS A SIZE, DO NOT ASSUME THE SIZE. ASK THE CUSTOMER.",
                  },
                  make_it_a_combo: {
                    type: "object",
                    description:
                      "You can provide the `make_it_a_combo` field if the user wants a combo AND the item has the `combo_entree` role in the menu. NEVER ASSUME THE SIDE OR THE DRINK. ASK THE CUSTOMER. The size is for the drink and the fries, so the two sizes will always be the same within a combo, and that is just called the 'combo size'.",
                    properties: {
                      size: {
                        type: "string",
                        description:
                          "`small`, `medium`, or `large`. This affects the size of both the side and the drink.",
                      },
                      side_name: {
                        type: "string",
                        description:
                          "The name of the side. It must be a valid menu item and have the `combo_side` role.",
                      },
                      drink_name: {
                        type: "string",
                        description:
                          "The name of the drink. It must be a valid menu item and have the `combo_drink` role.",
                      },
                    },
                    required: ["size", "side_name", "drink_name"],
                  },
                  additional_requests: {
                    type: "string",
                    description:
                      "Optional. This is where you should include any extra customization requested by the customer for this item.",
                  },
                },
                required: ["name"],
              },
              quantity: {
                type: "integer",
                description:
                  "The quantity of this item that the user would like to add. Optional. Remember that this parameter is a sibling of item, not a child.",
              },
            },
            required: ["item"],
          },
        },
        {
          name: "remove_item",
          description: "Removes an item from an order.",
          parameters: {
            type: "object",
            properties: {
              key: {
                type: "integer",
                description:
                  "The integer key of the item you would like to remove. You will see these keys in the order summary that you get after each successful function call.",
              },
            },
            required: ["key"],
          },
        },
      ],
    },
  },
});
export const latencyMeasurementQueryParam = "latency-measurement";

// Drug Dispatch Functions
export const drugDispatchFunctions = [
  {
    name: 'set_patient_name',
    description: 'Set the patient name for the prescription',
    parameters: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'The patient\'s full name'
        }
      },
      required: ['name']
    }
  },
  {
    name: 'set_mrn',
    description: 'Set the patient medical record number for the prescription',
    parameters: {
      type: 'object',
      properties: {
        mrn: {
          type: 'string',
          description: 'The patient\'s medical record number (MRN)'
        }
      },
      required: ['mrn']
    }
  },
  {
    name: 'set_medication',
    description: 'Set the medication name for the prescription',
    parameters: {
      type: 'object',
      properties: {
        medication: {
          type: 'string',
          description: 'The name of the medication'
        }
      },
      required: ['medication']
    }
  },
  {
    name: 'set_dosage',
    description: 'Set the dosage for the prescription',
    parameters: {
      type: 'object',
      properties: {
        dosage: {
          type: 'string',
          description: 'The dosage of the medication'
        }
      },
      required: ['dosage']
    }
  },
  {
    name: 'set_frequency',
    description: 'Set the frequency for the prescription',
    parameters: {
      type: 'object',
      properties: {
        frequency: {
          type: 'string',
          description: 'How often the medication should be taken'
        }
      },
      required: ['frequency']
    }
  },
  {
    name: 'set_pharmacy',
    description: 'Set the pharmacy for the prescription',
    parameters: {
      type: 'object',
      properties: {
        pharmacy: {
          type: 'string',
          description: 'The name or location of the pharmacy'
        }
      },
      required: ['pharmacy']
    }
  },
  {
    name: 'dispatch_prescription',
    description: 'Dispatch the current prescription',
    parameters: {
      type: 'object',
      properties: {},
      required: []
    }
  },
  {
    name: 'clear_prescription',
    description: 'Clear the current prescription form',
    parameters: {
      type: 'object',
      properties: {},
      required: []
    }
  }
];

/// <reference types="vite/client" />

declare module "*?raw" {
  const content: string;
  export default content;
}

interface ImportMetaEnv {
  readonly DEEPGRAM_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
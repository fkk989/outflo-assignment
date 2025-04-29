export { };

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      PORT: string;
      GEMINY_API_KEY: string;
    }
  }
}
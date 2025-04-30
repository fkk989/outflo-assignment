export { };

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      PORT: string;
      LINKEDIN_EMAIL: string;
      LINKEDIN_PASSWORD: string
    }
  }
}
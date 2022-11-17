/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly STRIPE_API_KEY: string;
    // ADD ANOTHER ENVs
  }
}
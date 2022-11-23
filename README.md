# process-env-checker

Check if all requested environment variables are present.

## Usage

1. Create file `env.d.ts` with  (you can call it like you want) with this template:

```
/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly STRIPE_API_KEY: string;
    // ADD ANOTHER ENVs
  }
}
```

2. Install this package locally in `devDependencies` like `yarn add process-env-checker`

3. Run manually or add to package.json script. Do not forget to provide path to definition file: `yarn process-env-checker check ./env.d.ts`

Note: Do not forget to pass envs as part of script, otherwise it fails. Example: `MY_ENV_TEST=hello yarn process-env-checker check ./env.d.ts`
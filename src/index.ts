#!/usr/bin/env node
import * as fs from 'fs';
import { Command } from "commander";

const program = new Command();

program.name('process-env-checker').helpOption(false)

program.command('check')
  .description('Check if all requested environment variables are present.')
  .argument('<path>', 'path to declaration file',)
  .action(async (path: string) => {

    if (!fs.existsSync(path)) { console.warn("Declaration file does not exists"); process.exit(1); }

    const data = await fs.promises.readFile(path, 'binary');

    const regex = /readonly [A-Z_]*/g;
    const variables = data.match(regex)?.map((found) => found.replace('readonly ', ''));

    console.log('Checking for those envs:', variables?.map((variable) => '\n- ' + variable)?.join(''));

    const missingVariables = variables?.filter((variable) => !process.env[variable]);

    if (missingVariables?.length === 0) console.log('\n\n🎉🎉🎉 All values are set!\n\n');

    if (missingVariables?.length !== 0) {
      console.warn('\nThose variables are missing: ' + missingVariables?.join(',') + '\n');
      process.exit(1);
    }
  });

program.parse(process.argv);
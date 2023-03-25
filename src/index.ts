import { Command } from 'commander';

const program = new Command();
program
  .description('Output file contents with file path for ChatGPT prompt.')
  .option(`-i, --input <path>`, 'Path of input file or directory.')
  .action(({ input }: { input: string }) => {
    if (!input) {
      console.log(`--input parameter is required.`);
      return;
    }
    console.log(`input: ${input}`);
  });
program.parse(process.argv);

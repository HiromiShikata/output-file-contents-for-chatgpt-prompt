#!/usr/bin/env node
import { Command } from 'commander';
import { GetFileContentsTextUseCase } from './domain/usecases/GetFileContentsTextUseCase';
import { FsFileRepository } from './adapter/repositories/FsFileRepository';
import { TsAstRepository } from './adapter/repositories/TsAstRepository';

const program = new Command();
program
  .description('Output file contents with file path for ChatGPT prompt.')
  .option(`-i, --input <path>`, 'Path of input file or directory.')
  .action(async ({ input }: { input: string }) => {
    if (!input) {
      console.log(`--input parameter is required.`);
      return;
    }
    const fileContentsText = await new GetFileContentsTextUseCase(
      new FsFileRepository(),
      new TsAstRepository(),
    ).run(input);
    console.log(fileContentsText);
  });
program.parse(process.argv);

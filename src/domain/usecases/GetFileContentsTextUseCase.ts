import { FileRepository } from './adapter-interfaces/FileRepository';

export class GetFileContentsTextUseCase {
  constructor(readonly fileRepository: FileRepository) {}
  run = async (path: string): Promise<string> => {
    const files = await this.fileRepository.get(path);
    const fileContentsText = files
      .map((file) => {
        return `// ${file.path}
${file.content}
`;
      })
      .join('\n');

    return fileContentsText;
  };
}

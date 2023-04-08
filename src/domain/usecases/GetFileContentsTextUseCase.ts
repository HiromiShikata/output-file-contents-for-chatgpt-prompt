// ./src/domain/usecases/GetFileContentsTextUseCase.ts
import { FileRepository } from './adapter-interfaces/FileRepository';
import { AstRepository } from './adapter-interfaces/AstRepository';

export class GetFileContentsTextUseCase {
  constructor(
    readonly fileRepository: FileRepository,
    readonly astRepository: AstRepository,
  ) {}

  run = async (path: string): Promise<string> => {
    const relatedFilePaths = await this.astRepository.getAllRelatedFilePaths(
      path,
    );

    const files = await Promise.all(
      relatedFilePaths.map((filePath) => this.fileRepository.get(filePath)),
    );

    const fileContentsText = files
      .flat()
      .map((file) => {
        if (file.content.startsWith('//')) {
          return `${file.content}`;
        }
        return `// ${file.path}\n${file.content}`;
      })
      .join('\n\n\n');

    return fileContentsText;
  };
}

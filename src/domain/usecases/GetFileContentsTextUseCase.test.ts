// ./src/domain/usecases/GetFileContentsTextUseCase.test.ts
import { GetFileContentsTextUseCase } from './GetFileContentsTextUseCase';
import { FileRepository } from './adapter-interfaces/FileRepository';
import { AstRepository } from './adapter-interfaces/AstRepository';
import { File } from '../entities/File';

describe('GetFileContentsTextUseCase', () => {
  it('should return file contents text', async () => {
    const { useCase, fileRepository, astRepository } =
      createUseCaseAndMockRepositories();
    const path = '/path/to/file';
    const files = [
      { path: './path/to/file1', content: 'File 1 content' },
      { path: '/path/to/file2', content: 'File 2 content' },
      { path: 'path/to/file3', content: '// path/to/file3\nFile 3 content' },
      { path: 'path/to/file4', content: '// ./path/to/file4\nFile 4 content' },
    ];
    astRepository.getAllRelatedFilePaths.mockResolvedValue(
      files.map((file) => file.path),
    );

    fileRepository.get.mockImplementation((path) => {
      const matchingFiles = files.filter((file) => file.path === path);
      return Promise.resolve(matchingFiles);
    });

    const result = await useCase.run(path);

    expect(astRepository.getAllRelatedFilePaths).toHaveBeenCalledWith(path);
    expect(fileRepository.get).toHaveBeenCalledTimes(4);
    expect(result).toEqual(`// ./path/to/file1
File 1 content


// /path/to/file2
File 2 content


// path/to/file3
File 3 content


// ./path/to/file4
File 4 content`);
  });

  const createUseCaseAndMockRepositories = () => {
    const fileRepository = createMockFileRepository();
    const astRepository = createMockAstRepository();
    const useCase = new GetFileContentsTextUseCase(
      fileRepository,
      astRepository,
    );
    return {
      fileRepository,
      astRepository,
      useCase,
    };
  };

  const createMockFileRepository = () => {
    const repository: FileRepository = {
      get: async (_path: string): Promise<File[]> => {
        return [];
      },
    };
    return {
      get: jest.fn((path: string) => repository.get(path)),
    };
  };

  const createMockAstRepository = () => {
    const repository: AstRepository = {
      getAllRelatedFilePaths: async (_path: string): Promise<string[]> => {
        return [];
      },
    };
    return {
      getAllRelatedFilePaths: jest.fn((path: string) =>
        repository.getAllRelatedFilePaths(path),
      ),
    };
  };
});

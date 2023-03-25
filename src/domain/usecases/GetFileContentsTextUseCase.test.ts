import { GetFileContentsTextUseCase } from './GetFileContentsTextUseCase';
import { FileRepository } from './adapter-interfaces/FileRepository';

describe('GetFileContentsTextUseCase', () => {
  it('should return file contents text', async () => {
    const { useCase, fileRepository } = createUseCaseAndMockRepositories();
    const path = '/path/to/file';
    const files = [
      { path: '/path/to/file1', content: 'File 1 content' },
      { path: '/path/to/file2', content: 'File 2 content' },
    ];
    fileRepository.get.mockResolvedValue(files);

    const result = await useCase.run(path);

    expect(fileRepository.get).toHaveBeenCalledWith(path);
    expect(result).toEqual(`// ${files[0].path}
${files[0].content}

// ${files[1].path}
${files[1].content}
`);
  });

  const createUseCaseAndMockRepositories = () => {
    const fileRepository = createMockFileRepository();
    const useCase = new GetFileContentsTextUseCase(fileRepository);
    return {
      fileRepository,
      useCase,
    };
  };

  const createMockFileRepository = () => {
    const repository: FileRepository = {
      get: async (_path: string) => [
        { path: '/path/to/file1', content: 'File 1 content' },
        { path: '/path/to/file2', content: 'File 2 content' },
      ],
    };
    return {
      get: jest.fn((path: string) => repository.get(path)),
    };
  };
});

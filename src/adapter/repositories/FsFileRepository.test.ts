import { FsFileRepository } from './FsFileRepository';

describe('FsFileRepository', () => {
  const fileRepository = new FsFileRepository();

  it('success', async () => {
    const dirPath = './src/adapter/repositories/testdata';
    const result = await fileRepository.get(dirPath);

    expect(result).toEqual([
      {
        content: 'Content of File1.txt\n',
        path: 'src/adapter/repositories/testdata/File1.txt',
      },
      {
        content: 'Content of File2.txt\n',
        path: 'src/adapter/repositories/testdata/File2.txt',
      },
      {
        content: 'Content of File1.txt\n',
        path: 'src/adapter/repositories/testdata/dir1/File1.txt',
      },
    ]);
  });
});

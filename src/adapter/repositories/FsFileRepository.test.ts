import { FsFileRepository } from './FsFileRepository';
import * as path from 'path';

describe('FsFileRepository', () => {
  const fileRepository = new FsFileRepository();

  it('success', async () => {
    const dirPath = './src/adapter/repositories/testdata';
    const result = await fileRepository.get(dirPath);

    expect(result).toEqual([
      {
        content:
          "// ./src/adapter/repositories/testdata/File1.ts\nimport { File2 } from './File2';\nexport type File1 = {\n  file2: File2;\n};\n",
        path: 'src/adapter/repositories/testdata/File1.ts',
      },
      {
        content:
          "// ./src/adapter/repositories/testdata/File2.ts\nimport { File3 } from './dir1/File3';\nexport interface File2 {\n  file3: File3;\n}\n",
        path: 'src/adapter/repositories/testdata/File2.ts',
      },
      {
        content:
          '// ./src/adapter/repositories/testdata/dir1/File3.ts\nexport class File3 {}\n',
        path: 'src/adapter/repositories/testdata/dir1/File3.ts',
      },
    ]);
  });

  it('reads files from a directory', async () => {
    const dirPath = './src/adapter/repositories/testdata';
    const result = await fileRepository.get(dirPath);

    expect(result).toEqual([
      {
        content:
          "// ./src/adapter/repositories/testdata/File1.ts\nimport { File2 } from './File2';\nexport type File1 = {\n  file2: File2;\n};\n",
        path: path.normalize('src/adapter/repositories/testdata/File1.ts'),
      },
      {
        content:
          "// ./src/adapter/repositories/testdata/File2.ts\nimport { File3 } from './dir1/File3';\nexport interface File2 {\n  file3: File3;\n}\n",
        path: path.normalize('src/adapter/repositories/testdata/File2.ts'),
      },
      {
        content:
          '// ./src/adapter/repositories/testdata/dir1/File3.ts\nexport class File3 {}\n',
        path: path.normalize('src/adapter/repositories/testdata/dir1/File3.ts'),
      },
    ]);
  });

  it('reads a single file', async () => {
    const filePath = './src/adapter/repositories/testdata/File1.ts';
    const result = await fileRepository.get(filePath);

    expect(result).toEqual([
      {
        content:
          "// ./src/adapter/repositories/testdata/File1.ts\nimport { File2 } from './File2';\nexport type File1 = {\n  file2: File2;\n};\n",
        path: './src/adapter/repositories/testdata/File1.ts',
      },
    ]);
  });
});

import { FsFileRepository } from './FsFileRepository';

describe('FsFileRepository', () => {
  const fileRepository = new FsFileRepository();

  it('success', async () => {
    const dirPath = './testdata/independent-project';
    const result = await fileRepository.get(dirPath);

    expect(result).toEqual([
      {
        content:
          "// ./File1.ts\nimport { File2 } from './File2';\nexport type File1 = {\n  file2: File2;\n};\n",
        path: 'testdata/independent-project/File1.ts',
      },
      {
        content:
          "// ./File2.ts\nimport { File3 } from './dir1/File3';\nexport interface File2 {\n  file3: File3;\n}\n",
        path: 'testdata/independent-project/File2.ts',
      },
      {
        content: '// ./dir1/File3.ts\nexport class File3 {}\n',
        path: 'testdata/independent-project/dir1/File3.ts',
      },
      {
        content:
          '{\n  "name": "independent-project",\n  "version": "1.0.0",\n  "lockfileVersion": 3,\n  "requires": true,\n  "packages": {\n    "": {\n      "name": "independent-project",\n      "version": "1.0.0",\n      "license": "ISC"\n    }\n  }\n}\n',
        path: 'testdata/independent-project/package-lock.json',
      },
      {
        content:
          '{\n  "name": "independent-project",\n  "version": "1.0.0",\n  "description": "",\n  "main": "index.js",\n  "scripts": {\n    "test": "echo \\"Error: no test specified\\" && exit 1"\n  },\n  "keywords": [],\n  "author": "",\n  "license": "ISC"\n}\n',
        path: 'testdata/independent-project/package.json',
      },
    ]);
  });

  it('reads files from a directory', async () => {
    const dirPath = './testdata/dependent-project/dir1';
    const result = await fileRepository.get(dirPath);

    expect(result).toEqual([
      {
        content: '// ./dir1/File3.ts\nexport class File3 {}\n',
        path: 'testdata/dependent-project/dir1/File3.ts',
      },
    ]);
  });

  it('reads a single file', async () => {
    const filePath = './testdata/independent-project/File1.ts';
    const result = await fileRepository.get(filePath);

    expect(result).toEqual([
      {
        content:
          "// ./File1.ts\nimport { File2 } from './File2';\nexport type File1 = {\n  file2: File2;\n};\n",
        path: './testdata/independent-project/File1.ts',
      },
    ]);
  });
});

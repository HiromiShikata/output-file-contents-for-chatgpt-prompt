import { execSync } from 'child_process';

describe('commander program', () => {
  it('should output file contents', () => {
    const output = execSync(
      'npx ts-node ./src/index.ts -i ./src/adapter/repositories/testdata',
    ).toString();
    expect(output.trim()).toBe(`// src/adapter/repositories/testdata/File1.txt
Content of File1.txt


// src/adapter/repositories/testdata/File2.txt
Content of File2.txt


// src/adapter/repositories/testdata/dir1/File1.txt
Content of File1.txt`);
  });

  it('should output error message without input path', () => {
    const output = execSync('npx ts-node ./src/index.ts').toString();
    expect(output.trim()).toBe('--input parameter is required.');
  });
});

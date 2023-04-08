// ./src/adapter/repositories/TsAstRepository.test.ts
import * as fs from 'fs';
import { TsAstRepository } from './TsAstRepository';

async function createTestFile(content: string): Promise<string> {
  const testDirPath = './tmp/unittest';
  if (!fs.existsSync(testDirPath)) {
    await fs.promises.mkdir(testDirPath, { recursive: true });
  }
  const testFilePath = `${testDirPath}/test-file.ts`;
  await fs.promises.writeFile(testFilePath, content);
  return testFilePath;
}

async function deleteTestFile(filePath: string) {
  await fs.promises.unlink(filePath);
}

describe('TsAstRepository', () => {
  const tsAstRepository = new TsAstRepository();

  describe('getAllRelatedFilePaths', () => {
    it('should return an empty array if there are no related file paths', async () => {
      const testFileContent = `
        export class TestClass {
          constructor() {}
        }
      `;

      const testFilePath = await createTestFile(testFileContent);
      const filePaths = await tsAstRepository.getAllRelatedFilePaths(
        testFilePath,
      );
      await deleteTestFile(testFilePath);

      expect(filePaths).toEqual(['tmp/unittest/test-file.ts']);
    });
    it('should return an array of related file paths for testdata files', async () => {
      const testFilePath = './src/adapter/repositories/testdata/File1.ts';
      const filePaths = await tsAstRepository.getAllRelatedFilePaths(
        testFilePath,
      );

      expect(filePaths).toEqual([
        'src/adapter/repositories/testdata/File1.ts',
        'src/adapter/repositories/testdata/File2.ts',
        'src/adapter/repositories/testdata/dir1/File3.ts',
      ]);
    });
  });
});

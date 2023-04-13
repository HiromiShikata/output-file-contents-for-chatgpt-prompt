// ./src/adapter/repositories/TsAstRepository.test.ts
import { TsAstRepository } from './TsAstRepository';

jest.setTimeout(10 * 1000);
describe('TsAstRepository', () => {
  const tsAstRepository = new TsAstRepository();

  describe('getAllRelatedFilePaths', () => {
    it('should return an array of related file paths for testdata files', async () => {
      const testFilePath = './testdata/dependent-project/File1.ts';
      const filePaths = await tsAstRepository.getAllRelatedFilePaths(
        testFilePath,
      );

      expect(filePaths).toEqual([
        'testdata/dependent-project/File1.ts',
        'testdata/dependent-project/File2.ts',
        'testdata/independent-project/File1.ts',
        'testdata/dependent-project/dir1/File3.ts',
        'testdata/independent-project/File2.ts',
        'testdata/independent-project/dir1/File3.ts',
      ]);
    });
  });
});

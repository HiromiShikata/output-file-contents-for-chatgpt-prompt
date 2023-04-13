// ./src/adapters/repositories/utilities/findPackageJson.test.ts
import { findPackageJson } from './findPackageJson';

describe('findPackageJson', () => {
  it('should return the path to the nearest package.json', async () => {
    const targetPath = './testdata/dependent-project/dir1';
    const packageJsonPath = await findPackageJson(targetPath);

    expect(packageJsonPath).not.toBeNull();
    if (packageJsonPath !== null) {
      expect(packageJsonPath.endsWith('package.json')).toBe(true);
    }
  });

  it('should return null if no package.json is found', async () => {
    const targetPath = '/nonexistent';

    const packageJsonPath = await findPackageJson(targetPath);

    expect(packageJsonPath).toBeNull();
  });
});

// getNodeModulesPaths.test.ts
import * as path from 'path';

jest.mock('./findPackageJson', () => ({
  findPackageJson: () =>
    Promise.resolve(path.resolve('testdata/dependent-project', 'package.json')),
}));

describe('getNodeModulesPaths', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('should return an array of node_modules paths for all dependencies', async () => {
    const { getNodeModulePaths } = await import('./getNodeModulesPaths');
    const targetPath = path.resolve('testdata/dependent-project');
    const nodeModulesPaths = await getNodeModulePaths(targetPath);
    const expectedDependencies = [
      'testdata/dependent-project/node_modules/independent-project',
    ].map((dep) => path.resolve(dep));

    expect(nodeModulesPaths).toEqual(expectedDependencies);
  });

  it('should return an empty array if no dependencies are found', async () => {
    jest.doMock('./findPackageJson', () => ({
      findPackageJson: () => Promise.resolve(null),
    }));

    jest.resetModules();
    const { getNodeModulePaths } = await import('./getNodeModulesPaths');
    const targetPath = path.resolve('testdata/dependent-project');
    const nodeModulesPaths = await getNodeModulePaths(targetPath);

    expect(nodeModulesPaths).toEqual([]);
  });
});

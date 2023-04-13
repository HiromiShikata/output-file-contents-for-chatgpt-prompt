// ./src/adapter/repositories/utilities/findPackageJson.ts
import * as fs from 'fs';
import * as path from 'path';

export async function findPackageJson(
  targetPath: string,
): Promise<string | null> {
  while (targetPath !== '/') {
    const packageJsonPath = path.join(targetPath, 'package.json');

    try {
      await fs.promises.access(packageJsonPath);
      return packageJsonPath;
    } catch (e) {
      targetPath = path.dirname(targetPath);
    }
  }

  return null;
}

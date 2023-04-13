// ./src/adapter/repositories/utilities/getNodeModulesPaths.ts
import * as fs from 'fs';
import * as path from 'path';
import { findPackageJson } from './findPackageJson';

interface PackageJson {
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
}

export async function getNodeModulePaths(
  targetPaths: string,
): Promise<string[]> {
  const packageJsonPath = await findPackageJson(targetPaths);
  if (!packageJsonPath) {
    return [];
  }

  const content = await fs.promises.readFile(packageJsonPath, 'utf-8');
  const parsedPackageJson: unknown = JSON.parse(content);
  const isPackageJson = (obj: unknown): obj is PackageJson =>
    typeof obj === 'object' && obj !== null;
  if (!parsedPackageJson || !isPackageJson(parsedPackageJson)) {
    return [];
  }
  const packageJson: PackageJson = parsedPackageJson;

  const fileDependencies = new Set([
    ...Object.entries(packageJson.dependencies ?? {})
      .filter(([, value]) => value.startsWith('file:'))
      .map(([key]) => key),
    ...Object.entries(packageJson.devDependencies ?? {})
      .filter(([, value]) => value.startsWith('file:'))
      .map(([key]) => key),
  ]);
  const nodeModulesPath = path.join(
    path.dirname(packageJsonPath),
    'node_modules',
  );

  return Array.from(fileDependencies).map((dep) =>
    path.join(nodeModulesPath, dep),
  );
}

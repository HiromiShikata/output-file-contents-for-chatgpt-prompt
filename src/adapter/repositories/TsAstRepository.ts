// ./src/adapter/repositories/TsAstRepository.ts
import * as fs from 'fs';
import * as ts from 'typescript';
import { AstRepository } from '../../domain/usecases/adapter-interfaces/AstRepository';
import * as path from 'path';

export class TsAstRepository implements AstRepository {
  getAllRelatedFilePaths = async (filePath: string): Promise<string[]> => {
    const visitedPaths: Set<string> = new Set();
    await this.processFilePath(filePath, visitedPaths);

    if (await this.isFile(filePath)) {
      visitedPaths.add(filePath);
    } else {
      visitedPaths.delete(filePath);
    }

    return Array.from(visitedPaths).map((e) => path.normalize(e));
  };

  private async processFilePath(
    filePath: string,
    visitedPaths: Set<string>,
  ): Promise<void> {
    if (visitedPaths.has(filePath)) {
      return;
    }
    visitedPaths.add(filePath);

    const content = await fs.promises.readFile(filePath, 'utf-8');
    const sourceFile = ts.createSourceFile(
      filePath,
      content,
      ts.ScriptTarget.ES2015,
      true,
    );

    const dirPath = path.dirname(filePath);

    const visitNode = async (node: ts.Node): Promise<void> => {
      if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) {
        const moduleSpecifier = node.moduleSpecifier;
        if (moduleSpecifier && ts.isStringLiteral(moduleSpecifier)) {
          const relativePath = moduleSpecifier.text;
          const absolutePath = path.join(dirPath, relativePath) + '.ts';
          if (!visitedPaths.has(absolutePath)) {
            await this.processFilePath(absolutePath, visitedPaths);
          }
        }
      }
      await Promise.all(node.getChildren().map((child) => visitNode(child)));
    };

    await visitNode(sourceFile);
  }

  private async isFile(filePath: string): Promise<boolean> {
    try {
      const stat = await fs.promises.stat(filePath);
      return stat.isFile();
    } catch (e) {
      return false;
    }
  }
}

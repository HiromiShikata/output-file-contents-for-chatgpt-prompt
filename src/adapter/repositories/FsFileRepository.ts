// ./src/adapter/repositories/FsFileRepository.ts
import { File } from '../../domain/entities/File';
import * as fs from 'fs';
import * as path from 'path';
import { FileRepository } from '../../domain/usecases/adapter-interfaces/FileRepository';

export class FsFileRepository implements FileRepository {
  async get(filePath: string): Promise<File[]> {
    const files: File[] = [];

    try {
      const entryStat = await fs.promises.stat(filePath);

      if (entryStat.isFile()) {
        const content = await fs.promises.readFile(filePath, 'utf8');
        const file: File = {
          path: filePath,
          content,
        };
        files.push(file);
      } else if (entryStat.isDirectory()) {
        const dirEntries = await fs.promises.readdir(filePath, {
          withFileTypes: true,
        });

        for (const entry of dirEntries) {
          const entryPath = path.join(filePath, entry.name);

          if (entry.isFile()) {
            const content = await fs.promises.readFile(entryPath, 'utf8');
            const file: File = {
              path: path.normalize(entryPath),
              content,
            };
            files.push(file);
          } else if (entry.isDirectory()) {
            const subFiles = await this.get(entryPath);
            files.push(...subFiles);
          }
        }
      }
    } catch (error) {
      console.error(`Error reading the path: ${filePath}`, error);
      throw error;
    }

    return files;
  }
}

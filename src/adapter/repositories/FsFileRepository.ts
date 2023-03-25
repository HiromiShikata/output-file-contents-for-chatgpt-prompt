import { File } from '../../domain/entities/File';
import * as fs from 'fs';
import * as path from 'path';
import { FileRepository } from '../../domain/usecases/adapter-interfaces/FileRepository';

export class FsFileRepository implements FileRepository {
  async get(dirPath: string): Promise<File[]> {
    const files: File[] = [];

    const dirEntries = await fs.promises.readdir(dirPath, {
      withFileTypes: true,
    });

    for (const entry of dirEntries) {
      const entryPath = path.join(dirPath, entry.name);

      if (entry.isFile()) {
        const content = await fs.promises.readFile(entryPath, 'utf8');
        const file: File = {
          path: entryPath,
          content,
        };
        files.push(file);
      } else if (entry.isDirectory()) {
        const subFiles = await this.get(entryPath);
        files.push(...subFiles);
      }
    }

    return files;
  }
}

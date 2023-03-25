import { File } from '../../entities/File';

export interface FileRepository {
  get(path: string): Promise<File[]>;
}

// ./File1.ts
import { File2 } from './File2';
import { File1 as IndependentFile1 } from 'independent-project/File1';
import { v4 as uuid } from 'uuid';

export type File1 = {
  file2: File2;
  independentFile1: IndependentFile1;
  uuid: uuid;
};

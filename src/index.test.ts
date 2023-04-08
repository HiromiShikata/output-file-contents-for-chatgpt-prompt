import { execSync } from 'child_process';

describe('commander program', () => {
  it('should output file contents', () => {
    const output = execSync(
      'npx ts-node ./src/index.ts -i ./src/adapter/repositories/testdata/File1.ts',
    ).toString();
    expect(output.trim()).toBe(`// ./src/adapter/repositories/testdata/File1.ts
import { File2 } from './File2';
export type File1 = {
  file2: File2;
};



// ./src/adapter/repositories/testdata/File2.ts
import { File3 } from './dir1/File3';
export interface File2 {
  file3: File3;
}



// ./src/adapter/repositories/testdata/dir1/File3.ts
export class File3 {}`);
  });
});

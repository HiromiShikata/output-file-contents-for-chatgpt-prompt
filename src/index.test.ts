import { execSync } from 'child_process';

describe('commander program', () => {
  it('should output file contents', () => {
    const output = execSync(
      'npx ts-node ./src/index.ts -i ./testdata/dependent-project/File1.ts',
    ).toString();
    expect(output.trim()).toBe(
      `// ./File1.ts
import { File2 } from './File2';
import { File1 as IndependentFile1 } from 'independent-project/File1';
import { v4 as uuid } from 'uuid';

export type File1 = {
  file2: File2;
  independentFile1: IndependentFile1;
  uuid: uuid;
};



// ./File2.ts
import { File3 } from './dir1/File3';
export interface File2 {
  file3: File3;
}



// ./File1.ts
import { File2 } from './File2';
export type File1 = {
  file2: File2;
};



// ./dir1/File3.ts
export class File3 {}



// ./File2.ts
import { File3 } from './dir1/File3';
export interface File2 {
  file3: File3;
}



// ./dir1/File3.ts
export class File3 {}`,
    );
  });
});

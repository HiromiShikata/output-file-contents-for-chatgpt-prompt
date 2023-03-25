import { execSync } from 'child_process';

describe('commander program', () => {
  it('should output input path', () => {
    const output = execSync(
      'npx ts-node ./src/index.ts -i ./test/data/file.txt',
    ).toString();
    expect(output.trim()).toBe('input: ./test/data/file.txt');
  });

  it('should not output anything without input path', () => {
    const output = execSync('npx ts-node ./src/index.ts').toString();
    expect(output.trim()).toBe('--input parameter is required.');
  });
});

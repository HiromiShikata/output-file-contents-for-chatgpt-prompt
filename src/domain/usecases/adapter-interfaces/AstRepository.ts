// ./src/domain/usecases/adapter-interfaces/AstRepository.ts
export interface AstRepository {
  getAllRelatedFilePaths(path: string): Promise<string[]>;
}

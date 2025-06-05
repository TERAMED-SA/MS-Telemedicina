
interface IRepository<T> {
  getAll(): Promise<T[]>;
  getById(uuid: string): Promise<T | null>;
  //create(item: T): Promise<T>;
  //update(uuid: string, item: T): Promise<T | null>;
  //delete(uuid: string): Promise<boolean>;
}

export default IRepository;
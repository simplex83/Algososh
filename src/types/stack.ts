export interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  getElements: () => void;
  clear: () => void;
}
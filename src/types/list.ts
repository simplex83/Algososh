export type TListItem = {
  value: string;
  upCircle: React.ReactElement | null;
  downCircle: React.ReactElement | null;
  next: boolean;
};

export class Node<T> {
  value: T
  next: Node<T> | null
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = (next === undefined ? null : next);
  }
}

export interface ILoader {
  [index: string]: boolean
}
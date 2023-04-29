export class Queue<T>  {
  container: (T | null)[] = [];
  head = 0;
  tail = 0;
  readonly size: number = 0;
  length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    }
    this.container[this.tail % this.size] = item;
    this.tail++;
    this.length++;
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    this.container[this.head % this.size] = null;
    this.head++;
    this.length--;
  };
  isEmpty = () => this.length === 0;

  getItems = () => {
    const arr = [];
    for (let i of this.container) arr.push(i);
    return arr;
  };
  clear = () => {
    this.container = Array(this.size);
    this.head = 0;
    this.tail = 0;
    this.length = 0;
  };
}

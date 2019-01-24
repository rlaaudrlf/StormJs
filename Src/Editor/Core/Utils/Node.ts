export class Node<T> {
  data: T = {};

  children: Array<Node<T>> = [];

  key: string;

  parent: Node<T> = undefined;
}

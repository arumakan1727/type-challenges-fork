/*
  3 - Omit
  -------
  by Anthony Fu (@antfu) #中級 #union #built-in

  ### 質問

  組み込みの型ユーティリティ`Omit<T, K>`を使用せず、`T`のプロパティから`K`を削除する型を実装します。

  例えば

  ```ts
  interface Todo {
    title: string
    description: string
    completed: boolean
  }

  type TodoPreview = MyOmit<Todo, 'description' | 'title'>

  const todo: TodoPreview = {
    completed: false,
  }
  ```

  > GitHubで確認する：https://tsch.js.org/3/ja
*/

/* _____________ ここにコードを記入 _____________ */

type MyOmit<T extends Object, K extends keyof T> = {
  [k in keyof T as k extends K ? never : k]: T[k];
};

// 下記の方法だとテストケース3で失敗する (Todo1 の readonly が失われてしまう)。
/*
type MyExclude<T, X extends T> = T extends X ? never : T;

type MyOmit2<T extends Object, X extends keyof T> = {
  [k in MyExclude<keyof T, X>]: T[k]
}
*/

/* _____________ テストケース _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Expected1, MyOmit<Todo, 'description'>>>,
  Expect<Equal<Expected2, MyOmit<Todo, 'description' | 'completed'>>>,
  Expect<Equal<Expected3, MyOmit<Todo1, 'description' | 'completed'>>>,
];

// @ts-expect-error
type error = MyOmit<Todo, 'description' | 'invalid'>;

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

interface Todo1 {
  readonly title: string;
  description: string;
  completed: boolean;
}

interface Expected1 {
  title: string;
  completed: boolean;
}

interface Expected2 {
  title: string;
}

interface Expected3 {
  readonly title: string;
}

/* _____________ 次のステップ _____________ */
/*
  > 解答を共有する：https://tsch.js.org/3/answer/ja
  > 解答を見る：https://tsch.js.org/3/solutions
  > その他の課題：https://tsch.js.org/ja
*/

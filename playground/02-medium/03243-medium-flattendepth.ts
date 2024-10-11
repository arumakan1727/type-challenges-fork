/*
  3243 - FlattenDepth
  -------
  by jiangshan (@jiangshanmeta) #中級 #array

  ### 質問

  Recursively flatten array up to depth times.

  For example:

  ```typescript
  type a = FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2> // [1, 2, 3, 4, [5]]. flattern 2 times
  type b = FlattenDepth<[1, 2, [3, 4], [[[5]]]]> // [1, 2, 3, 4, [[5]]]. Depth defaults to be 1
  ```

  If the depth is provided, it's guaranteed to be positive integer.

  > GitHubで確認する：https://tsch.js.org/3243/ja
*/

/* _____________ ここにコードを記入 _____________ */

type FlattenDepth<
  A extends readonly any[],
  MaxDepth extends number = 1,
  Z extends null[] = [],
> = A extends [A[0], ...infer Tail]
  ? [
      A[0] extends any[] ? true : false,
      Z['length'] extends MaxDepth ? true : false,
    ] extends [true, false]
    ? [...FlattenDepth<A[0], MaxDepth, [...Z, null]>, ...FlattenDepth<Tail, MaxDepth, Z>]
    : [A[0], ...FlattenDepth<Tail, MaxDepth, Z>]
  : A;

/* _____________ テストケース _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<FlattenDepth<[]>, []>>,
  Expect<Equal<FlattenDepth<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<FlattenDepth<[1, [2]]>, [1, 2]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, [[5]]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 3>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 19260817>, [1, 2, 3, 4, 5]>>,
];

/* _____________ 次のステップ _____________ */
/*
  > 解答を共有する：https://tsch.js.org/3243/answer/ja
  > 解答を見る：https://tsch.js.org/3243/solutions
  > その他の課題：https://tsch.js.org/ja
*/

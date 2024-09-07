/*
  898 - Includes
  -------
  by null (@kynefuk) #初級 #array

  ### 質問

  JavaScriptの`Array.include`関数を型システムに実装します。この型は、2 つの引数を受け取り、`true`や`false`を出力しなければなりません。

  例えば：

  ```ts
  type isPillarMen = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'> // expected to be `false`
  ```

  > GitHubで確認する：https://tsch.js.org/898/ja
*/

/* _____________ ここにコードを記入 _____________ */
// biome-ignore format: 読みやすさのためにこの型定義の自動整形を無効化
type Tail<T extends readonly any[]> =
  T['length'] extends 1 ? []
  : T extends [T[0], ...infer Rest]
    ? Rest
    : never;

// biome-ignore format: 読みやすさのためにこの型定義の自動整形を無効化
type IsEqual<X, Y> =
  (<T1>() => T1 extends X ? 1 : 2) extends
  (<T2>() => T2 extends Y ? 1 : 2)
  ? true : false;

// biome-ignore format: 読みやすさのためにこの型定義の自動整形を無効化
type Includes<T extends readonly any[], U> =
  T extends [] ? false
  : IsEqual<T[0], U> extends true
    ? true
    : Includes<Tail<T>, U>;

/* _____________ テストケース _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Kars'>, true>>,
  Expect<Equal<Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'>, false>>,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 7>, true>>,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 4>, false>>,
  Expect<Equal<Includes<[1, 2, 3], 2>, true>>,
  Expect<Equal<Includes<[1, 2, 3], 1>, true>>,
  Expect<Equal<Includes<[{}], { a: 'A' }>, false>>,
  Expect<Equal<Includes<[boolean, 2, 3, 5, 6, 7], false>, false>>,
  Expect<Equal<Includes<[true, 2, 3, 5, 6, 7], boolean>, false>>,
  Expect<Equal<Includes<[false, 2, 3, 5, 6, 7], false>, true>>,
  Expect<Equal<Includes<[{ a: 'A' }], { readonly a: 'A' }>, false>>,
  Expect<Equal<Includes<[{ readonly a: 'A' }], { a: 'A' }>, false>>,
  Expect<Equal<Includes<[1], 1 | 2>, false>>,
  Expect<Equal<Includes<[1 | 2], 1>, false>>,
  Expect<Equal<Includes<[null], undefined>, false>>,
  Expect<Equal<Includes<[undefined], null>, false>>,
];

/* _____________ 次のステップ _____________ */
/*
  > 解答を共有する：https://tsch.js.org/898/answer/ja
  > 解答を見る：https://tsch.js.org/898/solutions
  > その他の課題：https://tsch.js.org/ja
*/

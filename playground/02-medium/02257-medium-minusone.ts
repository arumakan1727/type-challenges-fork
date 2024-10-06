/*
  2257 - MinusOne
  -------
  by Mustafo Faiz (@fayzzzm) #中級 #math

  ### 質問

  Given a number (always positive) as a type. Your type should return the number decreased by one.

  For example:

  ```ts
  type Zero = MinusOne<1> // 0
  type FiftyFour = MinusOne<55> // 54
  ```

  > GitHubで確認する：https://tsch.js.org/2257/ja
*/

/* _____________ ここにコードを記入 _____________ */

type TrimLeft<S extends string, C extends string> = S extends `${C}${infer Rest}`
  ? TrimLeft<Rest, C>
  : S;

type StrToNumber<S extends string> = TrimLeft<S, '0'> extends `${infer N extends number}`
  ? N
  : 0;

type ReverseStr<
  S extends string,
  Res extends string = '',
> = S extends `${infer C}${infer Tail}` ? ReverseStr<Tail, `${C}${Res}`> : Res;

type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

type PrevDigit<N extends Digit> = [9, 0, 1, 2, 3, 4, 5, 6, 7, 8][N];

type MinusOne<T extends number> = T extends 0
  ? -1
  : // 末尾の桁が 0 の場合は末尾の桁を 9 にしてそれ以前の文字列を MinusOne
    `${T}` extends `${infer Prefix extends number}0`
    ? StrToNumber<`${MinusOne<Prefix>}9`>
    : // 末尾の桁が 0 でない場合はその桁を PrevDigit に置き換えるだけ
      // 末尾1文字を取り出すために ReverseStr している
      ReverseStr<`${T}`> extends `${infer C extends Digit}${infer Tail}`
      ? StrToNumber<`${ReverseStr<Tail>}${PrevDigit<C>}`>
      : never;

/* _____________ テストケース _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<MinusOne<1>, 0>>,
  Expect<Equal<MinusOne<55>, 54>>,
  Expect<Equal<MinusOne<3>, 2>>,
  Expect<Equal<MinusOne<100>, 99>>,
  Expect<Equal<MinusOne<1101>, 1100>>,
  Expect<Equal<MinusOne<0>, -1>>,
  Expect<Equal<MinusOne<9_007_199_254_740_992>, 9_007_199_254_740_991>>,
];

/* _____________ 次のステップ _____________ */
/*
  > 解答を共有する：https://tsch.js.org/2257/answer/ja
  > 解答を見る：https://tsch.js.org/2257/solutions
  > その他の課題：https://tsch.js.org/ja
*/

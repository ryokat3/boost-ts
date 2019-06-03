import { Length, Push, Pop } from "./tuplelib"


type NumberToTuple<N extends number, Result extends Array<any> = []> = {
    done: Result
    continue: NumberToTuple<N, Push<1, Result>>
} [ Length<Result> extends N  ? "done" : "continue"]

type CompLength<Items1 extends any[], Items2 extends any[]> = {
    less: -1
    equal: 0
    great: 1
    continue:  CompLength<Pop<Items1>, Pop<Items2>>
}[ Length<Items1> extends Length<Items2> ? "equal" : Length<Items1> extends 0 ? "less" : Length<Items2> extends 0 ? "great" : "continue" ]

// @ts-ignore
export type Decrease<N extends number> = Length<Pop<NumberToTuple<N>>>

// @ts-ignore
export type Comp<Num1 extends number, Num2 extends number> = CompLength<NumberToTuple<Num1>, NumberToTuple<Num2>>
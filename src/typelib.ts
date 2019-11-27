////////////////////////////////////////////////////////////////////////
/// Tuple
////////////////////////////////////////////////////////////////////////


declare const None: unique symbol
type None = typeof None
declare const Pad: unique symbol
type Pad = typeof Pad

export type Cast<T,P> = T extends P ? T : never

export type Length<T extends any[]> = T['length']

/**
 * Push
 *  
 * Push an element to array if it's not None
 */
export type Push<T, List extends any[]> = T extends None ? List : ((a: T, ...b: List) => void) extends ((...a: infer Result) => void) ? Result : never

export type Pop<List extends any[]> = Length<List> extends 0 ? [] : (((...b: List) => void) extends (a:any, ...b: infer I) => void ? I : [])

export type Head<List extends any[]> = Length<List> extends 0 ? None : List[0]

export type Element<List extends any[], I extends number> = Length<List> extends 0 ? None : List[I]

/**
 * Reverse<any[]>
 * 
 * Reverse the order of array type
 */
export type Reverse<List extends any[]> = {
    0: []
    1: List
    2: [List[1], List[0]]
    3: [List[2], List[1], List[0]]
    4: [List[3], List[2], List[1], List[0]]
    5: [List[4], List[3], List[2], List[1], List[0]]
    6: [List[5], List[4], List[3], List[2], List[1], List[0]]
    7: [List[6], List[5], List[4], List[3], List[2], List[1], List[0]]
    8: [List[7], List[6], List[5], List[4], List[3], List[2], List[1], List[0]]
}[ List['length'] extends 0|1|2|3|4|5|6|7|8 ? List['length'] : never ]



type Filter1<T, List extends any[]> = List[0] extends T  ? [] : List
type Filter2<T, List extends any[]> = List[0] extends T ? Filter1<T, Pop<List>> : Push<List[0], Filter1<T, Pop<List>>>
type Filter3<T, List extends any[]> = List[0] extends T ? Filter2<T, Pop<List>> : Push<List[0], Filter2<T, Pop<List>>>
type Filter4<T, List extends any[]> = List[0] extends T ? Filter3<T, Pop<List>> : Push<List[0], Filter3<T, Pop<List>>>
type Filter5<T, List extends any[]> = List[0] extends T ? Filter4<T, Pop<List>> : Push<List[0], Filter4<T, Pop<List>>>
type Filter6<T, List extends any[]> = List[0] extends T ? Filter5<T, Pop<List>> : Push<List[0], Filter5<T, Pop<List>>>
type Filter7<T, List extends any[]> = List[0] extends T ? Filter6<T, Pop<List>> : Push<List[0], Filter6<T, Pop<List>>>
type Filter8<T, List extends any[]> = List[0] extends T ? Filter7<T, Pop<List>> : Push<List[0], Filter7<T, Pop<List>>>

export type Filter<T, List extends any[]> = {
    0: []
    1: Filter1<T, List>
    2: Filter2<T, List>
    3: Filter3<T, List>
    4: Filter4<T, List>
    5: Filter5<T, List>
    6: Filter6<T, List>
    7: Filter7<T, List>
    8: Filter8<T, List>
}[ List['length'] extends 0|1|2|3|4|5|6|7|8 ? List['length'] : never]



type Select1<T, List extends any[]> = List[0] extends T ? List : []
type Select2<T, List extends any[]> = List[0] extends T ? Push<List[0], Select1<T, Pop<List>>> : Select1<T, Pop<List>> 
type Select3<T, List extends any[]> = List[0] extends T ? Push<List[0], Select2<T, Pop<List>>> : Select2<T, Pop<List>>
type Select4<T, List extends any[]> = List[0] extends T ? Push<List[0], Select3<T, Pop<List>>> : Select3<T, Pop<List>>
type Select5<T, List extends any[]> = List[0] extends T ? Push<List[0], Select4<T, Pop<List>>> : Select4<T, Pop<List>>
type Select6<T, List extends any[]> = List[0] extends T ? Push<List[0], Select5<T, Pop<List>>> : Select5<T, Pop<List>>
type Select7<T, List extends any[]> = List[0] extends T ? Push<List[0], Select6<T, Pop<List>>> : Select6<T, Pop<List>>
type Select8<T, List extends any[]> = List[0] extends T ? Push<List[0], Select7<T, Pop<List>>> : Select7<T, Pop<List>>

export type Select<T, List extends any[]> = {
    0: []
    1: Select1<T, List>
    2: Select2<T, List>
    3: Select3<T, List>
    4: Select4<T, List>
    5: Select5<T, List>
    6: Select6<T, List>
    7: Select7<T, List>
    8: Select8<T, List>
}[ List['length'] extends 0|1|2|3|4|5|6|7|8 ? List['length'] : never]


/**
 * Select1st<T, any[]>
 * 
 * Select the 1st element of array which is derived from type T 
 */
export type Find<T, List extends any[], NotFound=never> = {
    1: List[0] extends T ? List[0] : NotFound
    2: List[0] extends T ? List[0] : List[1] extends T ? List[1] : NotFound
    3: List[0] extends T ? List[0] : List[1] extends T ? List[1] : List[2] extends T ? List[2] : NotFound
    4: List[0] extends T ? List[0] : List[1] extends T ? List[1] : List[2] extends T ? List[2] : List[3] extends T ? List[3] : NotFound
    5: List[0] extends T ? List[0] : List[1] extends T ? List[1] : List[2] extends T ? List[2] : List[3] extends T ? List[3] : List[4] extends T ? List[4] : NotFound
    6: List[0] extends T ? List[0] : List[1] extends T ? List[1] : List[2] extends T ? List[2] : List[3] extends T ? List[3] : List[4] extends T ? List[4] : List[5] extends T ? List[5] : NotFound
    7: List[0] extends T ? List[0] : List[1] extends T ? List[1] : List[2] extends T ? List[2] : List[3] extends T ? List[3] : List[4] extends T ? List[4] : List[5] extends T ? List[5] : List[6] extends T ? List[6] : NotFound
    8: List[0] extends T ? List[0] : List[1] extends T ? List[1] : List[2] extends T ? List[2] : List[3] extends T ? List[3] : List[4] extends T ? List[4] : List[5] extends T ? List[5] : List[6] extends T ? List[6] : List[7] extends T ? List[7] : NotFound
}[ List['length'] extends 1|2|3|4|5|6|7|8  ? List['length'] : never ]


/**
 * SelectMask
 * 
 * Replace elements by Pad if it doesn't extend T
 */
export type SelectMask<T, List extends any[]> = {
    0: []
    1: [ List[0] extends T ? List[0] : Pad ]
    2: [ List[0] extends T ? List[0] : Pad, List[1] extends T ? List[1] : Pad ]
    3: [ List[0] extends T ? List[0] : Pad, List[1] extends T ? List[1] : Pad, List[2] extends T ? List[2] : Pad ]
    4: [ List[0] extends T ? List[0] : Pad, List[1] extends T ? List[1] : Pad, List[2] extends T ? List[2] : Pad, List[3] extends T ? List[3] : Pad ]
    5: [ List[0] extends T ? List[0] : Pad, List[1] extends T ? List[1] : Pad, List[2] extends T ? List[2] : Pad, List[3] extends T ? List[3] : Pad, List[4] extends T ? List[4] : Pad ]
    6: [ List[0] extends T ? List[0] : Pad, List[1] extends T ? List[1] : Pad, List[2] extends T ? List[2] : Pad, List[3] extends T ? List[3] : Pad, List[4] extends T ? List[4] : Pad, List[5] extends T ? List[5] : Pad ]
    7: [ List[0] extends T ? List[0] : Pad, List[1] extends T ? List[1] : Pad, List[2] extends T ? List[2] : Pad, List[3] extends T ? List[3] : Pad, List[4] extends T ? List[4] : Pad, List[5] extends T ? List[5] : Pad, List[6] extends T ? List[6] : Pad ]
    8: [ List[0] extends T ? List[0] : Pad, List[1] extends T ? List[1] : Pad, List[2] extends T ? List[2] : Pad, List[3] extends T ? List[3] : Pad, List[4] extends T ? List[4] : Pad, List[5] extends T ? List[5] : Pad, List[6] extends T ? List[6] : Pad, List[7] extends T ? List[7] : Pad ]
}[ List['length'] extends 0|1|2|3|4|5|6|7|8  ? List['length'] : never ]

export type Zip<List1 extends any[], List2 extends any[]> = {
    0: []
    1: [ [ List1[0], List2[0] ] ]
    2: [ [ List1[0], List2[0] ], [ List1[1], List2[1] ] ]
    3: [ [ List1[0], List2[0] ], [ List1[1], List2[1] ], [ List1[2], List2[2] ] ]
    4: [ [ List1[0], List2[0] ], [ List1[1], List2[1] ], [ List1[2], List2[2] ], [ List1[3], List2[3] ] ]
    5: [ [ List1[0], List2[0] ], [ List1[1], List2[1] ], [ List1[2], List2[2] ], [ List1[3], List2[3] ], [ List1[4], List2[4] ] ]
    6: [ [ List1[0], List2[0] ], [ List1[1], List2[1] ], [ List1[2], List2[2] ], [ List1[3], List2[3] ], [ List1[4], List2[4] ], [ List1[5], List2[5] ] ]
    7: [ [ List1[0], List2[0] ], [ List1[1], List2[1] ], [ List1[2], List2[2] ], [ List1[3], List2[3] ], [ List1[4], List2[4] ], [ List1[5], List2[5] ], [ List1[6], List2[6] ] ]
    8: [ [ List1[0], List2[0] ], [ List1[1], List2[1] ], [ List1[2], List2[2] ], [ List1[3], List2[3] ], [ List1[4], List2[4] ], [ List1[5], List2[5] ], [ List1[6], List2[6] ], [ List1[7], List2[7] ] ]
}[ List1['length'] extends 0|1|2|3|4|5|6|7|8  ? List1['length'] : never ]    

export type Unzip<List extends [any,any][]> = {
    0: [ [], [] ]
    1: [ [ List[0][0] ], [ List[0][1] ] ]
    2: [ [ List[0][0], List[1][0] ], [ List[0][1], List[1][1] ] ]
    3: [ [ List[0][0], List[1][0], List[2][0] ], [ List[0][1], List[1][1], List[2][1] ] ]
    4: [ [ List[0][0], List[1][0], List[2][0], List[3][0] ], [ List[0][1], List[1][1], List[2][1], List[3][1] ] ]
    5: [ [ List[0][0], List[1][0], List[2][0], List[3][0], List[4][0] ], [ List[0][1], List[1][1], List[2][1], List[3][1], List[4][1] ] ]
    6: [ [ List[0][0], List[1][0], List[2][0], List[3][0], List[4][0], List[5][0] ], [ List[0][1], List[1][1], List[2][1], List[3][1], List[4][1], List[5][1] ] ]
    7: [ [ List[0][0], List[1][0], List[2][0], List[3][0], List[4][0], List[5][0], List[6][0] ], [ List[0][1], List[1][1], List[2][1], List[3][1], List[4][1], List[5][1], List[6][1] ] ]
    8: [ [ List[0][0], List[1][0], List[2][0], List[3][0], List[4][0], List[5][0], List[6][0], List[7][0] ], [ List[0][1], List[1][1], List[2][1], List[3][1], List[4][1], List[5][1], List[6][1], List[7][1] ] ]
}[ List['length'] extends 0|1|2|3|4|5|6|7|8 ? List['length'] : never ]


type Top2<T, List extends any[]> = List extends [infer A, infer B]
    ? B extends T ? [B, A]
    : List
    : never
type Top3<T, List extends any[]> = List extends [infer A, infer B, infer C]
    ? C extends T ? [C, A, B] 
    : B extends T ? [B, A, C]
    : List
    : never
type Top4<T, List extends any[]> = List extends [infer A, infer B, infer C, infer D]
    ? D extends T ? [D, A, B, C]
    : C extends T ? [C, A, B, D]
    : B extends T ? [B, A, C, D]
    : List
    : never
type Top5<T, List extends any[]> = List extends [infer A, infer B, infer C, infer D, infer E]
    ? E extends T ? [E, A, B, C, D]
    : D extends T ? [D, A, B, C, E]
    : C extends T ? [C, A, B, D, E]
    : B extends T ? [B, A, C, D, E]
    : List
    : never
type Top6<T, List extends any[]> = List extends [infer A, infer B, infer C, infer D, infer E, infer F]
    ? F extends T ? [F, A, B, C, D, E]
    : E extends T ? [E, A, B, C, D, F]
    : D extends T ? [D, A, B, C, E, F]
    : C extends T ? [C, A, B, D, E, F]
    : B extends T ? [B, A, C, D, E, F]
    : List
    : never
type Top7<T, List extends any[]> = List extends [infer A, infer B, infer C, infer D, infer E, infer F, infer G]
    ? G extends T ? [G, A, B, C, D, E, F]
    : F extends T ? [F, A, B, C, D, E, G]
    : E extends T ? [E, A, B, C, D, F, G]
    : D extends T ? [D, A, B, C, E, F, G]
    : C extends T ? [C, A, B, D, E, F, G]
    : B extends T ? [B, A, C, D, E, F, G]
    : List
    : never
type Top8<T, List extends any[]> = List extends [infer A, infer B, infer C, infer D, infer E, infer F, infer G, infer H]
    ? H extends T ? [H, A, B, C, D, E, F, G]
    : G extends T ? [G, A, B, C, D, E, F, H]
    : F extends T ? [F, A, B, C, D, E, G, H]
    : E extends T ? [E, A, B, C, D, F, G, H]
    : D extends T ? [D, A, B, C, E, F, G, H]
    : C extends T ? [C, A, B, D, E, F, G, H]
    : B extends T ? [B, A, C, D, E, F, G, H]
    : List
    : never

/**
 * Top
 * 
 * Move the 1st element to the head of array if it extends type T
 */    
export type Top<T, Items extends any[]> = {
    0: Items
    1: Items
    2: Top2<T,Items>    
    3: Top3<T,Items>
    4: Top4<T,Items>
    5: Top5<T,Items>
    6: Top6<T,Items>
    7: Top7<T,Items>
    8: Top8<T,Items>
}[ Items['length'] extends 0|1|2|3|4|5|6|7|8 ? Items['length'] : never ]    

export type MapUnion<T, List extends any[]> = {
    0: []
    1: [ List[0]|T ]
    2: [ List[0]|T, List[1]|T ]
    3: [ List[0]|T, List[1]|T, List[2]|T ]
    4: [ List[0]|T, List[1]|T, List[2]|T, List[3]|T ]
    5: [ List[0]|T, List[1]|T, List[2]|T, List[3]|T, List[4]|T ]
    6: [ List[0]|T, List[1]|T, List[2]|T, List[3]|T, List[4]|T, List[5]|T ]
    7: [ List[0]|T, List[1]|T, List[2]|T, List[3]|T, List[4]|T, List[5]|T, List[6]|T ]
    8: [ List[0]|T, List[1]|T, List[2]|T, List[3]|T, List[4]|T, List[5]|T, List[6]|T, List[7]|T ]
}[ List['length'] extends 0|1|2|3|4|5|6|7|8  ? List['length'] : never ]


export type ToUnion<List extends any[]> = {
    1: List[0]    
    2: List[0] | List[1]
    3: List[0] | List[1] | List[2]
    4: List[0] | List[1] | List[2] | List[3]
    5: List[0] | List[1] | List[2] | List[3] | List[4]
    6: List[0] | List[1] | List[2] | List[3] | List[4] | List[5]
    7: List[0] | List[1] | List[2] | List[3] | List[4] | List[5] | List[6]
    8: List[0] | List[1] | List[2] | List[3] | List[4] | List[5] | List[6] | List[7]
}[ List['length'] extends 1|2|3|4|5|6|7|8  ? List['length'] : never ]

export type SelectToUnion<T, List extends any[]> = {
    1: (List[0] extends T ? List[0] : never)
    2: (List[0] extends T ? List[0] : never) | (List[1] extends T ? List[1] : never)
    3: (List[0] extends T ? List[0] : never) | (List[1] extends T ? List[1] : never) | (List[2] extends T ? List[2] : never)
    4: (List[0] extends T ? List[0] : never) | (List[1] extends T ? List[1] : never) | (List[2] extends T ? List[2] : never) | (List[3] extends T ? List[3] : never)
    5: (List[0] extends T ? List[0] : never) | (List[1] extends T ? List[1] : never) | (List[2] extends T ? List[2] : never) | (List[3] extends T ? List[3] : never) | (List[4] extends T ? List[4] : never)
    6: (List[0] extends T ? List[0] : never) | (List[1] extends T ? List[1] : never) | (List[2] extends T ? List[2] : never) | (List[3] extends T ? List[3] : never) | (List[4] extends T ? List[4] : never) | (List[5] extends T ? List[5] : never)
    7: (List[0] extends T ? List[0] : never) | (List[1] extends T ? List[1] : never) | (List[2] extends T ? List[2] : never) | (List[3] extends T ? List[3] : never) | (List[4] extends T ? List[4] : never) | (List[5] extends T ? List[5] : never) | (List[6] extends T ? List[6] : never)
    8: (List[0] extends T ? List[0] : never) | (List[1] extends T ? List[1] : never) | (List[2] extends T ? List[2] : never) | (List[3] extends T ? List[3] : never) | (List[4] extends T ? List[4] : never) | (List[5] extends T ? List[5] : never) | (List[6] extends T ? List[6] : never) | (List[7] extends T ? List[7] : never)
}[ List['length'] extends 1|2|3|4|5|6|7|8  ? List['length'] : never ]

export type ToIntersect<List extends any[]> = {
    1: List[0]    
    2: List[0] & List[1]
    3: List[0] & List[1] & List[2]
    4: List[0] & List[1] & List[2] & List[3]
    5: List[0] & List[1] & List[2] & List[3] & List[4]
    6: List[0] & List[1] & List[2] & List[3] & List[4] & List[5]
    7: List[0] & List[1] & List[2] & List[3] & List[4] & List[5] & List[6]
    8: List[0] & List[1] & List[2] & List[3] & List[4] & List[5] & List[6] & List[7]
}[ List['length'] extends 1|2|3|4|5|6|7|8  ? List['length'] : never ]


////////////////////////////////////////////////////////////////////////
/// Number
////////////////////////////////////////////////////////////////////////

type NumberToTuple<N extends number, Result extends Array<any> = []> = {
    done: Result
    continue: NumberToTuple<N, Push<1, Result>> extends infer X1 ? Cast<X1, 1[]> : never
} [ Length<Result> extends N  ? "done" : "continue"]

type CompLength<Items1 extends any[], Items2 extends any[]> = {
    less: -1
    equal: 0
    great: 1
    continue:  CompLength<Pop<Items1>, Pop<Items2>>
}[ Length<Items1> extends Length<Items2> ? "equal" : Length<Items1> extends 0 ? "less" : Length<Items2> extends 0 ? "great" : "continue" ]

export type Decrease<N extends number> = Length<Pop<NumberToTuple<N>>>

export type Comp<Num1 extends number, Num2 extends number> = CompLength<NumberToTuple<Num1>, NumberToTuple<Num2>>
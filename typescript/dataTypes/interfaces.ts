export interface NumberType {
    plus(number: NumberType): NumberType,
    minus(number: NumberType): NumberType,
    multiply(number: NumberType): NumberType,
    divide(number: NumberType): NumberType,
    getVal(): number,
    getType(): string,
}

export interface BoolType {
    getval(): boolean
    setVal(new_val: boolean): void
    getType(): string
}
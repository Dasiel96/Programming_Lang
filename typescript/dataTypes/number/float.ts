
import { TT_DOUBLE, TT_FLOAT } from "../../tokenConsts"
import { NumberType } from "../interfaces"
import { DoubleType } from "./double"
import { IntType } from "./int"


/*
* represents a float type in my basic language
* allows for easy operations of add, minus, multiply, divide between double and
* int data in the language
*/
export class FloatType implements NumberType {
    private val: number

    constructor(value: number) {
        this.val = value
    }

    /**
     * performs an operation (mul, div, add, minus) and casts the result to the appropreate number type
     *
     * @param   {(number, number) => number}      calc   the operation to be performed
     * @param   {NumberType}                      other  the other value to do an operation on
     *
     * @return  {NumberType}                             returns the same or different number type
     * @author Daniel Schechtman
     */
    private compute(calc: (a: number, b: number) => number, other: NumberType): NumberType {
        let num: NumberType
        const result = calc(this.val, other.getVal())
        if (Number.isInteger(result)) {
            num = new IntType(result)
        }
        else if (other.getType() == TT_DOUBLE) {
            num = new DoubleType(result)
        }
        else {
            num = new FloatType(result)
        }

        return num
    }

    getVal(): number {
        return this.val
    }

    getType(): string {
        return TT_FLOAT
    }

    plus(number: NumberType): NumberType {
        return this.compute((a, b) => {return a + b}, number)
    }

    minus(number: NumberType): NumberType {
        return this.compute((a, b) => {return a - b}, number)
    }

    multiply(number: NumberType): NumberType {
        return this.compute((a, b) => {return a * b}, number)
    }

    divide(number: NumberType): NumberType {
        return this.compute((a, b) => {return a / b}, number)
    }

    toString(): string {
        return this.val.toString()
    }

}
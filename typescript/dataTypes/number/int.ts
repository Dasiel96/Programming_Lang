
import { TT_FLOAT, TT_FLOAT_SIZE, TT_DOUBLE, TT_INT } from "../../tokenConsts"
import { NumberType } from "../interfaces"
import { DoubleType } from "./double"
import { FloatType } from "./float"


/*
* represents a int type in my basic language
* allows for easy operations of add, minus, multiply, divide between double and
* float data in the language
*/
export class IntType implements NumberType {
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
        
        if (other.getType() === TT_FLOAT){
            num = new FloatType(result)
        }
        else if (!Number.isInteger(result) && result.toString().length <= TT_FLOAT_SIZE) {
            num = new FloatType(result)
        }
        else if (other.getType() === TT_DOUBLE || !Number.isInteger(result)) {
            num = new DoubleType(result)
        }
        else {
            num = new IntType(result)
        }


        return num
    }

    getVal(): number {
        return this.val
    }

    getType(): string {
        return TT_INT
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
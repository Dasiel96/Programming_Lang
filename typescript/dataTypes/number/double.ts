import { TT_DOUBLE } from "../../tokenConsts"
import { IntType } from "./int"
import { NumberType } from "../interfaces"

/*
* used to represent a double type in my mock up basic language
* allows for the easy operation of add, subtract, divide, and multiply
* with float data and int data
*/
export class DoubleType implements NumberType {
    private val: number

    constructor(value: number) {
        this.val = value
    }

    /**
     * performs the operation and converts the result into the appropreate number type
     *
     * @param   {(number, number) => number}      calc  the operation to perform
     * @param   {NumberType}                      other the number to do the calculation on
     *
     * @return  {NumberType}                            returns a number of the same or different type
     * @author Daniel Schechtman
     */
    private compute(calc: (a: number, b: number) => number, other: NumberType): NumberType {
        let num: NumberType
        const result = calc(this.val, other.getVal())

        if (Number.isInteger(result)) {
            num = new IntType(result)
        }
        else {
            num = new DoubleType(result)
        }

        return num
    }

    getVal(): number {
        return this.val
    }

    getType(): string {
        return TT_DOUBLE
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

    toString(): String {
        return this.val.toString()
    }

}
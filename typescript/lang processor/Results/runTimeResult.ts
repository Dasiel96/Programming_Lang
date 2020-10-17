import { NumberType } from "../../dataTypes/interfaces";
import { RunTimeError } from "../../exceptions";

/*
* used to catch errors during runtime
* either the value can be set to an object or the error can be set to an object
* when one is set to a object the other will be set to null
*/
export class RTResult {
    private value: NumberType | null = null
    private error: RunTimeError | null = null

    /**
     * will store the error if the passed in RTResult has an error, otherwise will store the value
     *
     * @param   {RTResult}  res
     *
     * @author Daniel Schechtman
     */
    register(res: RTResult): void {
        if (res.getError()) {
            this.failure(res.getError()!!)
        }
        else if (res.getValue()){
            this.success(res.getValue()!!)
        }
    }

    /**
     * will set the value to the passed in NumberType, and the error to null
     *
     * @param   {NumberType}  new_val
     *
     * @author Daniel Schechtman
     */
    success(new_val: NumberType): void {
        this.value = new_val
        this.error = null
    }

    /**
     * will set the error to the passed in RunTimeError, and the value to null
     *
     * @param   {RunTimeError}  err
     *
     * @author Daniel Schechtman
     */
    failure(err: RunTimeError): void {
        this.error = err
        this.value = null
    }

    getValue(): NumberType | null {
        return this.value
    }

    getError(): RunTimeError | null {
        return this.error
    }

    toString(): string {
        let str = ""
        
        if (this.error) {
            str = this.error.toString()
        }
        else if (this.value) {
            str = this.value.toString()
        }

        return str
    }
}
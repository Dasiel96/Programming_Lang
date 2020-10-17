import { IllegalSyntaxError } from "../../exceptions"
import { ParseNode } from "../../Nodes/nodeInterfaces"

/*
* used to determine if there was an error that occured during the parsing process
* will only store an error or a value, but never both at the same time
*/
export class ParseResult {
    private node: ParseNode | null
    private error: IllegalSyntaxError | null

    constructor(node: ParseNode | null=null, error: IllegalSyntaxError | null=null) {
        this.node = node
        this.error = error
    }

    /**
     * will store the error of the passed in parse result if there is an error
     * otherwise it will store the value of the passed in parse result
     *
     * @param   {ParseResult}  res
     *
     * @author Daniel Schechtman
     */
    register(res: ParseResult): void {
        if (res.getError()) {
            this.failure(res.getError()!!)
        }
        else if (res.getNode()) {
            this.success(res.getNode()!!)
        }
    }

    /**
     * will store a node, and will set the error to null
     *
     * @param   {ParseNode}  node
     *
     * @author Daniel Schechtman
     */
    success(node: ParseNode): void {
        this.node = node
        this.error = null
    }

    /**
     * will store an error, and set the node to null
     *
     * @param   {IllegalSyntaxError}  error
     *
     * @author Daniel Schechtman
     */
    failure(error: IllegalSyntaxError): void {
        this.error = error
        this.node = null
    }

    getError(): IllegalSyntaxError | null {
        return this.error
    }

    getNode(): ParseNode | null {
        return this.node
    }

    toString() {
        let msg
        if (this.node){
            msg = `${this.node}`
        }
        else {
            msg = `${this.error}`
        }
        return msg
    }
}
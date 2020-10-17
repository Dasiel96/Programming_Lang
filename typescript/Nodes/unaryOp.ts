import { TT_UNARY_OP_NODE_TYPE } from "../tokenConsts"
import { OpNode, ParseNode } from "./nodeInterfaces"


/*
* node representing a unary operation (ie -1)
*/
export class UnaryNode implements OpNode {
    private op: string
    private node: ParseNode

    constructor (operation: string, node: ParseNode) {
        this.op = operation
        this.node = node
    }

    getOperation(): string {
        return this.op
    }

    getNode(): ParseNode {
        return this.node
    }

    getType(): string {
        return TT_UNARY_OP_NODE_TYPE
    }

    // override methods below

    toString() {
        return `(${this.op} ${this.node})`
    }

    // override methods above
}
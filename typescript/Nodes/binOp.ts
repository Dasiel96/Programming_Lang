import { TT_TREE_NODE_TYPE } from "../tokenConsts"
import { OpNode, ParseNode } from "./nodeInterfaces"

/*
* represents a node on the abstract syntax tree
*/
export class TreeNode implements OpNode {
    private op: string
    private left_node: ParseNode
    private right_node: ParseNode

    constructor(operation: string, l_node: ParseNode, r_node: ParseNode) {
        this.op = operation
        this.left_node = l_node
        this.right_node = r_node
    }

    getType(): string {
        return TT_TREE_NODE_TYPE
    }

    getOperation(): string {
        return this.op
    }

    getLeftNode(): ParseNode {
        return this.left_node
    }

    getRightNode(): ParseNode {
        return this.right_node
    }
    
    // override methods below

    toString() {
        return `(${this.left_node} ${this.op} ${this.right_node})`
    }

    // override methods above
}
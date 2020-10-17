export interface ParseNode {
    /**
     * returns the type of the node
     *
     * @return  {string}
     * @author Daniel Schechtman
     */
    getType(): string
}

export interface OpNode extends ParseNode {
    /**
     * returns the type of operation to perform
     *
     * @return  {string}
     * @author Daniel Schechtman
     */
    getOperation(): string
}
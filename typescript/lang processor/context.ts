import { Position } from "../position"

export class Context {
    private display_name: string
    private parent: Context | null
    private parent_entry_pos: Position | null

    constructor(display_name: string, parent: Context | null = null, parent_entry_pos: Position | null = null) {
        this.display_name = display_name
        this.parent = parent
        this.parent_entry_pos = parent_entry_pos
    }
}
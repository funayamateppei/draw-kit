import type {ICommand} from "./ICommand"
import type {DrawingObject} from "../types"

export class AddObjectCommand implements ICommand {
  private object: DrawingObject
  private addAction: (obj: DrawingObject) => void
  private removeAction: (id: string) => void

  constructor(object: DrawingObject, addAction: (obj: DrawingObject) => void, removeAction: (id: string) => void) {
    this.object = object
    this.addAction = addAction
    this.removeAction = removeAction
  }

  execute() {
    this.addAction(this.object)
  }

  undo() {
    this.removeAction(this.object.id)
  }
}

import type {ICommand} from "./ICommand"
import type {DrawingObject} from "../types"

export class UpdateObjectCommand implements ICommand {
  private oldObject: DrawingObject
  private newObject: DrawingObject
  private updateAction: (obj: DrawingObject) => void

  constructor(oldObject: DrawingObject, newObject: DrawingObject, updateAction: (obj: DrawingObject) => void) {
    this.oldObject = oldObject
    this.newObject = newObject
    this.updateAction = updateAction
  }

  execute() {
    this.updateAction(this.newObject)
  }

  undo() {
    this.updateAction(this.oldObject)
  }
}

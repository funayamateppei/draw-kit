import type {ICommand} from "../../domain/commands/ICommand"

export class CommandManager {
  private history: ICommand[] = []
  private historyIndex: number = -1

  execute(command: ICommand) {
    // If we are not at the end of history, remove future commands
    if (this.historyIndex < this.history.length - 1) {
      this.history = this.history.slice(0, this.historyIndex + 1)
    }

    command.execute()
    this.history.push(command)
    this.historyIndex++
  }

  undo() {
    if (this.historyIndex >= 0) {
      this.history[this.historyIndex].undo()
      this.historyIndex--
    }
  }

  redo() {
    if (this.historyIndex < this.history.length - 1) {
      this.historyIndex++
      this.history[this.historyIndex].execute()
    }
  }

  canUndo(): boolean {
    return this.historyIndex >= 0
  }

  canRedo(): boolean {
    return this.historyIndex < this.history.length - 1
  }

  reset() {
    this.history = []
    this.historyIndex = -1
  }
}

import {describe, it, expect, beforeEach, vi} from "vitest"
import {CommandManager} from "./CommandManager"
import type {ICommand} from "../../domain/commands/ICommand"

class MockCommand implements ICommand {
  private executeFn: () => void
  private undoFn: () => void

  constructor(executeFn: () => void, undoFn: () => void) {
    this.executeFn = executeFn
    this.undoFn = undoFn
  }

  execute() {
    this.executeFn()
  }

  undo() {
    this.undoFn()
  }
}

describe("CommandManager", () => {
  let commandManager: CommandManager

  beforeEach(() => {
    commandManager = new CommandManager()
  })

  it("should execute a command", () => {
    const executeFn = vi.fn()
    const undoFn = vi.fn()
    const command = new MockCommand(executeFn, undoFn)

    commandManager.execute(command)

    expect(executeFn).toHaveBeenCalledTimes(1)
    expect(commandManager.canUndo()).toBe(true)
    expect(commandManager.canRedo()).toBe(false)
  })

  it("should undo a command", () => {
    const executeFn = vi.fn()
    const undoFn = vi.fn()
    const command = new MockCommand(executeFn, undoFn)

    commandManager.execute(command)
    commandManager.undo()

    expect(undoFn).toHaveBeenCalledTimes(1)
    expect(commandManager.canUndo()).toBe(false)
    expect(commandManager.canRedo()).toBe(true)
  })

  it("should redo a command", () => {
    const executeFn = vi.fn()
    const undoFn = vi.fn()
    const command = new MockCommand(executeFn, undoFn)

    commandManager.execute(command)
    commandManager.undo()
    commandManager.redo()

    expect(executeFn).toHaveBeenCalledTimes(2) // Once initially, once on redo
    expect(commandManager.canUndo()).toBe(true)
    expect(commandManager.canRedo()).toBe(false)
  })

  it("should clear redo stack when new command is executed", () => {
    const cmd1 = new MockCommand(vi.fn(), vi.fn())
    const cmd2 = new MockCommand(vi.fn(), vi.fn())

    commandManager.execute(cmd1)
    commandManager.undo() // Undo cmd1

    // Execute cmd2, should clear cmd1 from future
    commandManager.execute(cmd2)

    expect(commandManager.canRedo()).toBe(false)

    commandManager.undo() // Undo cmd2
    expect(commandManager.canUndo()).toBe(false) // Should be empty now? No, cmd1 was overwritten?
    // Wait, logic:
    // [cmd1] -> index 0
    // undo -> index -1
    // execute cmd2 -> [cmd2] (cmd1 removed) -> index 0
    // undo -> index -1

    expect(commandManager.canUndo()).toBe(false)
  })
})

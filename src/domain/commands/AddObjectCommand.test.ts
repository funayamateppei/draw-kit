import {describe, it, expect, vi} from "vitest"
import {AddObjectCommand} from "./AddObjectCommand"
import type {DrawingObject} from "../types"

describe("AddObjectCommand", () => {
  it("should call addAction on execute", () => {
    const mockObject = {id: "1", type: "freehand"} as DrawingObject
    const addAction = vi.fn()
    const removeAction = vi.fn()

    const command = new AddObjectCommand(mockObject, addAction, removeAction)
    command.execute()

    expect(addAction).toHaveBeenCalledWith(mockObject)
    expect(removeAction).not.toHaveBeenCalled()
  })

  it("should call removeAction on undo", () => {
    const mockObject = {id: "1", type: "freehand"} as DrawingObject
    const addAction = vi.fn()
    const removeAction = vi.fn()

    const command = new AddObjectCommand(mockObject, addAction, removeAction)
    command.undo()

    expect(removeAction).toHaveBeenCalledWith("1")
    expect(addAction).not.toHaveBeenCalled()
  })
})

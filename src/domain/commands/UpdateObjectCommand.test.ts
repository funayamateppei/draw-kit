import {describe, it, expect, vi} from "vitest"
import {UpdateObjectCommand} from "./UpdateObjectCommand"
import type {DrawingObject} from "../types"

describe("UpdateObjectCommand", () => {
  it("should call updateAction with newObject on execute", () => {
    const oldObj = {id: "1", color: "red"} as DrawingObject
    const newObj = {id: "1", color: "blue"} as DrawingObject
    const updateAction = vi.fn()

    const command = new UpdateObjectCommand(oldObj, newObj, updateAction)
    command.execute()

    expect(updateAction).toHaveBeenCalledWith(newObj)
  })

  it("should call updateAction with oldObject on undo", () => {
    const oldObj = {id: "1", color: "red"} as DrawingObject
    const newObj = {id: "1", color: "blue"} as DrawingObject
    const updateAction = vi.fn()

    const command = new UpdateObjectCommand(oldObj, newObj, updateAction)
    command.undo()

    expect(updateAction).toHaveBeenCalledWith(oldObj)
  })
})

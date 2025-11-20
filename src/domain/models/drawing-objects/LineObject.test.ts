import {describe, it, expect} from "vitest"
import {LineObject} from "./LineObject"
import {Point} from "../Point"

describe("LineObject", () => {
  it("should move start and end points", () => {
    const start = new Point(0, 0)
    const end = new Point(10, 10)
    const obj = new LineObject("1", "line", "#000", 5, start, end)

    const delta = new Point(5, 5)
    const movedObj = obj.move(delta)

    expect(movedObj.start.x).toBe(5)
    expect(movedObj.start.y).toBe(5)
    expect(movedObj.end.x).toBe(15)
    expect(movedObj.end.y).toBe(15)
  })

  it("should update end point", () => {
    const start = new Point(0, 0)
    const end = new Point(10, 10)
    const obj = new LineObject("1", "line", "#000", 5, start, end)

    const newEnd = new Point(20, 20)
    const updatedObj = obj.updateEnd(newEnd)

    expect(updatedObj.start).toEqual(start) // Start should not change
    expect(updatedObj.end).toEqual(newEnd)
  })
})

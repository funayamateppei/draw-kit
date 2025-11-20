import {describe, it, expect} from "vitest"
import {FreehandObject} from "./FreehandObject"
import {Point} from "../Point"

describe("FreehandObject", () => {
  it("should create instance correctly", () => {
    const points = [new Point(0, 0)]
    const obj = new FreehandObject("1", "freehand", "#000", 5, points)

    expect(obj.id).toBe("1")
    expect(obj.points).toEqual(points)
  })

  it("should add point correctly", () => {
    const startPoint = new Point(0, 0)
    const obj = new FreehandObject("1", "freehand", "#000", 5, [startPoint])

    const newPoint = new Point(10, 10)
    const newObj = obj.addPoint(newPoint)

    expect(newObj.points).toHaveLength(2)
    expect(newObj.points[1]).toEqual(newPoint)
    // Immutability check
    expect(obj.points).toHaveLength(1)
  })

  it("should move all points correctly", () => {
    const points = [new Point(0, 0), new Point(10, 10)]
    const obj = new FreehandObject("1", "freehand", "#000", 5, points)

    const delta = new Point(5, 5)
    const movedObj = obj.move(delta)

    expect(movedObj.points[0].x).toBe(5)
    expect(movedObj.points[0].y).toBe(5)
    expect(movedObj.points[1].x).toBe(15)
    expect(movedObj.points[1].y).toBe(15)
  })

  it("should clone correctly", () => {
    const points = [new Point(0, 0)]
    const obj = new FreehandObject("1", "freehand", "#000", 5, points)
    const cloned = obj.clone()

    expect(cloned).not.toBe(obj) // Different reference
    expect(cloned.points).toEqual(obj.points) // Same content
    expect(cloned.points).not.toBe(obj.points) // Different array reference
  })
})

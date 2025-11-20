import {describe, it, expect} from "vitest"
import {Point} from "./Point"

describe("Point", () => {
  it("should create a point with x and y coordinates", () => {
    const point = new Point(10, 20)
    expect(point.x).toBe(10)
    expect(point.y).toBe(20)
  })

  it("should add two points correctly", () => {
    const p1 = new Point(10, 20)
    const p2 = new Point(5, 5)
    const result = p1.add(p2)
    expect(result.x).toBe(15)
    expect(result.y).toBe(25)
  })

  it("should subtract two points correctly", () => {
    const p1 = new Point(10, 20)
    const p2 = new Point(5, 5)
    const result = p1.subtract(p2)
    expect(result.x).toBe(5)
    expect(result.y).toBe(15)
  })

  it("should calculate distance correctly", () => {
    const p1 = new Point(0, 0)
    const p2 = new Point(3, 4)
    const distance = p1.distanceTo(p2)
    expect(distance).toBe(5)
  })
})

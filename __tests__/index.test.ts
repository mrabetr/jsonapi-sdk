import { deserialize } from "../src/index";

describe('deserialize', () => {
  it("should return a JS resource object with 'id' and 'type' properties", () => {
    const jsonApiObject = ''
    const deserialized = deserialize(jsonApiObject)

    expect(deserialized.hasOwnProperty('id')).toBe(true)
    expect(deserialized.hasOwnProperty('type')).toBe(true)
  })
})

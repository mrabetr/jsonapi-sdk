import * as JSONAPI from 'jsonapi-typescript';
import { deserialize } from "../src/index";

describe('deserialize', () => {
  let jsonApiObject: JSONAPI.Document = {
    data: {
      type: "product",
      id: "1"
    }
  };

  it("should return a JS resource object with 'type' and 'id' properties", () => {
    const deserialized = deserialize(jsonApiObject)

    expect(deserialized.hasOwnProperty('type')).toBe(true)
    expect(deserialized.hasOwnProperty('id')).toBe(true)
  })

  it("should return a JS resource object with type 'product' and id '1'", () => {
    const deserialized = deserialize(jsonApiObject)

    expect(deserialized.type).toBe('product')
    expect(deserialized.id).toBe('1')
  })
})

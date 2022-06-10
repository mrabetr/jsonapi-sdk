import * as JSONAPI from 'jsonapi-typescript';
import { deserialize } from "../src/index";

describe('deserialize', () => {
  let jsonApiObject: JSONAPI.Document = {
    data: {
      type: 'product',
      id: '1'
    }
  };

  it("should return a JS resource object with 'id' and 'type' properties", () => {
    const deserialized = deserialize(jsonApiObject)

    expect(deserialized.hasOwnProperty('type')).toBe(true)
    expect(deserialized.hasOwnProperty('id')).toBe(true)
  })
})

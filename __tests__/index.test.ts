import * as JSONAPI from 'jsonapi-typescript';
import { deserialize } from "../src/index";

describe('deserialize', () => {
  let resourceObject: JSONAPI.Document = {
    data: {
      type: "product",
      id: "1"
    }
  };

  it("should return a JS resource object with 'type' and 'id' properties", () => {
    const deserialized = deserialize(resourceObject)

    expect(deserialized.hasOwnProperty('type')).toBe(true)
    expect(deserialized.hasOwnProperty('id')).toBe(true)
  })

  it("should return a JS resource object with type 'product' and id '1'", () => {
    const deserialized = deserialize(resourceObject)

    expect(deserialized.type).toBe('product')
    expect(deserialized.id).toBe('1')
  })

  describe('of a JSON:API resource object with attributes', () => {
    resourceObject = {
      data: {
        type: "product",
        id: "1",
        attributes: {
          name: "iPhone 13 Pro Silver 128GB",
          sku: "iphone-13-pro-silver-128gb"
        }
      }
    };

    it("should return a JS resource object with the attributes as properties", () => {
      const deserialized = deserialize(resourceObject)

      expect(deserialized.hasOwnProperty('name')).toBe(true)
      expect(deserialized.hasOwnProperty('sku')).toBe(true)
    })

    it("should return a JS resource object with the same attributes values", () => {
      const deserialized = deserialize(resourceObject)

      expect(deserialized.name).toBe('iPhone 13 Pro Silver 128GB')
      expect(deserialized.sku).toBe('iphone-13-pro-silver-128gb')
    })
  })
})

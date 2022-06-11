import type { DocWithData, ResourceObject } from 'jsonapi-typescript'
import { deserialize } from "../src/index";

describe('deserialize', () => {
  let response: DocWithData = {
    data: {
      type: "product",
      id: "1"
    }
  };
  console.log(response);
  let JSONAPIObject: ResourceObject = {
    type: "product",
    id: "1"
  };
  console.log(JSONAPIObject);

  it("should return a JS resource object with 'type' and 'id' properties", () => {
    const deserialized = deserialize(response)
    console.log(deserialized);

    expect(deserialized.hasOwnProperty('type')).toBe(true)
    expect(deserialized.hasOwnProperty('id')).toBe(true)
  })

  it("should return a JS resource object with type 'product' and id '1'", () => {
    const deserialized = deserialize(response)
    const deserializedResponse = JSON.parse(JSON.stringify(deserialized))

    expect(deserializedResponse.type).toBe('product')
    expect(deserializedResponse.id).toBe('1')
  })

  describe('of a JSON:API resource object with attributes', () => {
    response = {
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
      const deserialized = deserialize(response)

      expect(deserialized.hasOwnProperty('name')).toBe(true)
      expect(deserialized.hasOwnProperty('sku')).toBe(true)
    })

    it("should return a JS resource object with the same attributes values", () => {
      const deserialized = deserialize(response)
      const deserializedResponse = JSON.parse(JSON.stringify(deserialized))

      expect(deserializedResponse.name).toBe('iPhone 13 Pro Silver 128GB')
      expect(deserializedResponse.sku).toBe('iphone-13-pro-silver-128gb')
    })
  })
})

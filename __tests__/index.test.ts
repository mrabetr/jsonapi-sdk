import type { Value as JSONValue } from 'json-typescript'
import type { DocWithData, ResourceObject } from 'jsonapi-typescript'
import type { Resource, ResourceTypeLock } from "../src/index";
import { deserialize, serialize } from "../src/index";

describe('deserialize', () => {
  const response: DocWithData = {
    data: {
      type: "product",
      id: "1",
      attributes: {
        name: "iPhone 13 Pro Silver 128GB",
        sku: "iphone-13-pro-silver-128gb"
      },
      relationships: {
        variations: {
          data: [
            {
              type: "variation",
              id: "1"
            },
            {
              type: "variation",
              id: "2"
            }
          ]
        }
      }
    }
  };
  // console.log(response);

  let JSONAPIObject: ResourceObject = {
    type: "product",
    id: "1"
  };
  // console.log(JSONAPIObject);

  const deserialized = deserialize(response);
  // const deserialized: (Resource | Resource[]) = deserialize(response)
  console.log(deserialized);

  it("should return a JS resource object with 'type' and 'id' properties", () => {

    expect(deserialized.hasOwnProperty('type')).toBe(true)
    expect(deserialized.hasOwnProperty('id')).toBe(true)
  })

  it("should return a JS resource object with type 'product' and id '1'", () => {
    const deserializedResponse = JSON.parse(JSON.stringify(deserialized));

    expect(deserializedResponse.type).toBe('product')
    expect(deserializedResponse.id).toBe('1')
  })

  describe('of a JSON:API resource object with attributes', () => {
    it("should return a JS resource object with the attributes as properties", () => {

      expect(deserialized.hasOwnProperty('name')).toBe(true)
      expect(deserialized.hasOwnProperty('sku')).toBe(true)
    })

    it("should return a JS resource object with the same attributes values", () => {
      const deserializedResponse = JSON.parse(JSON.stringify(deserialized));

      expect(deserializedResponse.name).toBe('iPhone 13 Pro Silver 128GB')
      expect(deserializedResponse.sku).toBe('iphone-13-pro-silver-128gb')
    })
  })
})

describe('serialize', () => {
  const type: ResourceTypeLock = 'cart'
  const resource = {
    id: "98",
    type,
    guest: true,
    email: null,
    currency: "USD",
    cart_items: [
      {
        id: "202",
        type: 'cart_item'
      }
    ],
    store: {
      id: "52",
      type: "store"
    }
  }

  const serialized = serialize(resource);
  console.log(serialized);

  // it("should return a JS resource object with 'type' and 'id' properties", () => {

  //   expect(serialized.hasOwnProperty('type')).toBe(true)
  //   expect(serialized.hasOwnProperty('id')).toBe(true)
  // })
})

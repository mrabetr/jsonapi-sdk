import type { DocWithData, ResourceObject } from 'jsonapi-typescript'
import type { ModelType } from "../src/resource";
import type { Product } from "../src/models";
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

  const deserialized = deserialize(response) as Product;
  console.log(deserialized);

  it("should return a JS resource object with 'type' and 'id' properties", () => {

    expect(deserialized.hasOwnProperty('type')).toBe(true)
    expect(deserialized.hasOwnProperty('id')).toBe(true)
  })

  it("should return a JS resource object with type 'product' and id '1'", () => {

    expect(deserialized.type).toBe('product')
    expect(deserialized.id).toBe('1')
  })

  describe('of a JSON:API resource object with attributes', () => {
    it("should return a JS resource object with the attributes as properties", () => {

      expect(deserialized.hasOwnProperty('name')).toBe(true)
      expect(deserialized.hasOwnProperty('sku')).toBe(true)
    })

    it("should return a JS resource object with the same attributes values", () => {

      expect(deserialized.name).toBe('iPhone 13 Pro Silver 128GB')
      expect(deserialized.sku).toBe('iphone-13-pro-silver-128gb')
    })
  })
})

describe('serialize', () => {
  const type: ModelType = 'cart'
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

  it("should return a JSON:API resource object with 'type' and 'id' properties", () => {

    expect(serialized.hasOwnProperty('type')).toBe(true)
    expect(serialized.hasOwnProperty('id')).toBe(true)
  })

  it("should return a JSON:API resource object with type 'cart' and id '98'", () => {

    expect(serialized.type).toBe('cart')
    expect(serialized.id).toBe('98')
  })
})

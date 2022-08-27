import type { DocWithData, ResourceObject } from 'jsonapi-typescript'
import type { ModelType } from "../src/resource";
import type { Product } from "../src/models";
import { deserialize, serialize } from "../src/index";

describe('deserialize product', () => {
  const response: DocWithData = {
    data: {
      type: "product",
      id: "1",
      attributes: {
        name: "iPhone 13 Pro",
        sku: "iphone-13-pro",
        parent: true
      },
      relationships: {
        variations: {
          data: [
            { type: "variation", id: "1" },
            { type: "variation", id: "2" }
          ]
        },
        children: {
          data: [
            { type: "product", id: "2" },
            { type: "product", id: "3" },
          ]
        }
      }
    },
    included: [
      { type: "variation", id: "1", attributes: { name: "Color" } },
      { type: "variation", id: "2", attributes: { name: "Capacity" } },
      { type: "product", id: "2", attributes: { name: "iPhone 13 Pro Silver 64GB", sku: "iphone-13-pro-silver-64gb", parent: false } },
      { type: "product", id: "3", attributes: { name: "iPhone 13 Pro Silver 128GB", sku: "iphone-13-pro-silver-128gb", parent: false } }
    ]
  };

  // let JSONAPIObject: ResourceObject = {
  //   type: "product",
  //   id: "1"
  // };
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

    it("should return a JS resource object with the same attributes", () => {
      // Attributes object from the DocWithData response object
      const res = response.data as ResourceObject;
      // Attributes subset object from the deserialized Resource object
      const deserializedAttributes = (({ name, sku, parent }) => ({ name, sku, parent }))(deserialized);

      expect(deserializedAttributes).toEqual(res.attributes)
    })
  })
})

describe('serialize cart', () => {
  const type: ModelType = "cart"
  const resource = {
    id: "98",
    type,
    guest: true,
    email: null,
    currency: "USD",
    cart_items: [
      { id: "202", type: 'cart_item' }
    ],
    store: { id: "52", type: "store" }
  }

  const serialized = serialize(resource);
  console.log(serialized);

  it("should return a JSON:API resource object with 'type' and 'id' properties", () => {

    expect(serialized.hasOwnProperty('type')).toBe(true)
    expect(serialized.hasOwnProperty('id')).toBe(true)
  })

  it(`should return a JSON:API resource object with type '${resource.type}' and id '${resource.id}'`, () => {

    expect(serialized.type).toBe(resource.type)
    expect(serialized.id).toBe(resource.id)
  })

  describe('of a JS resource object with attributes and relationships', () => {
    it("should return a JSON:API resource object with 'attributes' and 'relationships' properties", () => {

      expect(serialized.hasOwnProperty('attributes')).toBe(true)
      expect(serialized.hasOwnProperty('relationships')).toBe(true)
    })

    it("should return a JSON:API resource object to have the expected properties in attributes and relationships", () => {

      expect(serialized.attributes).toHaveProperty('email')
      expect(serialized.relationships).toHaveProperty('cart_items')
      expect(serialized.relationships).toHaveProperty('store')
    })
  })
})

describe('serialize product', () => {
  // const type: ModelType = "product"
  const resource = {
    id: "1",
    type: "product" as ModelType,
    name: "iPhone 13 Pro",
    sku: "iphone-13-pro",
    children: [
      { id: "2", type: 'product' },
      { id: "3", type: 'product' }
    ]
  }

  const serialized = serialize(resource);
  console.log(serialized);

  it("should return a JSON:API resource object with 'type' and 'id' properties", () => {

    expect(serialized.hasOwnProperty('type')).toBe(true)
    expect(serialized.hasOwnProperty('id')).toBe(true)
  })

  it(`should return a JSON:API resource object with type '${resource.type}' and id '${resource.id}'`, () => {

    expect(serialized.type).toBe(resource.type)
    expect(serialized.id).toBe(resource.id)
  })

  describe('of a JS resource object with attributes and relationships', () => {
    it("should return a JSON:API resource object with 'attributes' and 'relationships' properties", () => {

      expect(serialized.hasOwnProperty('attributes')).toBe(true)
      expect(serialized.hasOwnProperty('relationships')).toBe(true)
    })

    it("should return a JSON:API resource object to have the expected properties in attributes and relationships", () => {

      expect(serialized.attributes).toHaveProperty('name')
      expect(serialized.relationships).toHaveProperty('children')
    })
  })
})

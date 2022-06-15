# `jsonapi-sdk` - a JSON:API (de)serializer

JSON:API Deserializer and Serializer using TypeScript

## Install

```shell
yarn add jsonapi-sdk
```

or

```shell
npm install jsonapi-sdk
```

## Usage

[![Edit jsonapi-sdk](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/jsonapi-sdk-mwv62w?fontsize=14&hidenavigation=1&theme=dark)

```typescript
import { deserialize, serialize } from 'jsonapi-sdk'
import type { DocWithData, ModelType, Resource } from "jsonapi-sdk";

// sample test data

// jsonapiResponse variable to be deserialized
export const jsonapiResponse: DocWithData = {
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

// resource variable to be serialized
const type: ModelType = "cart";
export const resource = {
  id: "98",
  type,
  guest: true,
  email: null,
  currency: "USD",
  cart_items: [
    {
      id: "202",
      type: "cart_item"
    }
  ],
  store: {
    id: "52",
    type: "store"
  }
};

// Desrialization

const deserialized = deserialize(jsonapiResponse);
// deserialized is of type Resource or Resource[] if the exampe was an array
// new types can be created e.g. Product which extends from Resource to read the data
console.log(deserialized);
//{
//  "id": "1",
//  "type": "product",
//  "name": "iPhone 13 Pro Silver 128GB",
//  "sku": "iphone-13-pro-silver-128gb",
//  "variations": [
//    {
//      "id": "1",
//      "type": "variation"
//    },
//    {
//      "id": "2",
//      "type": "variation"
//    }
//  ]
//}

// Serialization

const serialized = serialize(resource);
// serialized is of type ResourceObject, which has these properties: id, type, attributes and relationships
console.log(serialized);
//{
//  "id": "98",
//  "type": "cart",
//  "attributes": {
//    "guest": true,
//    "email": null,
//    "currency": "USD"
//  },
//  "relationships": {
//    "cart_items": {
//      "data": [
//        {
//          "id": "202",
//          "type": "cart_item"
//        }
//      ]
//    },
//    "store": {
//      "data": {
//        "id": "52",
//        "type": "store"
//      }
//    }
//  }
//}
```

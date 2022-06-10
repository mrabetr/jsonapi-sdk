import * as JSONAPI from 'jsonapi-typescript';
// import { utilFunction } from "./utils";

interface Resource {
  type: string
  id: string
  name: string
  sku: string
}

export function deserialize(resourceObject: JSONAPI.Document): Resource {
  return {
    type: "product",
    id: "1",
    name: "iPhone 13 Pro Silver 128GB",
    sku: "iphone-13-pro-silver-128gb"
  }
}

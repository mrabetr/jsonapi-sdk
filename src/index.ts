import type { DocWithData } from 'jsonapi-typescript'
// import { utilFunction } from "./utils";

type ResourceTypeLock = 'product'

type Metadata = { [key: string]: any }

interface ResourceType {
  readonly type: ResourceTypeLock
}

interface ResourceId extends ResourceType {
  readonly id: string
}

interface Resource extends ResourceId {
  name?: string
  sku?: string
  metadata?: Metadata
}

// interface Resource {
//   type: string
//   id: string
//   name: string
//   sku: string
// }

export function deserialize(response: DocWithData): Resource {
  return {
    type: "product",
    id: "1",
    name: "iPhone 13 Pro Silver 128GB",
    sku: "iphone-13-pro-silver-128gb"
  }
}

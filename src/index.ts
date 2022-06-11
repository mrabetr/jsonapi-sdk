import type { DocWithData, Included, ResourceIdentifierObject, ResourceObject } from 'jsonapi-typescript'
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
  // name?: string
  // sku?: string
  metadata?: Metadata
}

// export function deserialize(response: DocWithData): Resource {
//   return {
//     type: "product",
//     id: "1",
//     name: "iPhone 13 Pro Silver 128GB",
//     sku: "iphone-13-pro-silver-128gb"
//   }
// }

// DESERIALIZATION

const deserialize = <R extends Resource>(response: DocWithData): R | R[] => {
  let deserializedResponse

  if (response.links) delete response.links

  const data = response.data
  const included = response.included

  if (!data) deserializedResponse = data
  else {
    if (Array.isArray(data)) deserializedResponse = data.map(res => deserializeResource<R>(res, included))
    else deserializedResponse = deserializeResource<R>(data, included)
  }

  return deserializedResponse
}

const findIncluded = (rel: ResourceIdentifierObject, included: Included = []): ResourceObject | undefined => {
  const inc = included.find(inc => {
    return (rel.id === inc.id) && (rel.type === inc.type)
  })
  return inc || rel
}

const deserializeResource = <T extends ResourceType>(res: any, included?: Included): T => {
  if (!res) return res

  const resource = {
    id: res.id,
    type: res.type,
    ...res.attributes,
  }

  if (res.relationships) Object.keys(res.relationships).forEach(key => {
    const rel = res.relationships[key].data
    if (rel) {
      if (Array.isArray(rel)) resource[key] = rel.map(r => deserializeResource<ResourceType>(findIncluded(r, included), included))
      else resource[key] = deserializeResource<ResourceType>(findIncluded(rel, included), included)
    } else if (rel === null) resource[key] = null
  })

  return resource
}

export { deserialize }

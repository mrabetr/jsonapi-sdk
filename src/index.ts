import type { Value as JSONValue } from 'json-typescript'
import type { DocWithData, Included, ResourceIdentifierObject, ResourceObject, AttributesObject, RelationshipsObject } from 'jsonapi-typescript'
// import { utilFunction } from "./utils";

type ResourceTypeLock =
  'product'
| 'cart'

const resourceList = ['product', 'cart', 'cart_item', 'store'];

type Metadata = { [key: string]: any }

interface ResourceType {
  readonly type: ResourceTypeLock
}

interface ResourceId extends ResourceType {
  readonly id: string
}

interface Resource extends ResourceId {
  metadata?: Metadata
}

interface ResourceCreate {
  metadata?: Metadata
}


interface ResourceUpdate {
  readonly id: string
  metadata?: Metadata
}

const isResourceId = (resource: any): resource is ResourceId => {
  return (resource && resource.type && resource.id) && resourceList.includes(resource.type)
}

const isResourceType = (resource: any): resource is ResourceType => {
  return resource && (typeof resource.type !== 'undefined') && resource.type && resourceList.includes(resource.type)
}

// interface Resource {
//   type: string
//   id: string
//   name: string
//   sku: string
// }

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

// SERIALIZATION

const serialize = (resource: (ResourceCreate & ResourceType) | (ResourceUpdate & ResourceId)): ResourceObject => {

  const attributes: AttributesObject = {}
  const relationships: RelationshipsObject = {}

  for (const field in resource) {
    if (['type', 'id'].includes(field)) continue
    const value = resource[field as keyof (ResourceCreate | ResourceUpdate)]
    if (value && isResourceType(value) && (value as any).id === null) {
      relationships[field] = { data: null }
    }
    else
    if (value && (isResourceId(value) || (Array.isArray(value) && isResourceId(value[0])))) {
      relationships[field] = { data: value as ResourceIdentifierObject }
    }
    else attributes[field] = value as JSONValue
  }

  const serialized: ResourceObject = {
    type: resource.type,
    attributes,
    relationships
  }

  if (isResourceId(resource)) serialized.id = resource.id

  return serialized

}

export { deserialize, serialize }
export type { Resource, ResourceTypeLock }

import type { Value } from 'json-typescript'
import type { DocWithData, Included, ResourceIdentifierObject, ResourceObject, AttributesObject, RelationshipsObject } from 'jsonapi-typescript'
import type { ModelType, ResourceType, ResourceId, Resource, ResourceCreate, ResourceUpdate } from "./resource";
import { isResourceType, isResourceId } from "./resource";

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
    else attributes[field] = value as Value
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
export type { DocWithData, ModelType, ResourceType, ResourceId, Resource, ResourceCreate, ResourceUpdate }
export * from "./models"

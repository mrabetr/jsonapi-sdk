const resourceList = ['product', 'cart', 'cart_item', 'store'];

// type ResourceTypeLock = ModelType
type ModelType =
  'product'
| 'cart'

type Metadata = { [key: string]: any }

interface ResourceType {
  readonly type: ModelType
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

export type { ModelType, ResourceType, ResourceId, Resource, ResourceCreate, ResourceUpdate }
export { isResourceType, isResourceId }

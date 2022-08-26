// Model Types
export type ModelType =
  'product'
| 'variation'
| 'variation_option'
| 'cart'
| 'cart_item'
| 'store'
| 'order'
| 'order_item'

// Resource List (used to identify relationships when serializing a resource)
const resourceList = [
  'product', 'variation', 'variation_option', 'cart', 'cart_item', 'store',
  'order', 'order_item'
];

type Metadata = { [key: string]: any }

export interface ResourceType {
  readonly type: ModelType
}

export interface ResourceId extends ResourceType {
  readonly id: string
}

export interface Resource extends ResourceId {
  metadata?: Metadata
}

export interface ResourceCreate {
  metadata?: Metadata
}

export interface ResourceUpdate {
  readonly id: string
  metadata?: Metadata
}

export const isResourceId = (resource: any): resource is ResourceId => {
  return (resource && resource.type && resource.id) && resourceList.includes(resource.type)
}

export const isResourceType = (resource: any): resource is ResourceType => {
  return resource && (typeof resource.type !== 'undefined') && resource.type && resourceList.includes(resource.type)
}

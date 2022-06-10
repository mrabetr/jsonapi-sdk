import * as JSONAPI from 'jsonapi-typescript';

interface Resource {
  type: string
  id: string
}

export function deserialize(jsonApiObject: JSONAPI.Document): Resource {
  return {
    type: "product",
    id: "1"
  }
}

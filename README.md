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

```typescript
import { deserialize, serialize } from 'jsonapi-sdk'

const deserialized = deserialize(jsonApiObject)

const serialized = serialize(jsObject)
```

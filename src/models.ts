import type { Resource } from "./resource";

type Amount = {
  cents: number
  float: number
  formatted: string
}

interface Variation extends Resource {
  name: string
  options?: VariationOption[]
}

type Variations = {
  data: Variation[]
}

interface VariationOption extends Resource {
  name: string
  variation_name?: string
  variation?: Variation
}

type VariationOptions = {
  data: VariationOption[]
}

interface PriceList extends Resource {
  name: string
  description?: string
  currency: string
  tax_incl: boolean
}

interface Price extends Resource {
  currency: string
  amount: Amount
  original_amount: Amount

  price_list?: PriceList
  product?: Product
}

type Prices = {
  data: Price[]
}

interface StockLocation extends Resource {
  name: string
  description?: string
}

interface StockItem extends Resource {
  quantity: number
  reserved: number
  available: number

  stock_location?: StockLocation
  product?: Product
}

interface Product extends Resource {
  name: string
  description?: string
  slug: string
  sku: string
  category?: string
  vendor?: string
  tags?: string[]
  image_urls?: string[]
  is_parent?: boolean
  active?: boolean
  livemode?: boolean

  parent?: Product
  children?: ProductChildren
  variations?: Variations
  variation_options?: VariationOptions
  prices: Prices
  stock_items?: StockItem[]
}

type ProductChildren = {
  data: Product[]
}

interface Collection extends Resource {
  name: string
  description: string
  slug: string
  image_url: string
  is_parent: boolean
  active: boolean
  livemode: boolean

  parent?: Collection
  children?: Collection[]
  products?: Product[]
}

type CartItems = {
  data: CartItem[]
}

interface Cart extends Resource {
  guest: boolean
  email: string
  currency: string
  tax_incl: boolean
  tax_rate: number
  subtotal_amount: Amount
  shipping_amount: Amount
  tax_amount: Amount
  total_amount: Amount

  cart_items: CartItems
}

interface CartItem extends Resource {
  name: string
  description: string
  sku: string
  product_id: string
  image_url: string
  quantity: string
  currency: string
  price: Amount
  original_price: Amount
  subtotal_amount: Amount
}

export type { Product }

import type { Resource } from "./resource";

type Amount = {
  cents: number
  float: number
  formatted: string
}

export interface Variation extends Resource {
  name: string

  options?: VariationOption[]
}

export interface VariationOption extends Resource {
  name: string
  variation_name?: string

  variation?: Variation
}

export interface PriceList extends Resource {
  name: string
  description?: string
  currency: string
  tax_incl: boolean

  prices?: Price[]
  products?: Product[]
}

export interface Price extends Resource {
  currency: string
  amount: Amount
  original_amount: Amount

  price_list?: PriceList
  product?: Product
}

export interface StockLocation extends Resource {
  name: string
  description?: string

  stock_items?: StockItem[]
  products?: Product[]
}

export interface StockItem extends Resource {
  quantity: number
  reserved: number
  available: number

  stock_location?: StockLocation
  product?: Product
}

export interface Product extends Resource {
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
  children?: Product[]
  variations?: Variation[]
  variation_options?: VariationOption[]
  prices: Price[]
  stock_items?: StockItem[]
}

export interface Collection extends Resource {
  name: string
  description?: string
  slug: string
  image_url: string
  is_parent: boolean
  active: boolean
  livemode: boolean

  parent?: Collection
  children?: Collection[]
  products?: Product[]
}

export interface Customer extends Resource {
  email: string
  first_name?: string
  last_name?: string

  addresses: Address[]
}

export interface Store extends Resource {
  name: string
  storefront_url?: string

  price_list?: PriceList
  stock_location?: StockLocation
}

export interface Cart extends Resource {
  guest: boolean
  email: string
  currency: string
  tax_incl: boolean
  tax_rate: number
  subtotal_amount: Amount
  shipping_amount: Amount
  tax_amount: Amount
  total_amount: Amount

  cart_items?: CartItem[]
}

export interface CartItem extends Resource {
  name: string
  description: string
  sku: string
  image_url: string
  quantity: string
  currency: string
  price: Amount
  original_price: Amount
  subtotal_amount: Amount

  cart: Cart
  item: Product
}

export interface Order extends Resource {
  number: string
  email: string
  currency: string
  tax_incl: boolean
  tax_rate: number
  status: string
  payment_status: string
  fulfillment_status: string
  subtotal_amount: Amount
  shipping_amount: Amount
  tax_amount: Amount
  total_amount: Amount

  shipping_address?: Address
  billing_address?: Address
  customer?: Customer
  store?: Store
  order_items?: OrderItem[]
}

export interface OrderItem extends Resource {
  name: string
  description: string
  sku: string
  image_url: string
  quantity: string
  currency: string
  price: Amount
  original_price: Amount
  subtotal_amount: Amount

  order: Order
  item: Product
}

type PaymentParams = {
  public_key?: string
  client_secret?: string
  checkout_session_id?: string
  checkout_session_url?: string
  refund_id?: string
}

export interface Transaction extends Resource {
  gateway: string
  transaction_type: string
  currency: string
  amount: Amount
  payment_id: string
  payment_params: PaymentParams
  payment_status: string
  paid: boolean

  order?: Order
}

type AddressOwner = 'Customer' | 'Merchant' | 'StockLocation'

export interface Address extends Resource {
  first_name: string
  last_name: string
  company?: string
  line1: string
  line2?: string
  city: string
  postal_code: string
  country?: string
  country_code: string
  name?: string
  region?: string
  region_code?: string
  phone?: string

  owner?: AddressOwner
}

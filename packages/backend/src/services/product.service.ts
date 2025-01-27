import { Product } from '@jwt-shopping-cart/shared'
import productsJsonData from '../data/products.json'

export const findAllProducts = (): Product[] => {
  return productsJsonData
}

export const findProductById = (id: string): Product | null => {
  return findAllProducts().find(product => product.id === id) ?? null
}
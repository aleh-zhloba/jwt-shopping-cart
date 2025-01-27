import jwt from 'jsonwebtoken'
import { CartData } from '../models/cartData.model'
import { BusinessLogicError } from '../errors/BusinessLogicError'
import { v4 as uuidv4 } from 'uuid'
import env from '../env'

if (!env.CART_SECRET) {
  throw new Error('Shopping cart JWT secret key isn\'t defined')
}
const CART_SECRET = env.CART_SECRET
const CART_VERSION = 1

export function encodeCartToken(data: CartData): string {
  return jwt.sign(data, CART_SECRET)
}

export function decodeCartToken(token?: string): CartData {
  let cartData: CartData

  if (token) {
    try {
      cartData = jwt.verify(token, CART_SECRET) as CartData
    } catch {
      throw new BusinessLogicError('cart_token_invalid', 'Invalid or expired cart token.')
    }

    if (cartData.ver !== CART_VERSION) {
      throw new BusinessLogicError('cart_token_invalid', 'Usupported cart token version.')
    }
  } else {
    cartData = {
      id: uuidv4(),
      ver: CART_VERSION,
      items: {}
    }
  }

  return cartData
}
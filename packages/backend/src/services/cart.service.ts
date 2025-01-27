import { CartSummary, CartSummaryItem, Cart, Discount, Fee } from '@jwt-shopping-cart/shared'
import { decodeCartToken , encodeCartToken } from './cartData.service'
import { CartData } from '../models/cartData.model'
import { findProductById } from './product.service'
import { BusinessLogicError } from '../errors/BusinessLogicError'
import { Decimal } from 'decimal.js'

const CURRENCY = 'EUR'
const PRECISION = 2

export const validate = (token: string): Cart => {
  const cartData = decodeCartToken(token)

  // re-encode cart data and return it with constructed cart summary
  return {
    token: encodeCartToken(cartData),
    summary: buildSummary(cartData)
  }
}

export const upsertItem = (productId: string, qty: number, token?: string): Cart => {
  // decode cart data from token
  const cartData: CartData = decodeCartToken(token)

  // perform mutation of cart data
  if (qty > 0) {
    const product = findProductById(productId)
    if (!product) {
      throw new BusinessLogicError('cart_product_not_found', 'Incorrect product has been passed.')
    }
    if (product.currency !== CURRENCY) {
      throw new Error('Unsupported product currency')
    }

    cartData.items[productId] = { qty: qty, unitPrice: product!.price, title: product!.title }
  } else {
    delete cartData.items[productId]
  }

  // check if cart is empty
  if (Object.keys(cartData.items).length === 0) {
    throw new BusinessLogicError('cart_is_empty', 'Cart is empty and must be deleted.')
  }

  // encode modified cart data into new token and return it with constructed cart summary
  return {
    token: encodeCartToken(cartData),
    summary: buildSummary(cartData)
  }
}

function buildSummary(cartData: CartData): CartSummary {
  const { items, subtotal } = Object.entries(cartData.items)
    .reduce((acc: { items: Record<string, CartSummaryItem>, subtotal: Decimal }, [productId, item]) => {
      const unitPriceDecimal = new Decimal(item.unitPrice).toDecimalPlaces(PRECISION)
      const totalPriceDecimal = unitPriceDecimal.times(item.qty)

      acc.items[productId] = {
        title: item.title,
        qty: item.qty,
        unitPrice: unitPriceDecimal.toString(),
        totalPrice: totalPriceDecimal.toString()
      }
      acc.subtotal = acc.subtotal.plus(totalPriceDecimal)

      return acc
    }, { items: {}, subtotal: new Decimal(0) })

  const fees: Fee[] = calculateFees(subtotal)
  const feeTotal = fees.reduce((sum, fee) => sum.plus(fee.amount), new Decimal(0))

  const discounts = calculateDiscounts(subtotal)
  const discountTotal = discounts.reduce((sum, fee) => sum.plus(fee.amount), new Decimal(0))

  const total = subtotal.plus(feeTotal).plus(discountTotal)

  return {
    items: items,
    subtotal: subtotal.toDecimalPlaces(PRECISION).toString(),
    fees: fees,
    discounts: discounts,
    total: total.toDecimalPlaces(PRECISION).toString(),
    currency: CURRENCY
  }
}

function calculateDiscounts(subtotal: Decimal): Discount[] {
  const discounts: Discount[] = []
  const awesomeAmountThreshold = new Decimal(50)
  const discountAmount = new Decimal(25)

  if (subtotal.greaterThanOrEqualTo(awesomeAmountThreshold)) {
    discounts.push({ title: 'Beer geek discount', amount: discountAmount.toDecimalPlaces(PRECISION).toString() })
  }

  return discounts
}

function calculateFees(subtotal: Decimal): Fee[] {
  const fees: Fee[] = []
  const enoughBeerThreshold = new Decimal(30)

  if (subtotal.lessThan(enoughBeerThreshold)) {
    fees.push({ title: 'Not enough beer fee', amount: enoughBeerThreshold.minus(subtotal).toDecimalPlaces(PRECISION).toString() })
  }

  return fees
}
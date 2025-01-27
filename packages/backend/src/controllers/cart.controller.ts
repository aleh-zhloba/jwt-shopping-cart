import { Router, Request, Response } from 'express'
import { validate, upsertItem } from '../services/cart.service'
import { BusinessLogicError } from '../errors/BusinessLogicError'
import { UpsertCartProduct, ValidateCart } from '@jwt-shopping-cart/shared'

const router = Router()

router.post(
  '/validate',
  (req: Request<unknown, unknown, ValidateCart>, res: Response) => {
    const token = req.body?.token

    if (!token) {
      throw new BusinessLogicError('cart_token_is_missing', 'Cart token is missing.')
    }

    const cart = validate(token)

    res.json(cart)
  })

router.put(
  '/product/:productId',
  (req: Request<{ productId: string }, unknown, UpsertCartProduct>, res: Response) => {
    const productId = req.params.productId
    const { qty, token } = req.body

    if (!Number.isInteger(qty)) {
      throw new BusinessLogicError('cart_item_quantity', 'Cart item quantity must be valid integer number.')
    }

    const cart = upsertItem(productId, qty, token)

    res.json(cart)
  })

export default router
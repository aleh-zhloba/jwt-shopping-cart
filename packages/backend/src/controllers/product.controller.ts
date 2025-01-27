import { Router } from 'express'
import { Request, Response } from 'express'
import { findAllProducts } from '../services/product.service'

const router = Router()

router.get('/',  (req: Request, res: Response) => {
  const products = findAllProducts()
  res.json(products)
})

export default router
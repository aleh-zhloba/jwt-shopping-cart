import env from './env'
import express from 'express'
import cors from 'cors'
import productsEndpoints from './controllers/product.controller'
import cartEndpoints from './controllers/cart.controller'
import { errorHandler } from './middleware/errorHandler'

const app = express()
const PORT = env.SERVER_PORT || 3001

app.use(express.json())
app.use(cors())

app.use('/products', productsEndpoints)
app.use('/cart', cartEndpoints)

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Shopping cart server is running on http://localhost:${PORT}`)
})
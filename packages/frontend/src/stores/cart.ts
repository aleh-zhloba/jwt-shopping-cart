import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from '../plugins/axios'
import { isAxiosError } from 'axios'
import { type Cart, type CartSummary, type UpsertCartProduct } from '@jwt-shopping-cart/shared'

const CART_TOKEN_KEY = 'cart_token'
export const useCartStore = defineStore('cartStore', () => {
  // State
  let token: string | null = null
  const summary = ref<CartSummary | null>(null)

  // Actions
  const addProduct = async (productId: string, qty: number) => {
    try {
      const requestBody: UpsertCartProduct = {
        qty: qty,
        ...(token !== null && { token })
      }
      const response = await axios.put<Cart>(`/cart/product/${productId}`, requestBody)
      updateCart(response.data.token, response.data.summary)
    } catch (error: unknown) {
      if (isAxiosError(error) && error.response) {
        // Handle error codes
        const errorCode: string = error.response.data.code

        switch (errorCode) {
        case 'cart_is_empty': {
          clearCart()
          break
        }
        default: {
          break
        }
        }
      }

      console.log(error)
    }
  }

  const validateCart = async () => {
    const cartToken = token ?? localStorage.getItem(CART_TOKEN_KEY)
    if (!cartToken) return

    try {
      const response = await axios.post<Cart>('/cart/validate', {
        token: cartToken,
      })
      updateCart(response.data.token, response.data.summary)
    } catch (error: unknown) {
      if (isAxiosError(error) && error.response) {
        clearCart()
      }

      console.log(error)
    }
  }

  const clearCart = () => {
    localStorage.removeItem(CART_TOKEN_KEY)
    token = null
    summary.value = null
  }
  const updateCart = (cartToken: string, cartSummary: CartSummary) => {
    localStorage.setItem(CART_TOKEN_KEY, cartToken)
    token = cartToken
    summary.value = cartSummary
  }

  return {
    summary,
    addProduct,
    validateCart,
    clearCart
  }
})


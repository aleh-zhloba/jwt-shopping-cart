import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from '../plugins/axios'
import { type Product } from '@jwt-shopping-cart/shared'

export const useProductStore = defineStore('productStore', () => {
  // State
  const products = ref<Product[]>([])

  // Actions
  const fetchProducts = async () => {
    try {
      const response = await axios.get('/products')
      products.value = response.data
    } catch (err: unknown) {
      console.log(err)
    }
  }

  return {
    products,
    fetchProducts
  }
})
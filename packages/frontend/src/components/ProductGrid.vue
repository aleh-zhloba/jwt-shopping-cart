<template>
  <div class="flex-1 bg-white shadow rounded-lg p-6 m-x-64">
    <h2 class="text-xl font-bold mb-6">Products</h2>

    <div class="grid grid-cols-2 xl:grid-cols-3 gap-4">

      <div v-for="product in products" :key="product.id" class="card bg-base-100 shadow">
        <figure class="max-h-80">
          <img :src="product.image" class="w-full h-full object-contain" :alt="product.title"/>
        </figure>
        <div class="card-body">
          <div class="badge badge-outline">{{ product.vendor }}</div>
          <h2 class="card-title">{{ product.title }}</h2>
          <p>{{ product.description }}</p>
          <div class="card-actions justify-between items-center text-lg mt-2">
            <div>{{ formatCurrency(product.price, product.currency) }}</div>

            <div v-if="qtyInCart(product.id)" class="flex justify-between items-center">
              <button class="btn btn-square" @click="decProductQty(product.id)">-</button>
              <div class="min-w-12 text-center">{{ qtyInCart(product.id) }}</div>
              <button class="btn btn-square" @click="incProductQty(product.id)">+</button>
            </div>
            <button v-else class="btn btn-primary min-w-36" @click="incProductQty(product.id)">Buy Now</button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang=ts>
import { onMounted, computed } from 'vue'
import { useProductStore } from '@/stores/products'
import { useCartStore } from '@/stores/cart'
import { formatCurrency } from '@/utils/currency'

// Access the stores
const productStore = useProductStore();
const products = computed(() => productStore.products);

const cartStore = useCartStore();
const cart = computed(() => cartStore.summary);

function qtyInCart(productId: string): number | undefined {
    return cart.value?.items[productId]?.qty
}

// User events
async function incProductQty(productId: string) {
  const qty = (qtyInCart(productId) ?? 0) + 1
  await cartStore.addProduct(productId, qty)
}
async function decProductQty(productId: string) {
  const qty = (qtyInCart(productId) ?? 0) - 1
  await cartStore.addProduct(productId, qty)
}

// Load products on component mount
onMounted(async () => {
  await productStore.fetchProducts();
});
</script>

<style scoped>
</style>
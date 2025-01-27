<template>
    <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-xl font-bold mb-6">Shopping Cart</h2>

        <div v-if="cart" class="overflow-x-auto">
          <!-- Items -->
          <table class="table">
            <thead>
              <tr>
                <th>Product</th>
                <th class="w-20 text-right">Quantity</th>
                <th class="w-20 text-right">Total</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(item, productId) in cart.items" :key="productId">
                <td>{{ item.title }}</td>
                <td class="text-right">{{ item.qty }}</td>
                <td class="text-right">{{ item.totalPrice }}</td>
              </tr>
            </tbody>
          </table>

          <!-- Summary -->
          <div class="flex flex-col mt-2">
            <div class="flex flex-col text-sm px-2">
              <div class="flex justify-between mt-2">
                <div>Subtotal</div>
                <div>{{ cart.subtotal }}</div>
              </div>

              <div v-for="fee in cart.fees" class="flex justify-between mt-2">
                <div>{{ fee.title }}</div>
                <div class="text-red-600">{{ fee.amount }}</div>
              </div>

              <div v-for="discount in cart.discounts" class="flex justify-between mt-2">
                <div>{{ discount.title }}</div>
                <div class="text-green-600">-{{ discount.amount }}</div>
              </div>

              <div class="flex justify-between mt-2 font-semibold">
                <div>Total</div>
                <div>{{ formatCurrency(cart.total, cart.currency) }}</div>
              </div>
            </div>

            <button class="btn btn-primary mt-4" @click="checkout">Checkout</button>
          </div>
        </div>
        <p v-else class="text-gray-600">Add cart content here...</p>

        <!-- Checkout modal-->
        <dialog v-if="checkoutModalOpened" class="modal modal-open">
          <div class="modal-box">
            <h3 class="text-lg font-bold">Congrats!</h3>
            <p class="py-4">It's time for backend to validate your cart and process the order. Cheers! 🍻</p>
          </div>
          <form method="dialog" class="modal-backdrop" @click="closeCheckoutModal">
            <button>close</button>
          </form>
        </dialog>
    </div>
</template>

<script setup lang=ts>
import { onMounted, computed, ref } from 'vue'
import { useCartStore } from '@/stores/cart'
import { formatCurrency } from '@/utils/currency'

// Access the store
const cartStore = useCartStore();
const cart = computed(() => cartStore.summary)
const checkoutModalOpened = ref(false)

async function checkout() {
  cartStore.clearCart()
  openCheckoutModal()
}
function openCheckoutModal() {
  checkoutModalOpened.value = true
}

function closeCheckoutModal() {
  checkoutModalOpened.value = false
}

// Load cart on component mount
onMounted(async () => {
  await cartStore.validateCart();
});
</script>
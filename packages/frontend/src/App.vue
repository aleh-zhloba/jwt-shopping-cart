<template>
    <div class="min-h-screen bg-gray-100">
        <div class="mx-auto p-6">
            <div class="flex gap-6 max-w-[70%]">
                <ProductGrid/>
            </div>

            <div class="w-1/4 min-w-80 fixed top-6 right-6 z-50">
                <ShoppingCart/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import ProductGrid from "@/components/ProductGrid.vue";
import ShoppingCart from "@/components/ShoppingCart.vue";
</script>
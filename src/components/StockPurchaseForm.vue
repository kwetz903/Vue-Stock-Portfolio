<template>
  <div class="stock-purchase-form">
    <span class="company-name">{{ stockInfo && stockInfo.name }}</span>
    <span class="stock-info">(Price: {{ formattedPrice }})</span>

    <input type="number" hint="Quantity" v-model="quantity" />
    <button @click="buy">Buy</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      quantity: undefined
    };
  },
  props: {
    stockInfo: Object,
    stockId: String
  },
  computed: {
    formattedPrice() {
      return this.stockInfo && this.stockInfo.price.toFixed(3);
    }
  },
  methods: {
    buy() {
      // TODO add validation that you can't buy more than you can afford
      this.$store.dispatch("buyStock", {
        companyStockId: this.stockId,
        quantity: this.quantity
      });
      this.quantity = undefined;
    }
  }
};
</script>

<style></style>

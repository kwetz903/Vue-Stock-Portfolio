<template>
  <div class="stock-sell-form">
    <span class="company-name">{{ stock && stock.name }}</span>
    <span class="stock-info">(Price: {{ formattedPrice }} | Quantity: {{ stockInfo.quantity }})</span>

    <input type="number" hint="Quantity" v-model="quantity" />
    <button @click="sell">Sell</button>
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
    stock() {
      return this.$store.state.stocks[this.stockId];
    },
    formattedPrice() {
      return this.stock && this.stock.price.toFixed(3);
    }
  },
  methods: {
    sell() {
      // TODO add validation that you can't sell more than you own
      this.$store.dispatch("sellStock", {
        companyStockId: this.stockId,
        quantity: this.quantity
      });
      this.quantity = undefined;
    }
  }
};
</script>

<style></style>

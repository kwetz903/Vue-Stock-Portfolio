<template>
  <div>
    <StockPurchaseForm
      v-for="(stockInfo, stockId) in stocks"
      :key="stockId"
      :stockId="stockId"
      :stockInfo="stockInfo"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import StockPurchaseForm from "@/components/StockPurchaseForm.vue";
export default {
  components: { StockPurchaseForm },
  computed: {
    ...mapState(["stocks"])
  }
};
</script>

<style></style>

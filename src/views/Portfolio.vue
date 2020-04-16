<template>
  <div>
    <StockSellForm
      v-for="(stockInfo, stockId) in stocks"
      :key="stockId"
      :stockId="stockId"
      :stockInfo="stockInfo"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import StockSellForm from "@/components/StockSellForm.vue";
export default {
  components: { StockSellForm },
  computed: {
    ...mapState({ stocks: state => state.portfolio.stocks })
  }
};
</script>

<style></style>

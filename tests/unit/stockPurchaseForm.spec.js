import Vuex from "vuex";
import store from "@/store/index.js";
import { mount, createLocalVue } from "@vue/test-utils";
import { nextTick } from "vue";
import StockPurchaseForm from "@/components/StockPurchaseForm.vue";

const localVue = createLocalVue();
localVue.use(Vuex);
let wrapper;
let stockId = "companyStockId";
let stockInfo = {
  name: "Cool Co.",
  price: 50
};
let stocks = {};
stocks[stockId] = stockInfo;
let originalFunds = 1000;

describe("StockPurchaseForm.vue", () => {
  beforeEach(() => {
    wrapper = mount(StockPurchaseForm, {
      localVue,
      store,
      propsData: {
        stockId: stockId,
        stockInfo: stockInfo
      }
    });
    wrapper.vm.$store.commit("setStocks", stocks);
    wrapper.vm.$store.commit("setPortfolio", {
      funds: originalFunds,
      stocks: {}
    });
  });
  test("buying stock reduces funds", async () => {
    expect(wrapper.vm.$store.state.portfolio.funds).toBe(originalFunds);
    const input = wrapper.find("input");
    const buyBtn = wrapper.find("button");
    const qty = 5;
    input.setValue(qty);
    buyBtn.trigger("click");
    await nextTick();

    expect(wrapper.vm.$store.state.portfolio.funds).toBe(
      originalFunds - stockInfo.price * qty
    );
  });
  test("buying stock for first time adds company stock to my portfolio", async () => {
    const input = wrapper.find("input");
    const buyBtn = wrapper.find("button");
    const qty = 5;
    input.setValue(qty);
    buyBtn.trigger("click");
    await nextTick();
    let expectedStocks = {};
    expectedStocks[stockId] = { quantity: qty };
    expect(wrapper.vm.$store.state.portfolio.stocks).toEqual(expectedStocks);
  });
  test("buying more stock adds to quantity", async () => {
    let originalStocks = {};
    let originalQty = 3;
    originalStocks[stockId] = { quantity: originalQty };
    wrapper.vm.$store.commit("setPortfolio", {
      funds: originalFunds,
      stocks: originalStocks
    });
    const qty = 5;
    const input = wrapper.find("input");
    const buyBtn = wrapper.find("button");
    input.setValue(qty);
    buyBtn.trigger("click");
    await nextTick();
    expect(wrapper.vm.$store.state.portfolio.stocks[stockId].quantity).toEqual(
      qty + originalQty
    );
  });
});

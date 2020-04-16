import Vuex from "vuex";
import store from "@/store/index.js";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import { nextTick } from "vue";
import Stocks from "@/views/Stocks.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

const StockPurchaseFormStub = {
  template: '<div class="stock-purchase-form"/>',
  props: ["stockInfo", "stockId"]
};
let wrapper;

describe("Stocks.vue", () => {
  beforeEach(() => {
    wrapper = shallowMount(Stocks, {
      localVue,
      store,
      stubs: {
        StockPurchaseForm: StockPurchaseFormStub
      }
    });
  });
  test("Has a stock purchase form for each company's stock", async () => {
    const stocks1 = {
      company1: {
        name: "Google",
        price: 100
      }
    };
    const stocks2 = {
      ...stocks1,
      company2: {
        name: "Apple",
        price: 110
      }
    };

    wrapper.vm.$store.commit("setStocks", stocks2);
    await nextTick();
    expect(wrapper.findAll(".stock-purchase-form").length).toBe(
      Object.keys(stocks2).length
    );

    wrapper.vm.$store.commit("setStocks", stocks1);
    await nextTick();
    expect(wrapper.findAll(".stock-purchase-form").length).toBe(
      Object.keys(stocks1).length
    );
  });
});

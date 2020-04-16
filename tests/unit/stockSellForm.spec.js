import Vuex from "vuex";
import store from "@/store/index.js";
import { mount, createLocalVue } from "@vue/test-utils";
import { nextTick } from "vue";
import stockSellForm from "@/components/stockSellForm.vue";
import { cloneDeep } from "lodash";

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
let originalQty = 2;
let myStockInfo = {};
myStockInfo[stockId] = { quantity: originalQty };
let portfolio = {
  funds: originalFunds,
  stocks: myStockInfo
};

describe("stockSellForm.vue", () => {
  beforeEach(() => {
    wrapper = mount(stockSellForm, {
      localVue,
      store,
      propsData: {
        stockId: stockId,
        stockInfo: myStockInfo
      }
    });
    wrapper.vm.$store.commit("setStocks", cloneDeep(stocks));
    wrapper.vm.$store.commit("setPortfolio", cloneDeep(portfolio));
  });
  test("selling stock increases funds", async () => {
    await nextTick();
    expect(wrapper.vm.$store.state.portfolio.funds).toBe(originalFunds);
    const input = wrapper.find("input");
    const sellBtn = wrapper.find("button");
    const qty = 2;
    input.setValue(qty);
    sellBtn.trigger("click");
    await nextTick();
    expect(wrapper.vm.$store.state.portfolio.funds).toBe(
      originalFunds + stockInfo.price * qty
    );
  });
  test("selling stock reduces qty", async () => {
    await nextTick();
    const input = wrapper.find("input");
    const sellBtn = wrapper.find("button");
    let qty = 1;
    input.setValue(qty);
    sellBtn.trigger("click");
    await nextTick();
    expect(wrapper.vm.$store.state.portfolio.stocks[stockId].quantity).toEqual(
      originalQty - qty
    );
  });
  test("selling all stocks for a company removes the company from portfolio", async () => {
    await nextTick();
    const input = wrapper.find("input");
    const sellBtn = wrapper.find("button");
    input.setValue(originalQty);
    sellBtn.trigger("click");
    await nextTick();
    expect(
      stockId in Object.keys(wrapper.vm.$store.state.portfolio.stocks)
    ).toBeFalsy();
  });
});

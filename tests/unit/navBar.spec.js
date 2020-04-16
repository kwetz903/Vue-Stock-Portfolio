import Vuex from "vuex";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import { cloneDeep } from "lodash";
import NavBar from "@/components/NavBar.vue";
import store from "@/store/index.js";

// prep to be able to mount the NavBar component with vuex
const localVue = createLocalVue();
localVue.use(Vuex);
let wrapper;
let originalStocks = {
  aCompanyId: {
    price: 42
  },
  anotherCompanyId: {
    price: 3
  }
};

// mocking utils' randomNumber so we can make assertions later
jest.mock("@/utils", () => ({
  randomNumber: () => 3
}));

describe("NavBar.vue", () => {
  beforeEach(() => {
    wrapper = shallowMount(NavBar, {
      localVue,
      store,
      stubs: ["router-link"]
    });
    wrapper.vm.$store.commit("setStocks", cloneDeep(originalStocks));
  });
  test("end day updates prices in state and updates them in api", async () => {
    // click 'End Day'
    var endDay = wrapper.find("#end-day");
    endDay.trigger("click");

    // after the day ends, should have called the randomNumber (mocked out to return 3 every time)
    // to determine how much we should change the price
    // and then changed the prices in the state
    let newStocks = wrapper.vm.$store.state.stocks;
    expect(
      Object.keys(newStocks).every(
        stockId => newStocks[stockId].price == originalStocks[stockId].price + 3
      )
    ).toBe(true);
    // and make an api call to be able to save the changes in price
    // TODO
  });
  test("save data", () => {}); // TODO
  test("load data", () => {}); // TODO
});

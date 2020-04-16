import Vuex from "vuex";
import store from "@/store/index.js";
import { mount, createLocalVue } from "@vue/test-utils";
import { nextTick } from "vue";
import Home from "@/views/Home.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Home.vue", () => {
  test("displays formatted funds", async () => {
    const wrapper = mount(Home, {
      localVue,
      store
    });
    var fundsDisplay = wrapper.find("h3");
    expect(fundsDisplay.text()).toEqual("Your Funds: $18000.000");
    wrapper.vm.$store.commit("setPortfolio", {});
    await nextTick();
    expect(fundsDisplay.text()).toEqual("Your Funds: unknown");
  });
});

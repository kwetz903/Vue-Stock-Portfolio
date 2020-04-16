import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { randomNumber } from "@/utils";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // stocks: {
    //   company1: {
    //     name: "Google",
    //     price: 100
    //   }
    // },
    // portfolio: {
    //   funds: 18000,
    //   stocks: {
    //     company1: {
    //       quantity: 5
    //     }
    //   }
    // }
  },
  getters: {
    formattedFunds(state) {
      if (state.portfolio && state.portfolio.funds) {
        return "$" + state.portfolio.funds.toFixed(3);
      } else {
        return "unknown";
      }
    }
  },
  mutations: {
    setStocks(state, stocks) {
      Vue.set(state, "stocks", stocks);
    },
    setPortfolio(state, portfolio) {
      Vue.set(state, "portfolio", portfolio);
    },
    changePrices(state, changedPrices) {
      changedPrices.forEach(({ companyStockId, price }) => {
        state.stocks[companyStockId].price = price;
      });
    },
    addStockToPortfolio(state, payload) {
      let companyStockId, quantity;
      ({ companyStockId, quantity } = payload);
      if (!Number.isInteger(quantity)) {
        quantity = parseInt(quantity);
      }
      let myStock = state.portfolio.stocks[companyStockId];
      if (myStock) {
        myStock.quantity = myStock.quantity + quantity;
      } else {
        state.portfolio.stocks[companyStockId] = {
          quantity: quantity
        };
      }
    },
    removeStockFromPortfolio(state, payload) {
      let companyStockId, quantity;
      ({ companyStockId, quantity } = payload);
      if (!Number.isInteger(quantity)) {
        quantity = parseInt(quantity);
      }
      let myStock = state.portfolio.stocks[companyStockId];
      myStock.quantity = myStock.quantity - quantity;
      if (myStock.quantity == 0) {
        delete state.portfolio.stocks[companyStockId];
      }
    },
    changeFunds(state, amount) {
      state.portfolio.funds = state.portfolio.funds + amount;
    }
  },
  actions: {
    endDay(context) {
      function getMinPriceChange(price) {
        // in faked changes to stock prices, worse they can do is decrease by 50% in 1 day
        return -(price / 2);
      }
      function getMaxPriceChange(price) {
        // in faked changes to stock prices, worse they can do is increase by 50% in 1 day
        return price / 2;
      }
      function getNewPrice(stock) {
        let newPrice =
          stock.price +
          parseFloat(
            randomNumber(
              getMinPriceChange(stock.price),
              getMaxPriceChange(stock.price)
            ).toFixed(3)
          );
        return newPrice;
      }
      var stocks = context.state.stocks;
      var priceChanges = Object.keys(stocks).map(id => {
        return {
          companyStockId: id,
          price: getNewPrice(stocks[id])
        };
      });
      context.commit("changePrices", priceChanges);
      // todo api call
    },
    buyStock(context, payload) {
      let companyStockId, quantity;
      ({ companyStockId, quantity } = payload);
      let stock = context.state.stocks[companyStockId];
      let cost = stock.price * quantity;

      context.commit("addStockToPortfolio", payload);
      context.commit("changeFunds", -cost);
      // todo api call
    },
    sellStock(context, payload) {
      let companyStockId, quantity;
      ({ companyStockId, quantity } = payload);
      let stock = context.state.stocks[companyStockId];
      let proffit = stock.price * quantity;

      context.commit("changeFunds", proffit);
      context.commit("removeStockFromPortfolio", payload);
      // todo api call
    },
    load(context) {
      // get stocks
      axios
        .get("https://course-project-f1b2b.firebaseio.com/" + "stocks.json")
        .then(
          resp => {
            console.log("got stocks");
            console.log(resp);
            context.commit("setStocks", resp.data);
          },
          error => {
            console.log("Error loading stocks: " + error);
          }
        );

      // get portfolio
      axios
        .get("https://course-project-f1b2b.firebaseio.com/" + "portfolio.json")
        .then(
          resp => {
            console.log("got portfolio");
            console.log(resp);
            context.commit("setPortfolio", resp.data);
          },
          error => {
            console.log("Error loading portfolio: " + error);
          }
        );
    },
    save(context) {
      // update stocks
      axios
        .put(
          "https://course-project-f1b2b.firebaseio.com/" + "stocks.json",
          context.state.stocks
        )
        .then(
          resp => {
            console.log("saved stocks: ", resp);
          },
          error => {
            console.log("Error saving stocks: " + error);
          }
        );

      // get portfolio
      axios
        .put(
          "https://course-project-f1b2b.firebaseio.com/" + "portfolio.json",
          context.state.portfolio
        )
        .then(
          resp => {
            console.log("saved stoportfoliocks: ", resp);
          },
          error => {
            console.log("Error saving portfolio: " + error);
          }
        );
    }
  },
  modules: {}
});

<template>
  <div id="nav">
    <router-link :to="{ name: 'Home' }">Stock Trader</router-link>|
    <router-link :to="{ name: 'Portfolio' }">Portfolio</router-link>|
    <router-link :to="{ name: 'Stocks' }">Stock</router-link>
    <span id="end-day" @click="endDay">End Day</span>
    <div>
      <b-dropdown id="dropdown-1" text="Save & Load" class="m-md-2">
        <b-dropdown-item @click="save">Save</b-dropdown-item>
        <b-dropdown-item @click="load">Load</b-dropdown-item>
      </b-dropdown>
    </div>
    <span>Funds: {{ formattedFunds }}</span>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

export default {
  computed: {
    ...mapGetters(["formattedFunds"])
  },
  methods: {
    ...mapActions(["endDay", "save", "load"])
  }
};
</script>

<style></style>

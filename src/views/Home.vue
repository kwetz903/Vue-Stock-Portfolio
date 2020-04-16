<template>
  <div class="home">
    <h1>Trade or View your Portfolio</h1>
    <p>You may Save & Load your Data</p>
    <p>Click on 'End Day' to begin a new Day!</p>
    <h3>Your Funds: {{ formattedFunds }}</h3>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from "vuex";
export default {
  name: "Home",
  computed: {
    ...mapGetters(["formattedFunds"])
  }
};
</script>

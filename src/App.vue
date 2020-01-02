<template>
  <div id="app">
    <object-view
      :data="data"
      :deep="5"
      :show-double-quotes="true"
      :show-length="true"
      :show-line="true"
      :collapsed-on-click-brackets="true"
    >
    </object-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ObjectView from "@/components/object-view.vue";

@Component({
  components: {
    ObjectView
  }
})
export default class App extends Vue {
  data: any = {
    status: 200,
    error: "",
    data: [
      {
        news_id: 51184,
        title: "iPhone X Review: Innovative future with real black technology",
        source: "Netease phone"
      },
      {
        news_id: 51183,
        title:
          "Traffic paradise: How to design streets for people and unmanned vehicles in the future?",
        source: "Netease smart"
      },
      {
        news_id: 51182,
        title:
          "Teslamask's American Business Relations: The government does not pay billions to build factories",
        source: "AI Finance",
        members: ["Daniel", "Mike", "John"]
      }
    ]
  };
}
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

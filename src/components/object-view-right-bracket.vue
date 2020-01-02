<template>
  <div
    class="object
    -view-right-bracket"
    v-if="dataVisible"
  >
    <span
      class="right
      -bracket"
      @click.stop="handleToggleBracket"
    >
      {{ rightBracket }}
    </span>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Prop, Mixins } from "vue-property-decorator";

import MixUtil from "./mix-util";

@Component
export default class ObjectViewRightBracket extends Mixins(MixUtil) {
  @Prop({ required: true, type: Boolean }) visible!: boolean;
  @Prop({ type: Boolean, default: true }) collapsedOnClickBrackets!: boolean;
  @Prop({ type: Boolean, default: false }) showComma!: boolean;

  get dataVisible(): boolean {
    return this.visible;
  }

  set dataVisible(val: boolean) {
    const { collapsedOnClickBrackets } = this;
    if (collapsedOnClickBrackets) {
      this.$emit("update:visible", val);
    }
  }

  get rightBracket(): string {
    const { data, showComma } = this;
    const bracket: string = Array.isArray(data) ? " ] " : " } ";
    return showComma ? `${bracket},` : bracket;
  }

  handleToggleBracket() {
    const { dataVisible } = this;
    this.dataVisible = !dataVisible;
  }
}
</script>
<style lang="scss" scoped>
.object-view-right-bracket {
}
</style>

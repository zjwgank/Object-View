<template>
  <div class="object-view-simple-text">
    <slot></slot>
    <span :class="`simple-text simple-text_${dataType}`">
      {{ simpleText }}
    </span>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Prop, Mixins } from "vue-property-decorator";

import MixUtil from "./mix-util";

@Component
export default class ObjectViewSimpleText extends Mixins(MixUtil) {
  @Prop() parentData!: any;
  @Prop({ type: Boolean, default: true }) showDoubleQuotes!: boolean;
  @Prop({ type: Boolean }) showComma!: boolean;

  get dataType() {
    const { data, getDataType } = this;
    return getDataType(data);
  }

  get simpleText() {
    const { data, dataType, showComma } = this;
    let text = data + "";
    if (dataType === "string") text = `"${text}"`;
    if (showComma) text += ",";
    return text;
  }
}
</script>
<style lang="scss" scoped>
.object-view-simple-text {
  .simple-text_null {
    color: #ff4949;
  }
  .simple-text_number {
    color: #1d8ce0;
  }
  .simple-text_boolean {
    color: #1d8ce0;
  }
  .simple-text_string {
    color: #13ce66;
  }
}
</style>

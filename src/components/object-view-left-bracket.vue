<template>
  <div class="object-view-left-bracket">
    <slot></slot>
    <span
      class="left-expand-bracket"
      v-if="dataVisible"
      @click.stop="handleToggleBracket"
    >
      {{ leftExpandBracket }}
    </span>
    <span v-else>
      <span class="left-collapse-bracket" @click.stop="handleToggleBracket">
        {{ leftCollapseBracket }}
      </span>
      <span class="left-bracket-comment" v-if="showLength">
        {{ leftBracketComment }}
      </span>
    </span>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Prop, Mixins } from "vue-property-decorator";

import MixUtil from "./mix-util";

@Component
export default class ObjectViewLeftBracket extends Mixins(MixUtil) {
  @Prop({ required: true, type: Boolean }) visible!: boolean;
  @Prop({ type: Boolean, default: true }) showLength!: boolean;
  @Prop({ type: Boolean, default: true }) CollapsedOnClickBrackets!: boolean;
  @Prop({ type: Boolean }) showComma!: boolean;

  get dataVisible(): boolean {
    return this.visible;
  }

  set dataVisible(val: boolean) {
    const { CollapsedOnClickBrackets } = this;
    if (CollapsedOnClickBrackets) {
      this.$emit("update:visible", val);
    }
  }

  get leftExpandBracket() {
    const { data, IsObject } = this;
    if (Array.isArray(data)) {
      return " [ ";
    } else if (IsObject(data)) {
      return " { ";
    }
  }

  get leftCollapseBracket() {
    const { data, IsObject } = this;
    if (Array.isArray(data)) {
      return " [ ... ] ";
    } else if (IsObject(data)) {
      return " { ... } ";
    }
  }

  get leftBracketComment() {
    const { data, IsObject } = this;
    let str: string = "";
    if (Array.isArray(data)) {
      str = `${data.length} items`;
    } else if (IsObject(data)) {
      str = `${Object.keys(data).length} keys`;
    }
    return ` // ${str}`;
  }

  handleToggleBracket() {
    const { dataVisible } = this;
    this.dataVisible = !dataVisible;
  }
}
</script>
<style lang="scss" scoped>
.object-view-left-bracket {
  .left-expand-bracket,
  .left-collapse-bracket {
    cursor: pointer;
    &:hover {
      color: #1890ff;
    }
  }
  .left-bracket-comment {
    color: #bfcbd9;
  }
}
</style>

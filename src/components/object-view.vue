<template>
  <div
    :class="{ 'object-view': true, 'is-mouseover': isMouseOver }"
    @mouseover.stop="handleToggleMouse"
    @mouseout.stop="handleToggleMouse"
  >
    <template v-if="IsViewObject">
      <object-view-left-bracket
        :visible.sync="visible"
        :data="data"
        :collapsed-on-click-bracket="collapsedOnClickBrackets"
        :show-comma="notLastKey"
      >
        <span
          v-if="currentDeep > 1 && !Array.isArray(parentData)"
          class="simple-text-key"
        >
          {{ handleFormatKey(currentKey) }}:
        </span>
      </object-view-left-bracket>
      <template v-for="(item, key) in data">
        <div
          v-if="visible"
          :class="{ 'object-view-tree': true, 'has-line': showLine }"
          :key="key"
        >
          <object-view
            :current-key="key"
            :data="item"
            :parent-data="data"
            :deep="deep"
            :current-deep="currentDeep + 1"
            :show-length="showLength"
            :show-double-quotes="showDoubleQuotes"
            :show-line="showLine"
            :collapsed-on-click-brackets="collapsedOnClickBrackets"
          ></object-view>
        </div>
      </template>
      <object-view-right-bracket
        :visible.sync="visible"
        :data="data"
        :collapsed-on-click-brackets="collapsedOnClickBrackets"
        :show-comma="notLastKey"
      ></object-view-right-bracket>
    </template>
    <template v-else>
      <object-view-simple-text
        :show-double-quotes="showDoubleQuotes"
        :show-comma="notLastKey"
        :parent-data="parentData"
        :data="data"
        :current-key="currentKey"
      >
        <span
          v-if="parentData && currentKey && !Array.isArray(parentData)"
          class="simple-text-key"
        >
          {{ handleFormatKey(currentKey) }}:
        </span>
      </object-view-simple-text>
    </template>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Prop, Mixins } from "vue-property-decorator";

import ObjectViewLeftBracket from "./object-view-left-bracket.vue";
import ObjectViewRightBracket from "./object-view-right-bracket.vue";
import ObjectViewSimpleText from "./object-view-simple-text.vue";
import MixUtil from "./mix-util";

@Component({
  components: {
    ObjectViewLeftBracket,
    ObjectViewRightBracket,
    ObjectViewSimpleText
  }
})
export default class ObjectView extends Mixins(MixUtil) {
  @Prop({ required: true }) data!: any;
  @Prop() parentData!: any;
  @Prop({ required: true, type: Number }) deep!: number;
  @Prop() currentKey!: any;
  @Prop({ type: Number, default: 1 }) currentDeep!: number;
  @Prop({ type: Boolean, default: true }) showLength!: boolean;
  @Prop({ type: Boolean, default: true }) showLine!: boolean;
  @Prop({ type: Boolean, default: true }) showDoubleQuotes!: boolean;
  @Prop({ type: Boolean, default: true }) collapsedOnClickBrackets!: boolean;

  visible: boolean = this.currentDeep < this.deep;
  isMouseOver: boolean = false;

  get lastKey() {
    const { parentData, IsObject } = this;
    if (Array.isArray(parentData)) {
      return parentData.length - 1;
    } else if (IsObject(parentData)) {
      const keys: Array<string> = Object.keys(parentData);
      return keys[keys.length - 1];
    }
  }

  get notLastKey() {
    const { currentKey, lastKey } = this;
    return currentKey !== lastKey;
  }

  handleToggleMouse() {
    const { isMouseOver } = this;
    this.isMouseOver = !isMouseOver;
  }

  handleFormatKey(key: string) {
    const { showDoubleQuotes } = this;
    return showDoubleQuotes ? `"${key}"` : key;
  }
}
</script>
<style lang="scss" scoped>
.object-view {
  font-family: "Monaco", "Menlo", "Consolas", "Bitstream Vera Sans Mono",
    monospace;
  font-size: 14px;
  .is-mouseover {
    background-color: #e6f7ff;
  }
  &-tree {
    padding-left: 1em;
    .has-line {
      border-left: 1px dotted #bfcbd9;
    }
  }
}
</style>

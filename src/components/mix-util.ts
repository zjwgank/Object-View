import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class MixUtil extends Vue {
  @Prop({ required: true }) data!: any;

  getDataType(obj: any): string {
    return Object.prototype.toString
      .call(obj)
      .slice(8, -1)
      .toLowerCase();
  }

  IsObject(obj: any): boolean {
    const { getDataType } = this;
    return getDataType(obj) === "object";
  }

  get IsViewObject(): boolean {
    const { data, IsObject } = this;
    return Array.isArray(data) || IsObject(data);
  }
}

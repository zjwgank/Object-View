import { shallowMount } from "@vue/test-utils";
import ObjectView from "@/components/object-view.vue";

describe("HelloWorld.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = { errNo: 200, status: "success", data: {} };
    const wrapper = shallowMount(ObjectView, {
      propsData: { msg }
    });
    expect(wrapper.text()).toMatch(msg);
  });
});

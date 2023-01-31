const switchComponent = {
  template: `
        <div>
        <span class="weui-switch" :class="{'weui-switch-on' : isChecked}" :value="value" @click="toggle" style="position:relative">
            <div v-if="isChecked && direction.length > 0" style="width:100%;height:100%;position:absolute;padding:0 5px;line-height:20px;color:#FFF;user-select:none">
                {{direction[0]}}
            </div>
            <div v-if="!isChecked && direction.length > 0" style="width:100%;height:100%;position:absolute;padding:0 5px;right:2px;line-height:22px;color:#7A7A7A;text-align:right;user-select:none">
                {{direction[1]}}
            </div>
        </span>
    </div>
    `,
  name: "switchComponent",
  props: {
    value: {
      type: Boolean,
      default: true,
    },
    text: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      isChecked: this.value,
    };
  },
  computed: {
    direction() {
      if (this.text) {
        return this.text.split("|");
      } else {
        return [];
      }
    },
  },
  watch: {
    value(val) {
      this.isChecked = val;
    },
    isChecked(val) {
      this.$emit("change", val);
    },
  },
  methods: {
    toggle() {
      this.isChecked = !this.isChecked;
    },
  },
};

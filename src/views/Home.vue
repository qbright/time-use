<template>
  <div class="home">
    <div class="block">
      <div
        v-for="(it,index) in daySet"
        :key="index"
        class="block-item"
        v-hammer:tap="onTap(index)"
        :class="{'active':dofy>index}"
      ></div>
    </div>
    <div class="tips size-21">
      <div class="text">
        <span class>{{this.year}}年已经过去</span>
      </div>
      <div class="count">
        <span>
          <ICountUp
            ref="countup"
            :startVal="startVal"
            :endVal="endVal"
            :decimals="9"
            :options="opt"
          />
        </span>
      </div>
      <div class="count1" style="font-size:16px;">
        <span>今天是今年的第{{dofy}}天</span>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ICountUp from "vue-countup-v2";
import moment from "moment";

const y = new Date();
y.setMilliseconds(0);
y.setSeconds(0);
y.setMinutes(0);
y.setHours(0);
y.setMonth(0);
y.setDate(1);

console.log(y);
export default {
  name: "home",
  components: {
    ICountUp
  },
  data() {
    return {
      daySet: new Array(365),
      year: new Date().getFullYear(),
      opt: {
        useEasing: false,
        useGrouping: true,
        decimal: ".",
        prefix: "",
        suffix: "%"
      },
      dofy: 0,
      startVal: 0,
      endVal: 0,
      t: 0
    };
  },
  mounted() {
    // this.getData();
    this.dofy = parseInt(this.getDayOfTheYear()) + 1;
    this.$refs.countup.pauseResume();
    this.startVal = this.calc();
    this.$refs.countup.start();
    this.loop();
  },
  methods: {
    // async getData() {
    //   let { data } = await this.API.getTime();
    //   this.t = data.time;
    // },
    onTap(index) {
      return () => {
        console.log(index);
      };
    },
    getDayOfTheYear() {
      let t = Date.now() - y;
      return t / (1000 * 3600 * 24);
    },
    loop() {
      setTimeout(() => {
        this.$refs.countup.update(this.calc());
        this.loop();
      }, 1000);
    },
    calc(tt) {
      tt = Date.now();
      return ((tt - y) * 100) / (1000 * 3600 * 24 * 365);
    }
  }
};
</script>
<style lang="scss" scoped>
.home {
  background: #f9f8f8;
}
.tips {
  padding: 15px;
  .text {
    font-size: 12px;
    font-weight: bold;
    color: #908f8f;
    padding: 10px 0;
  }
  &.size-21 {
    font-size: 21px;
  }
  .count {
    font-weight: bold;
  }
  .count1 {
    font-weight: bold;
    padding: 10px 0;
  }
}

.block {
  overflow: hidden;
  padding: 10px;
  .block-item {
    width: 15px;
    height: 15px;
    display: inline-block;
    float: left;
    border: 1px solid #e8e8e8;
    margin: 1px 0;
    // position: relative;
    // left: 1px;
    margin-left: -1px;

    &.active {
      background: #fff000;
    }
  }
}
</style>
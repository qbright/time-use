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
    <div
      v-hammer:tap="hideCalendar"
      ref="calendar"
      class="calendar"
      v-show="show"
      :class="showClass"
    >123123</div>
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

const z = new Date();
z.setMilliseconds(0);
z.setSeconds(0);
z.setMinutes(0);
z.setHours(0);
z.setMonth(0);
z.setDate(1);
z.setFullYear(z.getFullYear() + 1);

export default {
  name: "home",
  components: {
    ICountUp
  },
  data() {
    return {
      show: false,
      showClass: [],
      daySet: [],
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
    this.daySet = new Array(parseInt(this.getDayCountOfTheYear()));
    this.dofy = parseInt(this.getDayOfTheYear()) + 1;
    this.$refs.countup.pauseResume();
    this.startVal = this.calc();
    this.$refs.countup.start();
    this.loop();

    this.$refs.calendar.addEventListener("animationend", e => {
      if (e.animationName.indexOf("Out") !== -1) {
        this.show = false;
      }
    });
    // setTimeout(() => {
    //   this.showClass = ["magictime", "puffIn"];
    // }, 2000);
  },
  methods: {
    // async getData() {
    //   let { data } = await this.API.getTime();
    //   this.t = data.time;
    // },
    hideCalendar() {
      this.showClass = ["magictime", "swashOut"];
    },
    onTap(index) {
      return () => {
        this.show = true;
        this.showClass = ["magictime", "swashIn"];
        console.log(index);
      };
    },
    getDayOfTheYear() {
      let t = Date.now() - y;
      return t / (1000 * 3600 * 24);
    },
    getDayCountOfTheYear() {
      let t = z - y;
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
  // background: #f9f8f8;
  background: white;
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
    width: 20px;
    height: 20px;
    display: inline-block;
    float: left;
    border: 1px solid white;
    margin: 1px 0 0 0;
    background: #ebedf0;
    // position: relative;
    // left: 1px;
    // margin-left: -1px;

    &.active {
      background: #ffb100;
    }
  }
}

.calendar {
  position: absolute;
  top: 0;
  left: 0;
  background: white;
  width: 100%;
  height: 100%;
  z-index: 10;
  box-shadow: 0px 0px 8px 0px #737272;
}
</style>
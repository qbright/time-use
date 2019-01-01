import ajax from "axios";

export default {
  getTime() {
    return ajax({
      url: "http://times.imzqg.top/",
      method: "GET"
    });
  }
};

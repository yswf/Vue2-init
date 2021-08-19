<template>
  <div class="info">
    <h1>这里是Personal Information页面</h1>
    <p>请求返回数据为{{ info.detail }}</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      info: {
        detail: "",
      },
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    async getInfo() {
      const { data: res } = await this.$http.get(
        "/api/user/updatePart/z21071622/"
      );
      console.log(res.detail);
      this.info = res;
    },
  },
};
</script>

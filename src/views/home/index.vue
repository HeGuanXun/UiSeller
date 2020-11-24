<!--  -->
<template>
  <div class="columnflex welcome">
    <h1>{{ $t("home.title") }}</h1>
    <constant/>
  </div>
</template>

<script>
  import constant from "@/component/constant.vue"
  export default {
    components: {
      constant
    }
  }
</script>
<style lang="scss" scoped>
.welcome {
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  font-size: 60px;
  color: #fff;
  background-color: rgb(60, 64, 70);
}
</style>

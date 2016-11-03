<template>
  <div class="header">
    <img src="../assets/logo.png">
    <p>{{ msg }}</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'This is the Header!'
    }
  }
}
</script>

<style lang="less" scoped>
.header {
    color: red;
    img {
        display: block;
        margin: auto;
        width: 380px;
        @media ( max-width:375px ) {
          width: 190rpx;
        }
    }
    p {
      font-size: 36dpx;
      margin-top: 36rpx;
      margin-bottom: 36px;
      @media ( max-width:450px ) {
        font-size: 24dpx;
      }
    }
}
</style>
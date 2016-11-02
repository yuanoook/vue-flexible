<template>
  <div class="footer">
    {{ msg }}
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'This is the Footer!'
    }
  }
}
</script>

<style scoped>
.footer {
    position: fixed;
    width: 100%;
    padding: .2rem;
    bottom: 0;
    font-size: .7rem;
    color: darkblue;
    background: rgba(255,255,255,.9)
}
</style>
<template>
  <div id="app" class="app">
    <hkHead></hkHead>
    <ol v-for="i in list">
      <li :style="{
        color: randomColor(),
        background: randomColor()
      }">
        <div class="list-content">
          {{ i }}
        </div>
      </li>
    </ol>
    <hkFoot></hkFoot>
  </div>
</template>

<script>
import hkHead from './components/Head.vue'
import hkFoot from './components/Foot.vue'

export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      list: [...Array(20).keys()]
    }
  },
  methods: {
    randomColor: ()=>`#${ parseInt(Math.random()*255*255*255).toString(16) }`,
  },
  components: {
    hkHead,
    hkFoot
  }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  margin-top: .5rem;
  text-align: center;
}
ol {
  text-align: left;
}
.list-content {
  padding: .2rem;
  font-size: .7rem;
}
</style>

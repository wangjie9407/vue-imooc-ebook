<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {}
  document.addEventListener('DOMContentLoaded', () => {
    const htmlDom = document.querySelector('html')
    let fontSize = window.innerWidth / 10
    fontSize = fontSize > 50 ? 50 : fontSize
    htmlDom.style.fontSize = fontSize + 'px'
  })
</script>

<style scoped lang="scss">
  @import "assets/styles/global";
  #app{
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>

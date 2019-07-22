<template>
    <div>
      <ebook-title></ebook-title>
      <ebook-reader></ebook-reader>
      <ebook-menu></ebook-menu>
    </div>
</template>

<script>
  import EbookTitle from '../../components/ebook/ebook-title'
  import EbookReader from '../../components/ebook/ebook-reader'
  import EbookMenu from '../../components/ebook/menu-bar'
  export default {
    name: 'index',
    components: { 
      EbookReader,
      EbookTitle,
      EbookMenu
    },
  }
</script>

<style scoped>

</style>

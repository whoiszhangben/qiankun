<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  mounted () {
    // 换肤判断
    let storeThemeColor = localStorage.getItem('themeColor')
    if (storeThemeColor) {
      document.getElementsByTagName('html')[0].className = storeThemeColor
      localStorage.setItem('themeColor', storeThemeColor)
    } else {
      document.getElementsByTagName('html')[0].className = 'theme-0'
      localStorage.setItem('themeColor', 'theme-0')
    }
  }
}
</script>

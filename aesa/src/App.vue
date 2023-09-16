<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  mounted () {
    // // 换肤判断
    // let storeThemeColor = localStorage.getItem('themeColor')
    // if (storeThemeColor) {
    //   document.getElementsByTagName('html')[0].className = storeThemeColor
    //   localStorage.setItem('themeColor', storeThemeColor)
    // } else {
    //   document.getElementsByTagName('html')[0].className = 'theme-0'
    //   localStorage.setItem('themeColor', 'theme-0')
    // }
  },
  computed: {
    ...mapGetters(["getTheme"]),
  },
  watch: {
    getTheme(nVal) {
        if (nVal) {
            console.log("aesa 主题色 if:", nVal);
            document.getElementsByTagName('html')[0].className = nVal;
            localStorage.setItem('themeColor', nVal)
        } else {
            document.getElementsByTagName('html')[0].className = 'theme-0'
            localStorage.setItem('themeColor', 'theme-0')
            console.log("aesa 主题色 else:", "theme-0");
        }
    }
  }
}
</script>

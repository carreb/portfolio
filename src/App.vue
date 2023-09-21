<template>
  <header class="header unselectable">
    <ul>
      <div class="navbox">
        <li class="nav-item">
          <p><a class="navbar" @click="this.$router.push('/')">home</a></p>
        </li>
        <li class="nav-item">
          <p><a class="navbar" @click="this.$router.push('/blog')">blog</a></p>
        </li>
        <li class="nav-item">
           <p><a class="navbar" @click="this.$router.push('/projects')">projects <!--<font-awesome-icon icon="fa-solid fa-caret-down" />--></a></p> 
        </li>
        <!-- <li class="nav-item">
          <p><a class="navbar" @click="this.$router.push('/commissions')">commissions</a></p>
        </li> -->
        <li class="nav-item">
          <p><a class="navbar" @click="this.$router.push('/contact')">contact</a></p>
        </li>
        <li class="nav-item">
          <p><a class="navbar" href="https://garden.domyjobfor.me">garden</a></p>
        </li>
      </div>
    </ul>
    <div class="dropdown projects" v-if="dropdownVisible == 'projects'">
      <div class="dropdownitem"><p>web</p></div>
    </div>
  </header>
  <router-view class="view" v-slot="{ Component, route }">
    <Transition name="slide-fade" mode="out-in">
      <div :key="route.name">
        <component :is="Component"></component>
      </div>
    </Transition>
  </router-view>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      dropdownVisible: "none",
    }
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&display=swap');

* {
  font-family: "Inter", sans-serif;
}

body {
    margin-left: 0;
    margin-top: 0;
    overflow-x: hidden;
}

html {
  scroll-behavior: smooth;
}

.unselectable {
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;
}

.clickable {
  cursor: pointer;
}

.header {
  background-color: #ffffff;
  box-shadow: 0px 0px 20px rgba(12, 12, 12, 0.75);
  display: block;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  height: 50px;
  z-index: 1000000;
}

.nav-item {
  margin-bottom: 15px;
}

li {
  float: left;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 10px;
}

li p {
  color: white;
  display: block;
  padding-top: 0;
  text-align: center;
  text-decoration: none;
}

ul {
  list-style-type: none;
  margin: 0;
  position: absolute;
  overflow: hidden;
  padding: 0;
}

.navbox {
  display: flexbox;
  flex-wrap: nowrap;
}

a.navbar {
  color: #FF92A5;
  text-decoration: none;
  cursor: pointer;
  transition: all 200ms;
  padding: 10px;
}

a {
  color: #FF92A5;
  text-decoration: none;
  cursor: pointer;
  transition: all 200ms;
}

a.navbar:hover {
  background-color: #FF92A5;
  color: #ffffff;
}

.view {
  margin-top: 75px;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: 300ms ease all;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(-60px)
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(60px)
}
</style>

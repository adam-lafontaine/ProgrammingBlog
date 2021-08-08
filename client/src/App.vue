<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.code-font {
  font-family: SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace;
}

.nav-link {
  padding-right: 0.5rem;
  padding-left: 0.5rem;
}
</style>

<template>
  <div id="app">
    <b-navbar type="dark" variant="dark" toggleable="lg">
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/">Home</b-nav-item>
          <b-nav-item to="/posts">Posts</b-nav-item>
          <b-nav-item to="/resources">Resources</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
      <b-navbar-nav class="ml-auto">
        <b-nav-item 
          href="https://github.com/adam-lafontaine"
          target="_blank"
          >
          <b-icon-github/>          
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <router-view/>
  </div>
</template>

<script>
import { Component, Vue, Prop } from 'vue-property-decorator'
import { BIconGithub, BIconLinkedin } from 'bootstrap-vue'

@Component({ components: { BIconGithub, BIconLinkedin } })
export default class App extends Vue {}
</script>
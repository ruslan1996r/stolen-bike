<template>
  <div id="app">
    <div id="nav">
      <form v-if="!policeman" @submit.prevent="register">
        <input v-model="name" placeholder="Policeman Name" />
        <button type="submit">Register</button>
      </form>
      <div v-else>
        <h2>Hello, {{policeman.name}}</h2>
        <button @click="logout">Logout</button>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  name: "Home",
  computed: {
    ...mapGetters(["policeman"])
  },
  data: () => ({
    name: ""
  }),
  methods: {
    ...mapActions(["registerPoliceman"]),
    ...mapMutations(["logout"]),
    async register() {
      await this.registerPoliceman({ name: this.name });
      this.name = "";
    }
  }
  // mounted() {
  //   console.log(this.policeman, "policeman?");
  // }
};
</script>

<style lang="scss">
body {
  margin: 0%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
input {
  border: 0;
  font-size: 1.5em;
  padding: 0.3em;
  border-bottom: 1px solid;
  outline: none;
}
button {
  outline: none;
  border: 0;
  font-size: 1em;
  cursor: pointer;
  background: none;
  text-align: center;
}

#nav {
  padding: 20px;
  background-color: #42b983;
  div {
    display: flex;
    justify-content: center;
    height: 30px;
    button {
      color: white;
      border: 1px solid white;
      padding: 4px;
      width: 70px;
      border-radius: 4px;
      margin-left: 2em;
    }
  }
  form {
    display: flex;
    justify-content: center;
    height: 30px;
    button {
      color: white;
      border: 1px solid white;
      padding: 4px;
      width: 70px;
      border-radius: 4px;
      margin-left: 2em;
    }
  }
  h2 {
    height: 30px;
    margin: 0;
  }
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

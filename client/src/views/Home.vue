<template>
  <div class="home">
    <div v-if="loading">LOADING...</div>
    <div v-else class="container">
      <form @submit.prevent="submitHandler">
        <input type="text" v-model="description" placeholder="Stolen bike" />
        <button type="submit">Submit</button>
      </form>
      <div class="bicycles">
        <ul v-if="bicycles.length">
          <li v-for="b in bicycles" :key="b._id">
            <p>{{b.description}}</p>Status:
            <span
              :class="{
              'stolen':b.status==='STOLEN',
              'search':b.status==='SEARCH', 
              'found':b.status==='FOUND'
              }"
            >{{b.status}}</span>
            <button v-if="b.status==='SEARCH'" @click="changeBikeStatus(b._id)">Bike found</button>
          </li>
        </ul>
        <h3 v-else>No bicycles</h3>
      </div>
      <div class="policemans">
        <ul v-if="policemans.length">
          <li v-for="p in policemans" :key="p._id">
            <h3>{{p.name}}</h3>
            <p
              :class="{
            'free': !p.bicycle,
            'busy':p.bicycle
            }"
            >{{p.bicycle?'busy':'free'}}</p>
          </li>
        </ul>
        <h3 v-else>No policemans</h3>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Home",
  computed: {
    ...mapGetters(["bicycles", "loading", "policemans", "policeman"])
  },
  data: () => ({
    description: ""
  }),
  components: {},
  watch: {
    bicycles(bikes) {
      if (
        bikes.some(b => b.status === "STOLEN") &&
        this.policemans.some(p => p.bicycle === null)
      ) {
        this.searchBicycle();
      }
    },
    policemans(val) {
      if (
        val.some(p => p.bicycle === null) &&
        this.bicycles.some(b => b.status === "STOLEN")
      ) {
        this.searchBicycle();
      }
    }
  },
  methods: {
    ...mapActions(["searchBicycle", "createStolenBicycle", "bikeFound"]),
    async submitHandler() {
      await this.createStolenBicycle({ description: this.description });
      this.description = "";
    },
    async changeBikeStatus(bikeId) {
      if (this.policeman) {
        return await this.bikeFound({ bikeId, role: "police" });
      }
      return alert("You are not a cop!");
    }
  },
  async mounted() {
    await this.$store.dispatch("getBicycles");
    await this.$store.dispatch("getPolicemans");
  }
};
</script>
<style lang="scss">
.container {
  margin: 4em;
  display: flex;
  flex-wrap: wrap;
  form {
    width: 100%;
    margin-bottom: 2em;
    button[type="submit"] {
      margin-left: 1em;
      border: 1px solid;
      border-radius: 5px;
      padding: 0.5em;
    }
  }
  .bicycles {
    flex-grow: 2;
    ul {
      list-style-type: none;
      li {
        .success {
          color: rgb(18, 180, 18);
          font-weight: bold;
        }
        .inprocess {
          color: rgb(42, 126, 252);
          font-weight: bold;
        }
        border: 1px solid;
        border-radius: 5px;
        margin: 1em 0;
        padding-bottom: 1em;
      }
      .stolen {
        color: red;
      }
      .search {
        color: rgb(255, 174, 0);
        margin-right: 1em;
      }
      .found {
        color: rgb(18, 180, 18);
      }
    }
    button {
      border: 1px solid black;
      padding: 0.5em;
    }
  }
  .policemans {
    flex-grow: 1;
    ul {
      list-style-type: none;
      li {
        display: flex;
        align-items: center;
        h3 {
          margin-right: 0.5em;
        }
        p {
          font-weight: bold;
        }
        .busy {
          color: red;
        }
        .free {
          color: rgb(18, 180, 18);
        }
      }
    }
  }
}
</style>
<template>
  <div>
    <index v-if="!user" />
    <aplication v-else  />
  </div>
</template>

<script>
import { baseApiUrl, userKey } from "@/global";
import axios from "axios";
import Index from "./Index.vue";
import Aplication from "./Aplication.vue";
import { mapState } from "vuex"

export default {
  name: "App",
  computed: mapState(['isMenuVisible', 'user']),
  components: {
    Index,
    Aplication,
  },
  data: function () {
    return {
      validatingToken: true,
    };
  },

  methods: {
    async validateToken() {
      this.validatingToken = true;
      const json = localStorage.getItem(userKey);
      const userData = JSON.parse(json);

      this.$store.commit("setUser", null);

      if (!userData) {
        this.validatingToken = false;
        this.$router.push({ name: "App" });

        return;
      }

      const res = await axios.post(`${baseApiUrl}/validateToken`, userData);

      if (res.data) {
        this.$store.commit("setUser", userData);
        await this.$store.dispatch("fetchAvisos");
        await this.$store.dispatch("fetchFamilias");
  
      } else {
        localStorage.removeItem(userKey);
        this.$router.push({ name: "Inicio" });
      }
    },
    loadDataHoje() {
      this.hoje = new Date();
      this.seisMeses = new Date();
      this.seisMeses.setDate(this.hoje.getDate() - 180);
    },
    loadAdmins() {
      this.user = JSON.parse(localStorage.getItem(userKey));
      const url = `${baseApiUrl}/admin/${this.user.id}`;
      axios.get(url).then((res) => {
        this.admin = res.data;
      });
    },
  },
  mounted() {},
  created() {
    this.validateToken();
  },
};
</script>

<style scoped>

</style>

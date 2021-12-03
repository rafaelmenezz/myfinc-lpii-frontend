<template>
  <div id="app" class="uk-margin-remove">
    <Loading v-if="validatingToken" />
    <div v-else>
       <div class="corpo" uk-grid>
      <Menu />
      <router-view name="home"></router-view>
     
    </div>
  </div>
    </div>
   
</template>
<script>
import axios from "axios"
import { baseApiUrl, userKey } from "@/global"
import Menu from "@/components/templates/app/Aside";
import Loading from "@/components/templates/app/Loading"

export default {
  name: "App",
  components: { Menu, Loading },
  data: function() {
		return {
			validatingToken: true
		}
	},
  methods: {
		async validateToken() {
			this.validatingToken = true
			const json = localStorage.getItem(userKey)
			const userData = JSON.parse(json)
			this.$store.commit('setUser', null)
			if(!userData) {
				this.validatingToken = false
	
				return
			}
			const res = await axios.post(`${baseApiUrl}/validateToken`, userData)
			if (res.data) {
				this.$store.commit('setUser', userData)
	
			} else {
				localStorage.removeItem(userKey)
				this.$router.push({ name: '/login' })
			}
			this.validatingToken = false
		}
	},
	created() {
		this.validateToken()
	}
};
</script>

<style scoped>
#app {
  -ms-flex-pack: center;
  -webkit-box-pack: center;
  justify-content: center;
  color: #3c4858;
  font-weight: 300;
  text-shadow: 0 0.05rem 0.1rem rgba(0, 0, 0, 0.5);
  width: 100vw;
  text-align: center;
  height: 100vh;
  background-color: #eee;
}
.corpo {
  width: 100vw;
}

.main {
  height: 100vh;
}
</style>

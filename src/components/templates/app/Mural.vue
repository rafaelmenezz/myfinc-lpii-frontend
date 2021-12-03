<template>
  <div class="main uk-overflow-auto uk-position-center-right">
    
    <div >
    <Header icon="thumbnails" main="Main" />
    <hr class="uk-margin-left uk-margin-right" />
    <div class="mural uk-margin-auto" uk-overflow-auto>
      <AdminReceitas
        :receitaMes="admin.receitaMes"
        :receitaAno="admin.receitaAno"
        :receitaSeisMeses="admin.receitaSeisMeses"
        :hoje="hoje"
        :seisMeses="seisMeses"
      />
      <AdminDespesas
        :despesaMes="admin.despesaMes"
        :despesaAno="admin.despesaAno"
        :despesaSeisMeses="admin.despesaSeisMeses"
        :hoje="hoje"
        :seisMeses="seisMeses"
      />
    </div>
    </div>

    <!-- <div class="uk-width-4-5 uk-margin-auto uk-margin-top" uk-overflow-auto>
      <vk-grid matched class="uk-child-width-1-2@s">
        <div>
          <vk-card hover class="verde uk-light" padding="small">
            
            <div>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            </div>
            <div slot="footer">
              <vk-button-link type="text" href="#">saiba mais</vk-button-link>
            </div>
          </vk-card>
        </div>
        <div>
          <vk-card hover class="red uk-light" padding="small">
            
            <div>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            </div>
            <div slot="footer">
              <vk-button-link type="text" href="#">saiba mais</vk-button-link>
            </div>
          </vk-card>
        </div>
      </vk-grid>
    </div> -->

    <Footer class="uk-width-4-5 uk-margin-large-top" />
  </div>
</template>

<script>
import { baseApiUrl, userKey } from "@/global";
import axios from "axios";
import Header from "@/components/templates/app/HeaderMain";
import Footer from "@/components/templates/app/FooterMain";
import AdminReceitas from "@/components/templates/app/AdminReceitas";
import AdminDespesas from "@/components/templates/app/AdminDespesa";

export default {
  name: "Mural",
  components: { Header, Footer, AdminReceitas, AdminDespesas },
  data: function () {
    return {
      mode: "save",
      hoje: "",
      seisMeses: "",
      options: { year: "numeric", month: "long" },
      admin: {},
      user: {},

    };
  },

  methods: {
  
   
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

  mounted() {
    this.loadDataHoje();
    this.loadAdmins();
  },
 
};
</script>

<style scoped>
.main-page {
  height: 100vh;
}
.mural {
  width: 75vw;
}
title {
  color: #fff;
}

.verde {
  background: linear-gradient(60deg, #66bb6a, #43a047);
  color: #fff;
}

.red {
  background: linear-gradient(60deg, #ef5350, #e53935);
}

.info {
  background: linear-gradient(60deg, #26c6da, #00acc1);
  box-shadow: 0 4px 20px 0px rgb(0 0 0 / 14%),
    0 7px 10px -5px rgb(0 188 212 / 40%);
}
</style>
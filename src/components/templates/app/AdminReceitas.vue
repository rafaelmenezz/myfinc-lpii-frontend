<template>
<vk-grid matched class="uk-child-width-1-3@s" id="admin-receitas">
        <div >
          <vk-card hover class="info uk-light" padding="small">
            <div slot="header">
              <vk-grid gutter="small" class="uk-flex-middle">
                <div class="uk-width-auto">
                  <vk-icon icon="pull" ratio="2"></vk-icon>
                </div>
                <div class="uk-width-expand">
                  <vk-card-title class="uk-margin-remove-bottom"
                    ><h3 class="uk-light uk-margin-remove-bottom">
                      Mês
                    </h3></vk-card-title
                  >
                  <p class="uk-text-meta uk-margin-remove-top">
                    <time :datetime="hoje"> {{ hoje.toLocaleDateString('BR', optionHoje)}}</time>
                  </p>
                </div>
              </vk-grid>
            </div>
            <div>
              <h1>{{receitaMes ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(parseInt(receitaMes)): 0 }}</h1>
            </div>
            <div slot="footer">
              <vk-button-link type="text" href="#">ir receitas</vk-button-link>
            </div>
          </vk-card>
        </div>
        <div>
        <vk-card hover class="info uk-light" padding="small">
            <div slot="header">
              <vk-grid gutter="small" class="uk-flex-middle">
                <div class="uk-width-auto">
                  <vk-icon icon="pull" ratio="2"></vk-icon>
                </div>
                <div class="uk-width-expand">
                  <vk-card-title class="uk-margin-remove-bottom"
                    ><h3 class="uk-light uk-margin-remove-bottom">
                      Ano
                    </h3></vk-card-title
                  >
                  <p class="uk-text-meta uk-margin-remove-top">
                    <time :datetime="hoje"> {{ hoje.toLocaleDateString('BR', optionAno)}}</time>
                  </p>
                </div>
              </vk-grid>
            </div>
            <div>
              <h1>{{receitaAno ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(parseInt(receitaAno)): 0 }}</h1>
            </div>
            <div slot="footer">
              <vk-button-link type="text" href="#">ir receitas</vk-button-link>
            </div>
          </vk-card>
        </div>
        <div>
      <vk-card hover class="info uk-light" padding="small">
            <div slot="header">
              <vk-grid gutter="small" class="uk-flex-middle">
                <div class="uk-width-auto">
                  <vk-icon icon="pull" ratio="2"></vk-icon>
                </div>
                <div class="uk-width-expand">
                  <vk-card-title class="uk-margin-remove-bottom"
                    ><h3 class="uk-light uk-margin-remove-bottom">
                     Ultimo Seis Meses
                    </h3></vk-card-title
                  >
                  <p class="uk-text-meta uk-margin-remove-top">
                    <time :datetime="hoje"> {{ seisMeses.toLocaleDateString('BR', optionHoje) +' à '+ hoje.toLocaleDateString('BR', optionHoje)}}</time>
                  </p>
                </div>
              </vk-grid>
            </div>
            <div>
              <h1>{{receitaSeisMeses ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(parseInt(receitaSeisMeses)): 0 }}</h1>
            </div>
            <div slot="footer">
              <vk-button-link type="text" href="#">ir receitas</vk-button-link>
            </div>
          </vk-card>
        </div>
        
      </vk-grid>
   
</template>

<script>
export default {
  name: "admin-receitas",
  props: {
            hoje: Date, 
            seisMeses:Date,
            receitaMes : Number, 
            receitaAno: Number,
            receitaSeisMeses: Number, 
        },
  data: function() {
        return {
         
            optionHoje: {  year: 'numeric', month: 'long' },
            optionAno: {   year: 'numeric' },
        }
    },
 
};
</script>

<style>
.verde {
  background: linear-gradient(60deg, #66bb6a, #43a047);
  color: #fff;
}



.info {
  background: linear-gradient(60deg, #26c6da, #00acc1);
  box-shadow: 0 4px 20px 0px rgb(0 0 0 / 14%),
    0 7px 10px -5px rgb(0 188 212 / 40%);
}
</style>
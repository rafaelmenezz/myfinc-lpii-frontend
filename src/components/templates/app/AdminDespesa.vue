<template>
<vk-grid matched class="uk-child-width-1-3@s" id="admin-despesa">
        <div >
          <vk-card hover class="red uk-light" padding="small">
            <div slot="header">
              <vk-grid gutter="small" class="uk-flex-middle">
                <div class="uk-width-auto">
                  <vk-icon icon="push" ratio="2"></vk-icon>
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
              <h1>{{despesaMes ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(parseInt(despesaMes)): 0 }}</h1>
            </div>
            <div slot="footer">
              <vk-button-link type="text" href="/myfinc/despesa">ir despesas</vk-button-link>
            </div>
          </vk-card>
        </div>
        <div>
        <vk-card hover class="red uk-light" padding="small">
            <div slot="header">
              <vk-grid gutter="small" class="uk-flex-middle">
                <div class="uk-width-auto">
                  <vk-icon icon="push" ratio="2"></vk-icon>
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
              <h1>{{despesaAno ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(parseInt(despesaAno)): 0 }}</h1>
            </div>
            <div slot="footer">
              <vk-button-link type="text" href="/myfinc/despesa">ir despesa</vk-button-link>
            </div>
          </vk-card>
        </div>
        <div>
      <vk-card hover class="red uk-light" padding="small">
            <div slot="header">
              <vk-grid gutter="small" class="uk-flex-middle">
                <div class="uk-width-auto">
                  <vk-icon icon="push" ratio="2"></vk-icon>
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
              <h1>{{despesaSeisMeses ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(parseInt(despesaSeisMeses)): 0 }}</h1>
            </div>
            <div slot="footer">
              <vk-button-link type="text" href="/myfinc/despesa">ir despesas</vk-button-link>
            </div>
          </vk-card>
        </div>
        
      </vk-grid>
   
</template>

<script>
export default {
  name: "admin-despesa",
  props: {
            hoje: Date, 
            seisMeses:Date,
            despesaMes : Number, 
            despesaAno: Number,
            despesaSeisMeses: Number, 
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



.red {
  background: linear-gradient(60deg, #ef5350, #e53935);
}
</style>
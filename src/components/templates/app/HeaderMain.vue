<template>
  <div class="uk-width-1-1 uk-grid uk-text-left" >
      <div class="page-title">
        <h2 class="uk-margin-top uk-margin-left uk-margin-remove-bottom"><vk-icon :icon="icon" ratio="2"></vk-icon> {{ main }}</h2>
        
       
    </div>
     <hr class="uk-margin"/>
  </div>
</template>

<script>
export default {
  name: "HeaderMain",
  props: ['icon', 'main']
};
</script>

<style>
    .page-title h4 {
        color: #777;
        margin-top: 5px;
        font-size: 1.3rem;
    }
    hr{
      color: #fff
    }
</style>
<template>
  <main role="main" class="uk-margin-large-top main uk-margin-auto" >
   <router-view name="mainApp"></router-view>
  </main>
</template>

<script>
export default {
  name: "Main",
};
</script>

<style scoped>
.main{
  width: 50vw;
}

</style>
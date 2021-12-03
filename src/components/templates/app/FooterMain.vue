<template>
<div :class="classe">
    <footer class=" uk-text-right">
        <div class="inner">
          <p>Desenvolvido para Projeto Intregador I da <a class="link-footer" href="https://usj.edu.br/" target="_blank" rel="noopener">USJ</a>.
           Repositorios <a class="link-footer" href="https://getbootstrap.com/" _blank> <vk-icon icon="github-alt" ratio="0.7"></vk-icon>  front-end</a>
           e <a class="link-footer" href="https://getbootstrap.com/"><vk-icon icon="github-alt" ratio="0.7"></vk-icon> back-end</a>.</p>
        </div>
    </footer>
</div>
</template>

<script>
export default {
  name: "Footer",
  props: ['classe']
};
</script>

<style scoped>

.link-footer{
    color: rgb(7, 7, 7);
    text-decoration:none;
}

.link-footer:hover{
    color: rgba(190, 204, 190, 0.25);
    text-decoration:none;
}


</style>
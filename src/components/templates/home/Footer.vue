<template>
     <footer class="mastfoot uk-position-bottom uk-light">
        <div class="inner">
          <p>Desenvolvido para Projeto Intregador I da <a class="link-footer" href="https://usj.edu.br/" target="_blank" rel="noopener">USJ</a>.
           Repositorios <a class="link-footer" href="https://github.com/rafaelmenezz/usj.pi.myfinc-frontend" _blank> <vk-icon icon="github-alt" ratio="0.7"></vk-icon>  front-end</a>
           e <a class="link-footer" href="https://github.com/rafaelmenezz/usj.pi.myfinc-backend"><vk-icon icon="github-alt" ratio="0.7"></vk-icon> back-end</a>.</p>
        </div>
    </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>

.mastfoot {
  color: rgba(255, 255, 255, .5);
}

.link-footer {
  text-decoration: none;
}

.link-footer:hover {
  color: rgba(209, 238, 209, 0.5);
  text-decoration: none;
}
</style>
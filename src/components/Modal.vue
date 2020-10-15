<template>
  <div class="modal">
    <div class="container">
      <a class="close">Voltar</a>
      <div>
        <h2>Matheus</h2>
        <span> 19 Curtidas </span>
        <p>Este é o conteúdo do post clickado</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.9);
}

.modal .container {
  position: fixed;
  max-width: 600px;
  top: 4vh;
  bottom: 4vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  padding: 2rem;
  border-radius: 4xp;
  background-color: #fff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.7);
  overflow: auto;
}

.close {
  cursor: pointer;
  background: #121212;
  padding: 4px 15px;
  top: 10px;
  left: 10px;
}
</style>
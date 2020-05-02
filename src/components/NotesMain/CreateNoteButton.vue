<template>
  <router-link to="/createNote">
    <div @click="setAction" class="note-create__button">
      <span>+</span>
      <br />
      <span>Добавить новую заметку</span>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "create-note-button",
  methods: {
    setAction () {
      // изменение действия с заметкой на "create"
      this.$store.dispatch("setNoteAction", "create");
    }
  }
};
</script>

<style lang="scss" scoped>
a {
    color: #000;
    text-decoration: none;
    transition: 0.2s all;

    &:hover {
        color: lightgreen;
    }

    .note-create__button {
        width: 50%;
        margin: 0 auto;
        padding: 20px 0;
        text-align: center;
        border: 1px solid #ccc;

        span:first-child {
            font-size: 25px;
            margin-bottom: 5px;
        }
    }
}

</style>
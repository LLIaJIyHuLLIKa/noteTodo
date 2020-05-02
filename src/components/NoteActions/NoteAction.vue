<template>
  <section class="note-action">
    <creation-form v-if="action==='create'"></creation-form>
    <edit-form v-else></edit-form>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import CreationForm from './CreationForm.vue';
import EditForm from './EditForm.vue';

export default {
  name: "note-action",
  components: {
    CreationForm,
    EditForm
  },
  computed: {
    ...mapGetters({
      action: "noteAction"
    })
  }
};
</script>

<style lang="scss">
.note-action {
  input {
    padding: 3px 5px;
    border: 1px solid #ccc;
  }

  img {
    width: 16px;
    height: 16px;
    margin: 0 10px;
    cursor: pointer;
  }

  form {
    & #note-title {
      width: 100%;
      margin-top: 5px;
    }

    & .todo-list {
      margin-top: 20px;

      &__item {
        margin: 5px 0;

        input {
          margin-left: 15px;
        }
      }
    }

    & .form-buttons {
      margin-top: 40px;

      button {
        margin-right: 20px;
        border-radius: 5px;
        padding: 8px 15px;
        cursor: pointer;
      }

      & .cancel {
        border: 1px solid #000;
        background-color: #fff;
      }

      & .submit {
        border: 1px solid lightskyblue;
        background-color: lightskyblue;
      }
    }
  }

  & .add-note__modal, .edit-note__modal, .edit-cancel__modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    min-height: 150px;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
    background-color: #fff;
    z-index: 2;

    button {
      border: 0;
      border-radius: 5px;
      padding: 4px 20px;
      cursor: pointer;
    }

    &-title {
      padding: 50px 0;
      text-align: center;
    }

    &-buttons {
      position: relative;
      width: 100%;
      padding: 0 10px;

      a, .edit {
        position: absolute;
        right: 10px;
      }

      .not-create, .not-edit, .not-cancel-edit {
        background-color: #f00;
        color: #fff;
      }

      .create, .edit, .cancel-edit {
        background-color: lightskyblue;
      }
    }
  }
}
</style>
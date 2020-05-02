<template>
  <div class="note-item">
    <div class="note-item__title">
      <h3>{{ note.note_title }}</h3>
    </div>
    <div class="note-item__todos">
      <span>Список задач:</span>
      <div v-for="(todo, index) in note.note_todos" :key="todo.todo_id" class="todo">
        <span>{{ index + 1 }})</span>
        <span>{{ todo.todo_title }}</span>
        <img v-if="todo.done===true" src="@/assets/images/check.png" />
        <img v-else src="@/assets/images/false.png" />
      </div>
    </div>
    <div class="note-item__actions">
      <button @click="activeDeleteNoteModal = true" class="delete-note">Удалить</button>
      <router-link to="/createNote">
        <button @click="setAction" class="edit-note">Редактировать</button>
      </router-link>
    </div>
    <div v-show="activeDeleteNoteModal===true" class="delete-note__modal">
      <div class="delete-note__modal-title">
        <span>Удалить заметку?</span>
      </div>
      <div class="delete-note__modal-buttons">
        <button @click="activeDeleteNoteModal = false" class="not-delete">Нет</button>
        <button @click="deleteNote" class="delete">Да</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: "note-item",
  props: {
    note: Object
  },
  data() {
    return {
      activeDeleteNoteModal: false
    };
  },
  methods: {
    deleteNote() {
      // удаление заметки
      for(let index in this.notes) {
          let currNote = this.notes[index];

          if(currNote.note_id == this.note.note_id) {
              this.$store.dispatch("deleteNoteAction", index);
              break;
          }
      }
      
      this.activeDeleteNoteModal = false;
    },
    setAction () {
      // изменение действия с заметкой на "edit"
      this.$store.dispatch("setNoteAction", "edit");
      this.$store.dispatch("setEditNoteAction", this.note);
    }
  },
  computed: {
      ...mapGetters({
          notes: "notesList"
      })
  }
};
</script>

<style lang="scss" scoped>
.note-item {
  width: 70%;
  margin: 10px auto;
  padding: 7px 25px;
  border: 1px solid #ccc;
  border-radius: 7px;

  img {
    width: 30px;
    height: 30px;
    margin-left: 5px;
    transform: translateY(9px);
  }

  &__todos {
    span:nth-child(2) {
      margin-left: 8px;
    }
  }

  &__actions {
    margin-top: 15px;
    text-align: right;

    button {
      border: 0;
      padding: 4px 8px;
      border-radius: 5px;
      cursor: pointer;
    }

    & .delete-note {
      background-color: #f00;
      margin-right: 15px;
      color: #fff;
    }
    & .edit-note {
      background-color: lightskyblue;
    }
  }

  & .delete-note__modal {
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

      .not-delete {
        background-color: #f00;
        color: #fff;
      }

      .delete {
        position: absolute;
        right: 10px;
        background-color: lightskyblue;
      }
    }
  }
}
</style>
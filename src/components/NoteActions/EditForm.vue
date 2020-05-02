<template>
  <div class="edit-form">
    <form @submit.prevent>
      <label for="note-title">Название заметки:</label>
      <input
        v-model="editNote.note_title"
        type="text"
        id="note-title"
        placeholder="Введите название заметки..."
        required
      />
      <div class="todo-list">
        <span>Список задач:</span>
        <div
          v-for="(todo, index) in editNote.note_todos"
          :key="todo.todo_id"
          class="todo-list__item"
        >
          <span>{{ index + 1 }}.</span>
          <input v-model="todo.todo_title" type="text" required />
          <input v-model="todo.done" type="checkbox" />
          <img @click="addTodo" src="@/assets/images/add.png" />
          <img
            v-if="editNote.note_todos.length > 1"
            @click="deleteTodo(index)"
            src="@/assets/images/delete.png"
          />
        </div>
      </div>
      <div class="form-buttons">
        <button @click="activeCancelEditModal = true" class="cancel">Отмена редактирования</button>
        <button @click="openActiveEditNoteModal" type="submit" class="submit">Сохранить изменения</button>
        <button v-if="changed===true" @click="undoRedoEdit" class="undo">Отменить изменение</button>
        <button v-if="changed===true" @click="undoRedoEdit" class="redo">Повторить изменение</button>
      </div>
    </form>

    <div v-show="activeEditNoteModal===true" class="edit-note__modal">
      <div class="edit-note__modal-title">
        <span>Сохранить изменения?</span>
      </div>
      <div class="edit-note__modal-buttons">
        <button @click="activeEditNoteModal = false" class="not-edit">Нет</button>
        <button @click="saveChanges" class="edit">Да</button>
      </div>
    </div>
    <div v-show="activeCancelEditModal===true" class="edit-cancel__modal">
      <div class="edit-cancel__modal-title">
        <span>Отменить редактирование?</span>
      </div>
      <div class="edit-cancel__modal-buttons">
        <button @click="activeCancelEditModal = false" class="not-cancel-edit">Нет</button>
        <router-link to="/">
          <button class="cancel-edit">Да</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import _ from "lodash";

export default {
  name: "edit-form",
  data() {
    return {
      activeEditNoteModal: false,
      activeCancelEditModal: false,
      changed: false,
      prevNote: {},
      bufferNote: {}
    };
  },
  mounted() {
    this.prevNote = _.cloneDeep(this.editNote);
    console.log(this.prevNote);
  },
  methods: {
    openActiveEditNoteModal() {
      let fullFields = true;

      if(this.editNote.note_title === "") fullFields = false;

      for(let index in this.editNote.note_todos) {
        let todo = this.editNote.note_todos[index];

        if(todo.todo_title === "") {
          fullFields = false;
          break;
        }
      }

      if(fullFields === true) this.activeEditNoteModal = true;
    },
    addTodo() {
      // добавление задания
      let lastId =
        this.editNote.note_todos[this.editNote.note_todos.length - 1].todo_id +
        1;

      this.editNote.note_todos.push({
        todo_id: lastId,
        todo_title: "",
        done: false
      });
    },
    deleteTodo(index) {
      // удаление задания
      this.editNote.note_todos.splice(index, 1);
    },
    saveChanges() {
      // сохранение изменений
      for (let index in this.notes) {
        let currNote = this.notes[index];

        if (currNote.note_id === this.editNote.note_id) {
          this.$set(this.notes, index, this.editNote);
          break;
        }
      }

      this.changed = true;
      this.activeEditNoteModal = false;

      console.log(this.prevNote);
    },
    undoRedoEdit() {
      // отмена / повтор внесённого изменения
      this.bufferNote = _.cloneDeep(this.editNote);
      this.$store.dispatch("setEditNoteAction", this.prevNote);
      this.prevNote = _.cloneDeep(this.bufferNote);
    }
  },
  computed: {
    ...mapGetters({
      notes: "notesList",
      editNote: "editNote"
    })
  }
};
</script>

<style lang="scss" scoped>
.undo {
  border: 1px solid orange;
  background-color: orange;
}
.redo {
  border: 1px solid lightgreen;
  background-color: lightgreen;
}
</style>
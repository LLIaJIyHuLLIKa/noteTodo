<template>
  <div class="creation-form">
    <form @submit.prevent="activeAddNoteModal = true">
      <label for="note-title">Название заметки:</label>
      <input
        v-model="noteTitle"
        type="text"
        id="note-title"
        placeholder="Введите название заметки..."
        required
      />
      <div class="todo-list">
        <span>Список задач:</span>
        <div v-for="(todo, index) in todoList" :key="todo.todo_id" class="todo-list__item">
          <span>{{ index + 1 }}.</span>
          <input v-model="todo.todo_title" type="text" required />
          <input v-model="todo.done" type="checkbox" />
          <img @click="addTodo" src="@/assets/images/add.png" />
          <img @click="deleteTodo(index)" v-if="index > 0" src="@/assets/images/delete.png" />
        </div>
      </div>
      <div class="form-buttons">
        <router-link to="/">
          <button class="cancel">Отмена</button>
        </router-link>
        <button type="submit" class="submit">Создать заметку</button>
      </div>
    </form>

    <div v-show="activeAddNoteModal===true" class="add-note__modal">
      <div class="add-note__modal-title">
        <span>Создать заметку?</span>
      </div>
      <div class="add-note__modal-buttons">
        <button @click="activeAddNoteModal = false" class="not-create">Нет</button>
        <router-link to="/">
          <button @click="addNote" class="create">Да</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: "creation-form",
  data() {
    return {
      noteTitle: "", // название заметки
      todoList: [
        // список дел
        {
          todo_id: 1,
          todo_title: "",
          done: false
        }
      ],
      activeAddNoteModal: false
    };
  },
  methods: {
    addTodo() {
      // добавление задания
      let lastId = this.todoList[this.todoList.length - 1].todo_id + 1;

      this.todoList.push({
        todo_id: lastId,
        todo_title: "",
        done: false
      });
    },
    deleteTodo(index) {
      // удаление задания
      this.todoList.splice(index, 1);
    },
    addNote() {
      // добавление заметки
      let lastId = 1;
      
      if (this.notes.length > 0) {
        lastId = this.notes[this.notes.length - 1].note_id + 1;
      }

      const newNote = {
        note_id: lastId,
        note_title: this.noteTitle,
        note_todos: this.todoList
      };

      this.$store.dispatch("addNoteAction", newNote);
    }
  },
  computed: {
    ...mapGetters({
      notes: "notesList"
    })
  }
};
</script>
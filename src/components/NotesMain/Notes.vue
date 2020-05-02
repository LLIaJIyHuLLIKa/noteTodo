<template>
    <section class="notes">
        <div v-if="notes.length == 0" class="notes__description">
            <span>В данный момент заметок нет</span>
        </div>
        <div class="notes__list">
            <note-item v-for="note in notes" :key="note.note_id" :note="note"></note-item>
        </div>
    </section>
</template>

<script>
import NoteItem from './NoteItem.vue';
import { mapGetters } from 'vuex';

export default {
    name: "notes",
    components: {
        NoteItem
    },
    computed: {
        ...mapGetters({
            notes: "notesList"
        })
    }
}
</script>

<style lang="scss" scoped>
.notes {
    &__description {
        padding-bottom: 20px;
        text-align: center;
        font-size: 14px;
        color: #ccc;
    }
}
</style>
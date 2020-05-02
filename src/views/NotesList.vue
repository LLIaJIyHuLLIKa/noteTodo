<template>
    <div class="notes-list">
        <notes-header></notes-header>
        <Notes/>
        <create-note-button></create-note-button>
    </div>
</template>

<script>
import NotesHeader from '../components/NotesMain/NotesHeader.vue';
import Notes from '../components/NotesMain/Notes.vue';
import CreateNoteButton from '../components/NotesMain/CreateNoteButton.vue';

export default {
    name: "notes-list",
    components: {
        NotesHeader,
        Notes,
        CreateNoteButton
    }
}
</script>
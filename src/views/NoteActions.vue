<template>
    <div class="note-creation">
        <note-action-header></note-action-header>
        <note-action></note-action>
    </div>
</template>

<script>
import NoteActionHeader from '../components/NoteActions/NoteActionHeader.vue';
import NoteAction from '../components/NoteActions/NoteAction.vue';

export default {
    name: "note-creation",
    components: {
        NoteActionHeader,
        NoteAction
    }
}
</script>
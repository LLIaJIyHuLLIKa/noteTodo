<template>
    <header class="header">
        <h1 v-if="action==='create'">Создание новой заметки</h1>
        <h1 v-else>Редактирование заметки</h1>
    </header>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: "note-action-header",
    computed: {
        ...mapGetters({
            action: "noteAction"
        })
    }
}
</script>

<style lang="scss" scoped>
.header {
    text-align: center;
}
</style>
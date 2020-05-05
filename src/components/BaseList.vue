<template>
    <div class="container">
        <ul class="list-group">
            <li class="list-group-item d-flex justify-content-between align-items-center"
                v-for="(task, index) in taskList"
                :key="index"
            >
                <span>{{ task.title }}</span>
                <button type="button"
                        class="btn btn-outline-danger"
                        @click="removeItem(task.id)"
                >Удалить</button>
            </li>
            <form @submit="addItem($event)" class="mt-3">
                <div class="row">
                    <div class="col-10">
                        <div class="form-group">
                            <input type="text" v-model="newTask" class="form-control" id="exampleInput" aria-describedby="help">
                            <small id="help" class="form-text text-muted">Добавьте в задачу в список</small>
                        </div>
                    </div>

                    <div class="col-2">
                        <button type="submit" class="btn btn-primary">Добавить</button>
                    </div>
                </div>
            </form>
        </ul>
    </div>
</template>

<script lang="ts">
    import { Component, Model, Vue } from 'vue-property-decorator';
    import logger from "vuex/dist/logger";
    const qs = require('qs');

    @Component
    export default class BaseList extends Vue {
        public url: string = '';
        private newTask: string = '';

        get taskList() {
            return this.$store.state.list;
        }
        // @Prop({ required: false, type: Array, default: () => (['Мама, мне не задали']) }) readonly taskList!: Array<String>
        @Model('input', { type: Boolean }) readonly checked!: boolean
        /**
         * Set task as complete and remove it
         */
        public removeItem(id: number): void {
            const url = this.url + '/' + id;
            fetch(url, {
                method: 'DELETE',
            })
            .then(res => res.json())
            .then(res => {
                this.$store.commit('removeItem', id)
            })
        }

        /**
         * Save new task to the items list
         */
        public addItem($event: Event): void {
            $event.preventDefault();
            fetch(this.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: qs.stringify({
                    title: this.newTask
                })
            })
                .then(res => res.json())
                .then(res => {
                    this.$store.commit('addItem', res);
                    this.newTask = '';
                })
        }
    }
</script>

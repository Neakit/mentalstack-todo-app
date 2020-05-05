<script lang="ts">
    import BaseList from '@/components/BaseList.vue';
    import { Component } from 'vue-property-decorator';

    @Component({
        name: 'TopMemes'
    })
    export default class List extends BaseList {
        public url = 'http://localhost:3000/topMemesList';

        created() {
            this.$store.dispatch('getList', { url : 'http://localhost:3000/topMemesList' });
        }
    }
</script>


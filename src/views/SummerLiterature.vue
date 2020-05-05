<script lang="ts">
import BaseList from '@/components/BaseList.vue';
import { Component } from 'vue-property-decorator';

@Component({
  name: 'SummerLiterature'
})
export default class List extends BaseList {
    public url = 'http://localhost:3000/summerLiteratureList';

    created() {
        this.$store.dispatch('getList', { url :'http://localhost:3000/summerLiteratureList' });
    }
}
</script>


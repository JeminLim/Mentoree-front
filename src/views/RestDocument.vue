<template>
    <div>
        <p v-html="restDocs"></p>
    </div>
</template>

<script>
import axios from '@/service/axios';

export default {
    data() { 
        return {
            restDocs : ""
        }
    },
    beforeMount() {
        var documentName = this.$route.params.name;
        
        axios.get('/docs/' + documentName + '.html')
        .then(res => {
            console.log(res);
            this.restDocs = res.data;
        }).catch(err => {
            console.log(err);
        })
    }
}
</script>

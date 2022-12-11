<template>
    <div class="authLogin">
    </div>
</template>


<script>
import axios from '@/service/axios.js';

export default {
    components: {

    },
    methods: {
        
    },
    created() {
        axios.post('/member-auth-service/auth/login?'
            + 'code=' + this.$route.query.code 
            + '&provider=' + this.$route.params.provider
        )
        .then((response) => {
            if(response.data.result == 'success'){
                this.$store.dispatch('user/loginUser', response.data.loginMember);
                this.$router.push('/');
            } else {
                this.$router.push('/');
            }
        }).catch((error) => {
            console.log(error);
            alert("로그인 요청에 실패했습니다.");
            this.$router.push('/');
        })
        

    }
}
</script>
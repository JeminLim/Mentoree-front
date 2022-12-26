<template>
    <div class="wrap">
        <div class="login">
            <h2>Sign in With Email</h2>
            <div class="login_id">
                <h4>E-mail</h4>
                <input type="email" name="email" id="id" v-model="email" placeholder="Email">
            </div>
            <div class="login_pw">
                <h4>Password</h4>
                <input type="password" name="password" id="password" v-model="password" placeholder="Password">
            </div>
            <div class="submit">
                <input type="submit" value="submit" @click="login()">
            </div>
            <div class="register">
                <router-link class="gray" to="/register">아직 회원이 아니신가요?</router-link>
            </div>
            <div class="loginWith">Sign in with</div>
            <div class="snsLogin">
                <img class="loginBtn" src="../assets/btn_google_signin_dark_normal_web.png">
                <img class="loginBtn" src="../assets/btnG_official.png">
            </div>
        </div>
    </div>
</template>
  
<script>
import axios from '@/service/axios';

    export default {
        name: 'Login',
        components: {

        },
        data() {
            return {
                email: '',
                password: '',
            }
        },
        methods: {
            login() {
                const loginForm = new FormData();
                loginForm.append('email', this.email);
                loginForm.append('password', this.password);

                axios.post('/api/login', loginForm)
                .then((res) => {
                    const payload = {
                        accessToken: res.data.accessToken,
                        id: res.data.MemberProfile.id,
                        email: res.data.MemberProfile.email,
                        nickname: res.data.MemberProfile.nickname,
                        username: res.data.MemberProfile.username,
                        history: res.data.MemberProfile.histories,
                        mentor: res.data.ParticipatedMentor,
                        mentee: res.data.ParticipatedMentee,
                    };
                    this.$store.dispatch('user/loginUser', payload);
                    this.$router.push('/');
                }).catch((error) => {
                    console.log(error);
                })
            }
        }
    }
</script>

<style scoped>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Noto Sans KR", sans-serif;
    }

    .wrap {
        width: 100%;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 255, 0.2);
    }

    .login {
        width: 30%;
        height: 700px;
        background: white;
        border-radius: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    h2 {
        margin-top: 10%;
        color: rgb(0, 128, 255);
        font-size: 2em;
    }
    .login_id {
        margin-top: 20px;
        width: 80%;
    }

    .login_id input {
        width: 100%;
        height: 50px;
        border-radius: 30px;
        margin-top: 10px;
        padding: 0px 20px;
        border: 1px solid lightgray;
        outline: none;
    }

    .login_pw {
        margin-top: 20px;
        width: 80%;
    }

    .login_pw input {
        width: 100%;
        height: 50px;
        border-radius: 30px;
        margin-top: 10px;
        padding: 0px 20px;
        border: 1px solid lightgray;
        outline: none;
    }

    .submit {
        margin-top: 50px;
        width: 80%;
    }
    .submit input {
        width: 100%;
        height: 50px;
        border: 0;
        outline: none;
        border-radius: 40px;
        background: linear-gradient(to left, rgb(46, 84, 255), rgb(0, 128, 255));
        color: white;
        font-size: 1.2em;
        letter-spacing: 2px;
    }

    .loginWith {
        display: flex;
        flex-basis: 100%;
        align-items: center;
        color: rgba(128,128,128, 0.35);
        font-size: 20px;
        margin-top: 4%;
        margin-bottom: 3%;
        width: 100%;
    }

    .loginWith::before {
        content: "";
        flex-grow: 1;
        margin: 0px 16px;
        background: rgba(128,128,128,0.35);
        height: 1px;
        font-size: 0;
        line-height: 0px;
    }

    .loginWith::after {
        content: "";
        flex-grow: 1;
        margin: 0px 16px;
        background: rgba(128,128,128, 0.35);
        height: 1px;
        font-size: 0;
        line-height: 0px;
    }

    .loginBtn {
        height: 30%;
        width: 80%;
        margin: 2% 0;
    }
    
    .register {
        margin-top: 3%;
    }
    
    .gray {
        color: rgba(136, 136, 136, 0.702);
        text-decoration: none;
    }

</style>
  
  
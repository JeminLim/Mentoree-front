<template>
    <div class="wrap">
        <div class="regist">
            <h2>Sign up</h2>
            <div class="login_id">
                <h4 class="label">E-mail</h4>
                <input type="email" name="email" id="id" v-model="email" placeholder="Email">
            </div>
            <div class="login_pw">
                <h4 class="label">Password</h4>
                <input type="password" name="password" id="password" v-model="password" placeholder="Password">
            </div>
            <div class="login_pw">
                <h4 class="label">Password check</h4>
                <input type="password" name="doubleCheck" id="doubleCheck" v-model="doubleCheck" placeholder="Password check">
            </div>
            <div class="login_nickname"> 
                <h4 class="label">Nickname</h4>
                <input type="text" name="nickname" id="nickname" v-model="nickname" placeholder="Nickname">
            </div>
            <div v-if="duplicateEmail || duplicateNickname || passwordNotMatch" class="errorMessage">
                <span class="red bold">{{ message }}</span>
            </div>
            <div class="submit">
                <input type="submit" value="submit" @click="signUp()">
            </div>
            <div class="login">
                <router-link class="gray" to="/login">로그인</router-link>
            </div>
        </div>
    </div>
</template>
  
<script>
import axios from '@/service/axios';

    export default {
        name: 'Register',
        components: {

        },
        data() {
            return {
                email: '',
                password: '',
                nickname: '',
                doubleCheck: '',
                duplicateEmail: true,
                duplicateNickname: false,
                passwordNotMatch: false,
                message: '',
            }
        },
        watch: {
            email(newEmail) {
                if(newEmail != null) {
                    this.duplicateCheckEmail();
                }
            },
            nickname(newNickname) {
                if(newNickname != null) {
                    this.duplicateCheckNickname();
                }
            },
            doubleCheck(newDoubleCheck) {
                if(newDoubleCheck != this.password) {
                    this.passwordNotMatch = true;
                    this.message = "비밀번호가 일치하지 않습니다.";
                } else {
                    this.passwordNotMatch = false;
                    this.message = '';
                }
            }
        },
        methods: {
            duplicateCheckEmail() {
                axios.get('/api/members/join/check/email', {params: {email : this.email}})
                .then(res => { 
                    this.duplicateEmail = res.data.result;
                    if(this.duplicateEmail) {
                        this.message = '이미 존재하는 이메일 입니다.';
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            duplicateCheckNickname() {
                axios.get('/api/members/join/check/nickname', {params: {nickname: this.nickname}})
                .then(res =>{
                    this.duplicateNickname = res.data.result;
                    if(this.duplicateNickname) {
                        this.message = '이미 존재하는 닉네임 입니다.';
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            signUp() {
                if(this.duplicateEmail || this.duplicateNickname || this.passwordNotMatch) {
                    let msg = '';
                    if(this.duplicateEmail) msg = "이미 존재하는 이메일입니다.";
                    if(this.duplicateNickname) msg = "이미 존재하는 닉네임입니다.";
                    if(this.passwordNotMatch) msg = "비밀번호가 일치하지 않습니다.";

                    alert(msg);
                } else {
                    const signupForm = {
                        email: this.email,
                        password: this.password,
                        nickname: this.nickname,
                    }
                    
                    axios.post('/api/members/join', signupForm)
                    .then(() => {
                        alert('회원가입이 완료되었습니다.');
                        this.$router.replace('login');
                    }).catch((err) => {
                        console.log(err);
                    })
                }

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

    .regist {
        width: 30%;
        height: 750px;
        background: white;
        border-radius: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    h2 {
        margin-top: 3%;
        color: rgb(0, 128, 255);
        font-size: 2em;
    }
    .label {
        margin-left: 20px;
    }
    .login_id {
        text-align: left;
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
        text-align: left;
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
    .login_nickname {
        text-align: left;
        margin-top: 20px;
        width: 80%;
    }

    .login_nickname input {
        width: 100%;
        height: 50px;
        border-radius: 30px;
        margin-top: 10px;
        padding: 0px 20px;
        border: 1px solid lightgray;
        outline: none;
    }

    .submit {
        margin-top: 20px;
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
    .login {
        margin-top: 3%;
    }
    .login :hover {
        color: rgb(85, 85, 85);
        text-decoration: underline;
    }
    
    .gray {
        color: rgba(136, 136, 136, 0.702);
        text-decoration: none;
    }
    .red {
        color: red;
    }

    .bold {
        font-weight: bold;
    }

    .errorMessage{
        margin-top: 5%;
    }

</style>
  
  
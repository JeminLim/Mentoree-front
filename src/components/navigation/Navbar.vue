<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="#" @click="goToHome()">MENTOREE</a>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item" v-if="isLogin">
                        <SideNavbar />
                    </li>
                </ul>
                <div class="d-flex" v-if="this.$store.state.user.isLogin">
                    <b-navbar-nav>
                        <b-nav-item-dropdown right>
                            <template #button-content>
                                <em><font-awesome-icon :icon="['fas', 'user']" /></em>
                            </template>
                            <b-dropdown-item href="#" @click="goToProfile()">내 프로필</b-dropdown-item>
                            <hr>
                            <b-dropdown-item @click="logout()">로그아웃</b-dropdown-item>
                        </b-nav-item-dropdown>
                    </b-navbar-nav>
                </div>
                <div class="d-flex" v-else>
                    <b-navbar-nav>
                        <b-nav-item-dropdown text="Sign in" right no-caret>
                            <div class="drop-down-area">
                                <div class="login-with">Sign in with</div>
                                <b-dropdown-item v-on:click="formLogin()">
                                    <b-button class="formLoginBtn">Sign In with Email</b-button>
                                </b-dropdown-item>
                                <b-dropdown-item v-on:click="googleLogin()">
                                    <img class="loginBtn" src="../../assets/btn_google_signin_dark_normal_web.png">
                                </b-dropdown-item>
                                <b-dropdown-item v-on:click="naverLogin()">
                                    <img class="loginBtn" src="../../assets/btnG_official.png">
                                </b-dropdown-item>
                            </div>
                        </b-nav-item-dropdown>
                    </b-navbar-nav>
                </div>
            </div>
        </div>
    </nav>
</template>


<script>
import axios from '@/service/axios.js';
import SideNavbar from '@/components/navigation/SideNavbar';

export default {
    components: {
        SideNavbar
    },
    computed: {
        isLogin() {
            return this.$store.state.user.isLogin;
        }
    },
    methods: {
        logout() {
            axios.post('/api/logout')
            .then(() => {
                this.$store.dispatch('user/logout');
                this.$router.go('/');
            }).catch(err => {
                console.log(err);
            })
        },
        formLogin() {
            this.$router.push('/login');
        },
        goToProfile() {
            this.$router.push('/profile/' + this.$store.state.user.userInfo.id);
        },
        goToHome() {
            var url = this.$route.path;
            if(url === '/') {
                this.$router.go();
            } else {
                this.$router.push('/');
            }
        }
    }
}
</script>

<style scoped>
.nav-container {
    margin: 0;
}

.formLoginBtn {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 95%;

    outline: none;
    background: rgba(42, 141, 241, 0.732);
    border-radius: 3px;
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.4), -3px -3px 5px rgba(0,0,0, 0.1);

    color: white;
    font: 20px bold;
    font-weight: 600;
    font-family: sans-serif;
    margin: 3px;
    padding: 10px 5px;
}

.loginBtn {
    height: 100%;
    width: 100%;
}

.drop-down-area {
    width: 250px;
    height: auto;
}

.login-with {
    display: flex;
    flex-basis: 100%;
    align-items: center;
    color: rgba(128,128,128, 0.35);
    font-size: 14px;
    margin: 8px 0px;
}

.login-with::before {
    content: "";
    flex-grow: 1;
    margin: 0px 16px;
    background: rgba(128,128,128,0.35);
    height: 1px;
    font-size: 0;
    line-height: 0px;
}

.login-with::after {
    content: "";
    flex-grow: 1;
    margin: 0px 16px;
    background: rgba(128,128,128, 0.35);
    height: 1px;
    font-size: 0;
    line-height: 0px;
}

</style>
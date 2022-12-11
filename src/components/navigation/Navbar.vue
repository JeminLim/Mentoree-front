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
            const url = '/member-auth-service/auth/logout/' + this.$store.state.user.userInfo.id;
            console.log(url);
            console.log(this.$store.state.user.userInfo.id);
            axios.post(url)
            .then(res => {
                console.log(res);
                this.$store.dispatch('user/logout');
                this.$router.go('/')
            }).catch(err => {
                console.log(err);
            })
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
        },
        googleLogin() {
            var url = 'https://accounts.google.com/o/oauth2/v2/auth?';
            var scope = 'scope=' + 'profile email'
            var type = '&response_type=code';
            var client_id = '&client_id=652563865976-34g11qkjpf0alptlvvnemd5vqc4vk9bt.apps.googleusercontent.com'

            var redirect_uri = "";
            if(process.env.NODE_ENV == 'local')
                redirect_uri = '&redirect_uri=http://localhost:8081/login/oauth2/code/google';
            else
                redirect_uri = '&redirect_uri=https://mentoree.tk/login/oauth2/code/google';

            window.location.href = url + scope + type + client_id + redirect_uri;
        },
        naverLogin() {
            var url = 'https://nid.naver.com/oauth2.0/authorize?';
            var response_type = 'response_type=code';
            var client_id = '&client_id=qnZJDNtDoNZvqONmiIkA';

            var redirect_uri = "";
            if(process.env.NODE_ENV == 'local')
                redirect_uri = '&redirect_uri=http://localhost:8081/login/oauth2/code/naver';
            else
                redirect_uri = '&redirect_uri=https://mentoree.tk/login/oauth2/code/naver';

            var state = '&state=oauth_state';

            window.location.href = url + response_type + client_id + redirect_uri + state;
        }
    }
}
</script>

<style scoped>
.nav-container {
    margin: 0;
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
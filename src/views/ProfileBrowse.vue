<template>
    <div class="container-fluid">
        <div class="row">
            <h2 class="header-pos">
                <span>{{this.nickname}} 님의 프로필</span>
                <router-link v-if="this.isLoginUser" class="btn btn-primary mx-3" to="/edit/profile">프로필 편집</router-link>
            </h2>
            <div class="row d-flex">
                <aside class="leftSection col-md-2">
                    <label>이메일</label>
                </aside>
                <div class="rightSection col-md-7">
                    <p class="infoInput" type="text" name="email" id="inputEmail"> {{this.email}} </p>
                </div>
            </div>

            <div class="row d-flex">
                <aside class="leftSection col-md-2">
                    <label>이름</label>
                </aside>
                <div class="rightSection col-md-7">
                    <p class="infoInput" type="text" name="memberName" id="inputName"> {{this.username}} </p>
                </div>
            </div>

            <div class="row d-flex">
                <aside class="leftSection col-md-2">
                    <label>닉네임</label>
                </aside>
                <div class="rightSection col-md-7">
                    <p class="infoInput" type="text" name="nickname" id="inputNickname"> {{this.nickname}} </p>
                </div>
            </div>

            <div class="row d-flex">
                <aside class="leftSection col-md-2">
                    <label>경력소개</label>
                </aside>
                <div class="rightSection col-md-10">
                    <table class="w-100">
                        <tbody>
                        <tr>
                            <td width="20%">기간</td>
                            <td width="20%">회사이름</td>
                            <td width="60%">역할</td>
                        </tr>
                        <tr v-for="(history, index) in histories" v-bind:key="index">
                            <td width="20%">{{history.startDate}} ~ {{history.endDate}}</td>
                            <td width="20%">{{history.companyName}}</td>
                            <td width="60%">{{history.position}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '@/service/axios';

export default {
    data() {
        return { 
            isLoginUser: false,
            id: '',
            email: '',
            username: '',
            nickname: '',
            histories: [],
        }
    },
    beforeMount() {
        this.isLoginUser = this.$store.state.user.userInfo.id == this.$route.params.userId ? true : false;

        if(this.isLoginUser) {
            this.id = this.$store.state.user.userInfo.id;
            this.email = this.$store.state.user.userInfo.email;
            this.username = this.$store.state.user.userInfo.username;
            this.nickname = this.$store.state.user.userInfo.nickname;
            this.histories = this.$store.state.user.userInfo.history;
        } else {
            axios.get('/api/members/profiles/' + this.$route.params.userId)
            .then(res => {
                this.id = res.data.member.memberId;
                this.email = res.data.member.email;
                this.username = res.data.member.username;
                this.nickname = res.data.member.nickname;
                this.histories = res.data.member.histories;
            }).catch( err => {
                console.log(err);
            });
        }
    },
}
</script>

<style scoped>
.header-pos {
    margin-top: 3%;
}

.leftSection {
    padding-right: 20px;
    margin-top: 3%;
    text-align: right;
    font-size: 20px;
    border-right: 3px solid #BBBBBB;
}

.rightSection {
    margin-top: 3%;
    text-align: left;
    padding-right: 20%;
    font-size: 15px;
}

.loginUserImg{
	border-radius: 50%;
}

#userId {
    margin-top: 5px;
    margin-left: 10px;
    font-size: 25px;
    font-weight: bold;
}

.infoInput {
    width: 100%;
    height: 40px;
}

.infoInput::-webkit-input-placeholder{
    padding-left: 10px;
    text-align: left;
}

.desc{
    margin-bottom: 0;
}

.descInfo {
    font-size: 12px;
}

.btnRow {
    text-align: center;
    margin: 15px 10px;
}

.disabled {
    color: #BBBBBB;
    pointer-events: none;
}
</style>

<template>
    <div class="container-fluid">
        <div class="row">
            <h2 class="header-pos">{{this.nickname}} 님의 프로필</h2>
            <form action="#" role="form" id="userInfoForm" method="post" v-on:submit.prevent="submitProfile" >
                <div class="row d-flex">
                    <aside class="leftSection col-md-2">
                        <label>이메일</label>
                    </aside>
                    <div class="rightSection col-md-7">
                        <input class="infoInput" type="text" placeHolder="이메일" name="email" id="inputUserEmail" ref="email" v-model="email" readonly/>
                    </div>
                </div>

                <div class="row d-flex">
                    <aside class="leftSection col-md-2">
                        <label>이름</label>
                    </aside>
                    <div class="rightSection col-md-7">
                        <input class="infoInput" type="text" placeHolder="이름" name="memberName" id="inputUserName" ref="memberName" v-model="memberName" />
                    </div>
                </div>

                <div class="row d-flex">
                    <aside class="leftSection col-md-2">
                        <label>닉네임</label>
                    </aside>
                    <div class="rightSection col-md-7">
                        <input class="infoInput" type="text" placeHolder="사용자 이름" name="nickname" id="inputUserId" ref="nickname" v-model="nickname" />
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
                                    <td class="text-center" width="30%">기간</td>
                                    <td class="text-center" width="15%">회사이름</td>
                                    <td class="text-center" width="35%">역할</td>
                                    <td class="btn-right text-center" width="20%">
                                        <b-button @click="addHistory()"><Strong>Add</Strong></b-button>
                                    </td>
                                </tr>
                                <tr v-for="(history, index) in getHistories" v-bind:key="index">
                                    <td class="d-flex w-100" width="30%">
                                        <b-form-datepicker id="startDate" :date-format-options="{year: '2-digit', month: '2-digit', day: '2-digit'}" size="sm" placeholder="start date" class="history_element w-100" v-model="history.startDate" />
                                        <span class="date-divider">   -   </span>
                                        <b-form-datepicker id="endDate" :date-format-options="{year: '2-digit', month: '2-digit', day: '2-digit'}" size="sm" placeholder="end date" class="history_element w-100" v-model="history.endDate"/>
                                    </td>
                                    <td width="15%">
                                        <input class="history_element w-100" type="text" placeholder="Company name" v-model="history.companyName" />    
                                    </td>
                                    <td width="35%">
                                        <input class="history_element w-100" type="text" placeholder="Position" v-model="history.position" />  
                                    </td>
                                    <td class="btn-right text-center" width="20%">
                                        <font-awesome-icon :icon="['fas', 'minus-circle']" class="extract-btn" @click="removeRow(index)" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="row btnRow col-md-1 mt-5" style="margin-left: 25%">
                    <button type="submit" class="btn btn-primary" id="updateUserInfo">제출</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from '@/service/axios';
export default {
    name: 'ProfileEdit',
    data() {
        return {
            memberId: '',
            email: '',
            memberName: '',
            nickname:'',
            histories: [],
        }
    },
    methods: {
        submitProfile() {
            var requestBody = {
                id: this.memberId,
                email: this.email,
                username: this.memberName,
                nickname: this.nickname,
                histories: this.histories,
            }
            axios.post('/api/members/profiles', requestBody)
            .then(res => {
                console.log(res.data.member);
                alert("프로필 정보가 변경되었습니다.");
                this.$store.dispatch('user/update', res.data.member);
                this.$router.push('/profile/' + res.data.member.id);
            }).catch(err => {
                console.log(err);
            });
        },
        addHistory() {
            this.histories.push({
                    startDate: '',
                    endDate: '',
                    companyName: '',
                    position: '',
            })
        },
        removeRow(index) {
            this.histories.splice(index, 1);
        }
    },
    computed: {
        getHistories() {
            return this.histories;
        }
    },
    created() {
        this.memberId = this.$store.state.user.userInfo.id;
        this.email = this.$store.state.user.userInfo.email;
        this.memberName = this.$store.state.user.userInfo.username;
        this.nickname = this.$store.state.user.userInfo.nickname;
        if(this.$store.state.user.userInfo.history != null)
            this.histories = this.$store.state.user.userInfo.history;
    }
    
}
</script>

<style scoped>
.header-pos {
    margin-top: 3%;
}
.w-100 {
    width: 100%;
}

.btn-right {
    text-align: right;
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

.extract-btn {
    font-size: 30px;
}
.extract-btn:hover {
    cursor: pointer;
}
.date-divider {
    margin-left: 2%;
    margin-right: 2%;
}
.d-block {
    display: block;
}

.d-block input {
    width:100%;
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

.btnRow {
    text-align: center;
    margin: 15px 10px;
}

table {
    border-spacing: 10px;
    border-collapse: separate;
}

.history_element{
    border: 3px solid rgba(37, 37, 37, 0.159);
    border-radius: 10px;
    padding-left: 1%;
    padding-right: 1%;
}

.history_element:focus {
    border: 3px solid rgba(37, 37, 37, 0.756);
}


.text-center {
    text-align: center;
}

</style>
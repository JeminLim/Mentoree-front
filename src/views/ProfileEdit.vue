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
                        <label>관심분야</label>
                    </aside>
                    <div class="rightSection col-md-7" >
                        <select ref="interests" name="selectInterest" v-model="selectedList[0]">
                            <option disabled value="undefined">흥미분야선택</option>
                            <option v-for="(item, index) in selectList" :key="index" :value="item.name" :disabled="excludeSelectedItem(item.name)">
                                {{item.name}}
                            </option>
                        </select>
                        <select ref="interests" name="selectInterest" v-model="selectedList[1]">
                            <option disabled value="undefined">흥미분야선택</option>
                            <option v-for="(item, index) in selectList" :key="index" :value="item.name" :disabled="excludeSelectedItem(item.name)">
                                {{item.name}}
                            </option>
                        </select>
                        <select ref="interests" name="selectInterest" v-model="selectedList[2]">
                            <option disabled value="undefined">흥미분야선택</option>
                            <option v-for="(item, index) in selectList" :key="index" :value="item.name" :disabled="excludeSelectedItem(item.name)">
                                {{item.name}}
                            </option>
                        </select>
                    </div>
                </div>

                <div class="row d-flex">
                    <aside class="leftSection col-md-2">
                        <label>경력소개</label>
                    </aside>
                    <div class="rightSection col-md-7">
                        <textarea class="infoInput" name="link" style="height: 200px" id="inputUserDesc" ref="link" v-model="link"></textarea>
                        <div class="additionalInfo">
                            <p class="desc descInfo">자신의 관심분야와 관련된 경력을 알 수 있도록, 간략한 소개 및 링크를 부탁드려요</p>
                        </div>
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
            memberId: this.$store.state.user.userInfo.id,
            email: this.$store.state.user.userInfo.email,
            memberName: this.$store.state.user.userInfo.memberName,
            nickname: this.$store.state.user.userInfo.nickname,
            interests: this.$store.state.user.userInfo.interests,
            link: this.$store.state.user.userInfo.link,

            selectLength: 3,
            selectList: [
                {name : '프로그래밍', value : 'IT'},
                {name : '음악', value : 'MUSIC'},
                {name : '인생상담', value : 'LIFE'},
                {name : '취업', value : 'EMPLOYMENT'},
                {name : '미술', value : 'ART'},
            ],
            selectedList: this.$store.state.user.userInfo.interests,
        }
    },
    methods: {
        excludeSelectedItem(itemName) {
            if(this.selectedList.includes(itemName))
                return true;

            return false;
        },
        submitProfile() {
            var interestList = [];
            for(var i = 0; i < this.selectedList.length; i++) {
                for(var k = 0; k < this.selectList.length; k++) {
                    if(this.selectList[k].name == this.selectedList[i]) {
                        interestList.push(this.selectList[k].value);
                    }
                }
            }
            
            var data = {
                memberId: this.memberId,
                email: this.email,
                memberName: this.memberName,
                nickname: this.nickname,
                interests: interestList,
                link: this.link,
            }
            axios.post('/member-service/api/members/profile', data)
            .then(res => {
                alert("프로필 정보가 변경되었습니다.");
                this.$store.dispatch('user/update', res.data.memberInfo, {root: true});
                this.$router.push('/profile/' + this.email);
            }).catch(err => {
                console.log(err);
            });
        }
    }
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
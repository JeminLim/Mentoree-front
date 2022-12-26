<template>
    <div>
        <div class="container-fluid px-4">
            <h1 class="mt-4">{{programInfo.title}}</h1>
            <ol class="breadcrumb mb-4">
                <li class="breadcrumb-item active">프로그램 상세 페이지</li>
            </ol>
            <div class="row">
                <div class="col-xl-12 col-md-12">
                    <div class="card bg-white text-dark mb-4">
                        <div class="card-header d-flex">
                            <div class="col-md-11 pt-1">
                                <span><font-awesome-icon :icon="['fas','clone']" class="mx-3" />
                                상세정보</span>
                            </div>
                            <div class="col-md-1">
                                <router-link v-if="isHost" id="manageBtn" class="btn btn-warning btn-sm" :to="'/program/' + programInfo.id + '/participant'" >신청자관리</router-link>
                                <button v-if="!this.isParticipated" id="applyBtn" class="btn btn-primary btn-sm" @click="$bvModal.show('participate-modal')">참가신청</button>
                            </div>
                        </div>
                        <div sclass="card-body program-info-body">
                            <table class="w-100">
                                <tbody>
                                    <tr>
                                        <td class="bold" width="20%">제목</td>
                                        <td width="80%">{{programInfo.programName}}</td>
                                    </tr>
                                    <tr>
                                        <td class="bold" width="20%">카테고리</td>
                                        <td width="80%">{{programInfo.category}}</td>
                                    </tr>
                                    <tr>
                                        <td class="bold" width="20%">모집기간</td>
                                        <td width="80%">{{programInfo.dueDate}}까지</td>
                                    </tr>
                                    <tr>
                                        <td class="bold" width="20%">모집인원</td>
                                        <td width="80%">{{programInfo.maxMember}}명</td>
                                    </tr>
                                    <tr>
                                        <td class="bold" width="20%">현재멘토</td>
                                        <td width="80%">
                                            <a v-for="(mentor, index) in programInfo.mentorList" v-bind:key="index" href="#" @click="moveToProfile(mentor.memberId)">{{mentor.username}}</a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="bold" colspan="2" width="100%">프로그램 설명</td>
                                    </tr>
                                    <tr>
                                        <td colspan="2" >
                                            <div class="content-padding">
                                                <Viewer class="content-viewer" ref="viewer" />
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 참가 modal -->
        <b-modal id="participate-modal" ref="participate-modal" hide-footer title="참가 신청">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="col-md-12 d-flex">
                        <div class="col-md-10">
                            <label>가입 신청 메시지</label>
                        </div>
                        <div class="col-md-2 mx-4">
                            <label>역할</label>
                        </div>
                    </div>
                    <form id="applyForm" method="post" v-on:submit.prevent="applyProgram">
                        <div class="col-md-12 d-flex">
                            <div class="col-md-10">
                                <input class="my-4" style="width: 100%;" type="text" name="message" ref="message" placeholder="가입신청 메시지를 입력해주세요"/>
                            </div>
                            <div class="col-md-2">
                                <select class="mt-4 mx-4" ref="role" name="role">
                                    <option value="MENTOR">멘토</option>
                                    <option value="MENTEE">멘티</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-12" style="text-align: right;">
                            <button id="formSendBtn" type="submit" class="btn btn-primary">신청하기</button>
                        </div>
                    </form>
                </div>
            </div>
        </b-modal>
    </div>
    
</template>

<script>
import axios from '@/service/axios.js';
import Viewer from '@/components/main/Viewer.vue';

export default {
    name: 'ProgramInfo',
    components: {
        Viewer,
    },
    data() {
        return {
            program: {},
            isHost: false,
            isParticipated: false,
        }
    },
    methods: {
        moveToProfile(id) {
            this.$router.push('/profile/' + id);
        },
        applyProgram() {
            var data = {
                programId: this.program.id,
                message: this.$refs.message.value,
                role: this.$refs.role.value,
            }

            axios.post('/api/programs/apply', data)
            .then(res => {
                if(res.data.result == 'success') {
                    alert("신청 완료되었습니다.");
                    this.$refs['message'].value = '';
                    this.$refs['participate-modal'].hide();
                }
            }).catch(err => {
                if(err.response.data.code === 'D001') {
                    alert(err.response.data.message);
                }
            })
        }
    },
    computed: {
        programInfo() {
            return this.program;
        }
    },
    async beforeMount() {
        var programId = this.$route.params.programId;
        const response = await axios.get('/api/programs/' + programId);
        this.program = response.data.program;
        this.$refs.viewer.setContent(response.data.program.description);

        const asMentor = this.$store.state.user.userInfo.mentor;
        const asMentee = this.$store.state.user.userInfo.mentee;
        
        const loginId = this.$store.state.user.userInfo.id;

        const findMentor = asMentor.filter(m => m.memberId == loginId && m.programId == programId);
        const findMentee = asMentee.filter(m => m.memberId == loginId && m.programId == programId);

        if(findMentor.length > 0) {
            this.isHost = findMentor[0].host;
            this.isParticipated = true;
        }

        if(findMentee.length > 0) {
            this.isParticipated = true;
        }

    }
}
</script>

<style scoped>
.program-info-body {
    margin-left: 15%; 
    margin-right: 15%
}

.bold {
    font-weight: bold;
}

table {
    border-collapse: separate;
    border-spacing: 0 10px;
}

.content-padding{
    border: 3px solid rgba(46, 46, 46, 0.652);
    border-radius: 20px;
    margin-left: 10%;
    margin-right: 10%;
}

.content-viewer{
    padding: 1% 3%;
}
</style>
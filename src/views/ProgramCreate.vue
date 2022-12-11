<template>
    <div class="container-fluid px-4">
        <h1 class="mt-4">프로그램 만들기</h1>
        <div class="row">
            <div class="col-xl-12 col-md-12">
                <div class="card bg-white text-dark mb-4">
                    <div class="card-header">
                        <span><font-awesome-icon :icon="['fas','clone']" class="mx-3" />
                        프로그램 신청서</span>
                    </div>
                    <div class="card-body">
                        <form action="#" method="post" v-on:submit.prevent="submitForm" >
                            <div class="row mb-3">
                                <div class="col-md-6">
                                    <div class="form-floating mb-3 mb-md-0">
                                        <input class="form-control" id="inputTitle" name="title" ref="title" type="text" placeholder="프로그램 제목" />
                                        <label for="inputTitle">프로그램 제목</label>
                                    </div>
                                </div>
                                <div class="col-md-1 my-auto">
                                    <div class="d-flex">
                                        <label for="inputMentor"> 멘토여부</label>
                                        <b-form-checkbox class="mx-1" id="inputMentor" value="true" unchecked-value="false" ref="mentor"/>
                                    </div>
                                </div>
                                <div class="col-md-5">
                                    <label class="pos-relative" for="inputCategory"> 카테고리/분류 </label>
                                    <div id="inputCategory" class="form-floating mt-1 mb-3 mb-md-0">
                                        <input type="radio" v-model="radioValue" value="IT" /> IT/Programming
                                        <input type="radio" v-model="radioValue" value="MUSIC" /> 음악
                                        <input type="radio" v-model="radioValue" value="LIFE" /> 인생상담
                                        <input type="radio" v-model="radioValue" value="EMPLOYMENT" /> 취업
                                        <input type="radio" v-model="radioValue" value="ART" /> 미술
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-md-8">
                                    <div class="form-floating mb-3">
                                        <input class="form-control" id="inputGoal" name="goal" type="text" ref="goal" placeholder="프로그램 목표" />
                                        <label for="inputGoal">프로그램 목표</label>
                                    </div>
                                </div>
                                <div class="col-md-2">
                                    <div class="form-floating mb-3 mb-md-0">
                                        <input class="form-control" id="inputMaxMember" name="maxMember" ref="maxMember" type="number" placeholder="목표인원" min="1" max="5"/>
                                        <label for="inputMaxMember">목표인원</label>
                                    </div>
                                </div>
                                <div class="col-md-2">
                                    <div class="form-floating mb-3 mb-md-0">
                                        <b-form-datepicker id="inputDueDate" class="form-control" ref="dueDate" v-model="datePick" />
                                        <label for="inputDueDate">마감기한</label>
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-md-12">
                                    <label for="inputDesc">프로그램 설명</label>
                                    <div class="form-floating mb-3">
                                        <textarea class="form-control description-area" id="inputDesc" name="description" ref="description"  type="textarea" placeholder="프로그램 설명"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-4 mb-0">
                                <div class="d-grid"><button id="submitBtn" class="btn btn-primary btn-block" type="submit">작성하기</button></div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '@/service/axios';
export default {
    name: 'ProgramCreate',
    data() {
        return {
            radioValue: '',
            datePick : '',
        }
    },
    methods: {
        submitForm() {
            var data = {
                title: this.$refs.title.value,
                description: this.$refs.description.value,
                goal: this.$refs.goal.value,
                maxMember: this.$refs.maxMember.value,
                category: this.radioValue,
                dueDate: this.datePick,
                memberId: this.$store.state.user.userInfo.id,
                memberNickname: this.$store.state.user.userInfo.nickname,
                mentor: this.$refs.mentor.value
            }

            axios.post('/mentoring-service/api/programs/new', data)
            .then(res => {
                var newProgram = {
                    programId : res.data.participatedProgram.id,
                    title: res.data.participatedProgram.title
                }
                this.$store.dispatch('user/addProgram', newProgram);
                alert("프로그램이 생성되었습니다.");
                this.$router.push('/');
            })
            .catch(err => {
                console.log(err);
            });
        }
    }
}
</script>

<style scoped>
.pos-relative{
    position: relative;
}

.align-middle {
    vertical-align: middle;
}

.description-area {
    width: 100%; 
    min-height: 500px; 
    overflow:scroll;
}
</style>
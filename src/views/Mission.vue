<template>
    <div class="container-fluid px-4">
        <h1 class="mt-4">{{getProgramTitle}}</h1>
        <ol class="breadcrumb mb-4">
            <li class="breadcrumb-item active">
                <span>현재 진행중인 미션 <router-link v-if="getIsMentor" class="btn btn-primary btn-sm mx-3" :to="'/program/' + programId + '/mission/create'"> 미션 생성</router-link></span>
            </li>
        </ol>
        <div class="row">
            <CurrentMission />
        </div>
        <ol class="breadcrumb mb-4 mx-3">
            <li class="breadcrumb-item active">과거 미션 목록</li>
        </ol>
        <div class="row">
            <PastMission />
        </div>
    </div>
</template>

<script>
import CurrentMission from '@/components/main/CurrentMission';
import PastMission from '@/components/main/PastMission'

export default {
    name: 'Mission',
    components: {
        CurrentMission,
        PastMission
    },
    data() {
        return {
            programId : this.$route.params.programId,
            programTitle : '',
            isMentor : false,
        }
    },
    computed: {
        getProgramTitle() {
            return this.programTitle;
        },
        getIsMentor() {
            return this.isMentor;
        }

    },
    beforeMount() {
        let programId = this.$route.params.programId;

        const asMentor = this.$store.state.user.userInfo.mentor;
        const asMentee = this.$store.state.user.userInfo.mentee;
        const findMentor = asMentor.filter(m => m.programId == programId);
        const findMentee = asMentee.filter(m => m.programId == programId);

        if(findMentor.length > 0) {
            this.isMentor = true;
            this.programTitle = findMentor[0].programName;
        }

        if(findMentee.length > 0) {
            this.programTitle = findMentor.programName;
        }
    }

}
</script>
<style scoped>
.bold{
    font-weight: bold;
}

.move-board {
    margin-left:60%; 
    color: #808080; 
    font-size: 0.8em;
}

</style>
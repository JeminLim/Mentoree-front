<template>
    <div class="container-fluid px-4">
        <h1 class="mt-4">수행 보드</h1>
        <ol class="breadcrumb mb-4">
            <li class="breadcrumb-item active">현재 미션</li>
        </ol>
        <div class="row">
            <div class="col-xl-12 col-md-12">
                <div class="card bg-white text-dark mb-4">
                    <div class="card-header d-flex">
                        <div class="col-md-11 padding-left">
                            <font-awesome-icon :icon="['fas', 'clone']" />
                            <span class="ml-2">{{mission.title}}</span>
                        </div>
                        <div class="col-md-1">
                            <router-link class="btn btn-primary btn-sm" :to="'/mission/' + mission.id + '/board/create'">미션 수행하기</router-link>
                        </div>
                    </div>
                    <div class="card-body">
                        <table class="w-100">
                            <tbody>
                                <tr>
                                    <td class="bold" width="20%">미션 내용</td>
                                </tr>
                                <tr>
                                    <td width="80%">
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
            <ol class="breadcrumb mb-4">
                <li class="breadcrumb-item active">수행 보드 리스트</li>
            </ol>
            <div class="row" v-if="boardList.length > 0">
                <a class="col-xl-3 col-md-3" href="#" v-for="board in boardList" v-bind:key="board.id" @click="goToBoardInfo(board.id)">
                    <div class="card mb-4 board-border">
                        <div class="card-header d-flex">
                            <div class="col-md-12"><font-awesome-icon :icon="['fas', 'clone']" class="mx-3"/>{{board.title}}</div>
                        </div>
                        <div class="card-body d-flex">
                            <div class="col-md-12">작성자 : {{board.writerNickname}}</div>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '@/service/axios';
import Viewer from '@/components/main/Viewer.vue';

export default {
    name: 'Board',
    components: {
        Viewer,
    },
    data() {
        return {
            mission: {},
            boardList: [],
        }
    },
    methods: {
        goToBoardInfo(boardId) {
            this.$router.push('/board/' + boardId);
        }
    },
    beforeMount() {
        let missionId = this.$route.params.missionId;
        axios.get('/api/missions/' + missionId)
        .then(res => {
            this.mission = res.data.mission;
            this.$refs.viewer.setContent(res.data.mission.content);
        }).catch(err => {
            console.log(err);
        });

        axios.get('/api/boards/list/' + missionId)
        .then(res => {
            this.boardList = res.data.boardList;
        }).catch(err => {
            console.log(err);
        });
    },
    computed: {

    }
}
</script>

<style scoped>
a {
    text-decoration: none;
    color: black;
}
a:hover {
    cursor: pointer;
    color: black;
}

.padding-left {
    padding-left: 8%;
}
.ml-2{
    margin-left: 1%;
}

.bold {
    font-weight: bold;
}

.content-brief {
    height: 100px; 
    overflow: hidden; 
    text-overflow: ellipsis; 
    white-space: nowrap;
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

.board-border{
    border-width: 1px 10px 10px 1px;
    border-radius: 20px;
}

.board-border:hover {
    border-color: rgba(187, 159, 159, 0.804);
    border-width: 1px 10px 10px 1px;
    border-radius: 20px;
}


</style>
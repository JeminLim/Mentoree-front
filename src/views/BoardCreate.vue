<template>
    <div class="container-fluid px-4">
        <h1 class="mt-4">게시글 작성</h1>
        <div class="row">
            <div class="col-xl-12 col-md-12">
                <div class="card bg-white text-dark mb-4">
                    <div class="card-header">
                        <span><font-awesome-icon :icon="['fas','clone']" class="mx-3" />
                        미션 수행 게시글</span>
                    </div>
                    <div class="card-body">
                        <form action="#" method="post" v-on:submit.prevent="submitForm" >
                            <div class="row mb-3">
                                <div class="col-md-10">
                                    <div class="form-floating mb-3 mb-md-0">
                                        <input class="form-control" id="title" v-model="title" type="text" name="title" placeholder="게시글 제목" />
                                        <label for="title">제목</label>
                                    </div>
                                </div>
                                <div class="col-md-2">
                                    <div class="form-floating mb-3">
                                        <input class="form-control" id="inputWriter" type="text" placeholder="작성자" name="writerNickname" :value="this.$store.state.user.userInfo.nickname" disabled/>
                                        <label for="inputWriter">작성자</label>
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-md-12">
                                    <Editor ref="editor" :boardId.sync="this.boardId"/>
                                </div>
                            </div>
                            <div class="mt-2 mb-0 float-right">
                                <button type="submit" class="btn btn-primary btn-block pull-right">작성하기</button>
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
import Editor from '@/components/main/Editor.vue';

export default {
    name: 'BoardCreate',
    components: {
        Editor,
    },
    data() {
        return {
            boardId: null,
            title : '',
            auto_delay: 60 * 1000,
            auto_func: null,
            temporal : true,
        }
    },
    methods: {
        submitForm() {
            var requestBody = {
                missionId : this.$route.params.missionId,
                title : this.title,
                description : this.$refs.editor.getContent(),
            }
            axios.post('/api/boards/create', requestBody)
            .then(() => {
                alert("작성 완료 되었습니다");
                this.$router.push('/mission/' + this.$route.params.missionId + '/board');              
            }).catch(err => {
                console.log(err);
            })
        },
        async tempSave() {
            var requestBody = {
                missionId : this.$route.params.missionId,
                title : this.title,
                description : this.$refs.editor.getContent(),
            }
            await axios.post('/api/boards/create/temp', requestBody)
            .then(res => {
                this.boardId = res.data.boardId;
            }).catch(err => {
                console.log(err);
            })
        },
        async loadTempBoard() {
            const missionId = this.$route.params.missionId;
            await axios.get('/api/boards/' + missionId + '/temp')
            .then(res => {
                if(res.data.writingBoard != null) {
                    this.boardId = res.data.writingBoard.id;
                    this.title = res.data.writingBoard.title;
                    this.$refs.editor.setContent(res.data.writingBoard.content);
                    this.temporal = res.data.writingBoard.temporal;
                } 
            }).catch(err => {
                console.log(err);
            });
        },
        auto_save() {
            this.tempSave();
            this.auto_func = setInterval(() => {
                this.tempSave();
            }, this.auto_delay);
        } 
    },
    async mounted() {
        await this.loadTempBoard();
        if(this.temporal) {
            await this.auto_save();
        }
    },
    beforeDestroy() {
        clearInterval(this.auto_func);
    }

}
</script>

<style scoped>
.height-enough {
    height: 500px;
}
.text-area {
    min-height: 500px;
    resize: none;
}
</style>
<template>
    <div>
        <div class="card">
            <div class="row">
                <form v-on:submit.prevent="submitReply" method="post">
                    <div id="comment-row" class="col-md-12">
                        <label class="mx-3 mt-3">댓글 작성</label>
                        <textarea class="mx-3 mt-3 reply-content" id="new-comment" name="content" ref="content" placeholder="내용을 입력해주세요"></textarea>
                    </div>
                    <div class="col-md-2">
                        <button class="btn btn-primary mx-3 my-2" type="submit">작성하기</button>
                    </div>
                </form>
            </div>
        </div>
        <div class="card my-3" v-for="reply in getReplyList" v-bind:key="reply.id">
            <span class="mx-3 mt-2 reply-date">{{reply.modifiedDate}}</span>
            <div class="row my-4">
                <div class="reply-writer col-md-2">
                    <span class="mx-3">{{reply.memberNickname}}</span>
                </div>
                <div class="col-md-10">
                    <span class="mx-3"> {{reply.content}}</span>
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
            replyList : [],
        }
    },
    methods: {
        submitReply() {
            let requestBody = {
                boardId: this.$route.params.boardId,
                content: this.$refs.content.value
            };

            axios.post('/api/replies/create', requestBody)
            .then(res => {
                this.replyList.push(res.data.reply);
                alert("댓글 등록이 완료되었습니다.");
                this.$refs.content.value = '';
            }).catch(err => {
                console.log(err);
            });
        },
    },
    computed: {
        getReplyList() {
            return this.replyList;
        }
    },
    created() {
        const boardId = this.$route.params.boardId
        axios.get('/api/replies/list/' + boardId)
        .then(res => {
            this.replyList = res.data.replyList;
        }).catch(err => {
            console.log(err);
        });
    }
}
</script>

<style scoped>
.reply-content {
    width: 95%; 
    overflow: scroll;
}

.reply-writer {
    border-right: 2px solid rgb(93, 93, 93);
}
</style>
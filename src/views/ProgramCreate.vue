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
                        <div class="row mb-3">
                            <div class="col-md-12">
                                <div class="form-floating mb-3 mb-md-0">
                                    <input class="form-control" id="inputTitle" name="title" ref="title" type="text" placeholder="프로그램 제목" />
                                    <label for="inputTitle">프로그램 제목</label>
                                </div>
                            </div>
                            
                        </div>
                        <div class="row mb-3">
                            <div class="col-md-3 input-price">
                                <label for="inputPrice">가격</label>
                                <input class="form-control" id="price" name="price" ref="price" type="number" placeholder="가격" min="0"/>
                            </div>
                            <div class="col-md-4">
                                <label class="pos-relative" for="inputCategory"> 카테고리/분류 </label>
                                <div class="wrap-category d-flex">
                                    <multiselect 
                                        class="category-item"
                                        v-model="firstSelected" 
                                        :options="getFirstCategory" 
                                        :multiple="false"
                                        :close-on-select="false" 
                                        :preserve-search="true"
                                        placeholder="Pick 1st category"
                                        label="categoryName" 
                                        track-by="categoryName"  
                                        :preselect-first="true" >
                                    </multiselect>
                                    <multiselect 
                                        class="category-item"
                                        v-model="secondSelected" 
                                        :options="getSecondCategory" 
                                        :multiple="false"
                                        :close-on-select="false" 
                                        :preserve-search="true"
                                        placeholder="Pick 2nd category"
                                        label="categoryName" 
                                        track-by="categoryName" 
                                        :preselect-first="true">
                                    </multiselect>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="form-floating mb-3 mb-md-0">
                                    <input class="form-control" id="inputMaxMember" name="maxMember" ref="maxMember" type="number" placeholder="목표인원" min="1" max="5"/>
                                    <label for="inputMaxMember">목표인원</label>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-floating mb-3 mb-md-0">
                                    <b-form-datepicker id="inputDueDate" class="form-control" ref="dueDate" v-model="datePick" :min="min_day"/>
                                    <label for="inputDueDate">마감기한</label>
                                </div>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-md-12">
                                <label for="inputDesc">프로그램 설명</label>
                                <div class="form-floating mb-3">
                                    <Editor ref="editor" />
                                </div>
                            </div>
                        </div>
                        <div class="mt-4 mb-0">
                            <div class="d-grid">
                                <button id="submitBtn" class="btn btn-primary btn-block" v-on:click="submitForm()">작성하기</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '@/service/axios';
import Multiselect from 'vue-multiselect';
import Editor from '@/components/main/Editor.vue';

export default {
    name: 'ProgramCreate',
    components: {
        Editor,
        Multiselect,
    },
    data() {
        return {
            firstSelectList: [],
            firstSelected: '',
            secondSelectList: [],
            secondSelected: '',
            datePick : '',
            price: 0,

            min_day: new Date(),
        }
    },
    methods: {
        submitForm() {
            var requestBody = {
                programName: this.$refs.title.value,
                price: this.$refs.price.value,
                description : this.$refs.editor.getContent(),
                categoryName: this.secondSelected.categoryName,
                maxMember: this.$refs.maxMember.value,
                dueDate: this.datePick,
            };
            
            axios.post('/api/programs/create', requestBody)
            .then(res => {
                this.$store.dispatch('user/addMentor', res.data.mentor);
                alert("프로그램이 생성되었습니다.");
                this.$router.push('/');
            })
            .catch(err => {
                console.log(err);
            });
        },
        getCategoryList() {
            axios.get('/api/programs/categories')
            .then(res => {
                this.firstSelectList = res.data.firstCategories;
                this.secondSelectList = res.data.secondCategories;
            }).catch(
                err => {console.log(err);}
            );
        },
    },
    computed: {
        getFirstCategory() {
            return this.firstSelectList;
        },
        getSecondCategory() {
            if(this.firstSelected == '') {
                return [];
            }
            else {
                return this.secondSelectList.filter(c => c.parentCategory == this.firstSelected.categoryName);
            }
        },
    },
    beforeMount() {
        this.getCategoryList();
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
.category-item{
    margin-left: 2%;
    width: 50%;
}

.wrap-category{
    justify-content: center;
}

.description-area {
    width: 100%; 
    min-height: 500px; 
    overflow:scroll;
}
.input-price {
    margin-top: 0.5%;
}

#inputMaxMember {
    margin-top: 3%;
}
</style>
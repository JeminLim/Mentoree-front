<template>
    <div>
        <div class="section-title">
            <div class="title">전체 프로그램</div>
        </div>
        <hr />
        <div class="catFilter d-flex">
            <span class="filter-icon"><font-awesome-icon :icon="['fas', 'filter']"/></span>
            <multiselect 
                class="selectBox"
                v-model="firstSelected" 
                :options="getFirstCategory" 
                :multiple="false"
                :close-on-select="false" 
                :preserve-search="true"
                placeholder="Pick 1st category"
                label="categoryName" 
                track-by="categoryName"  
                :preselect-first="true" 
                @input="initProgram"
                >
            </multiselect>
            <multiselect 
                class="selectBox"
                v-model="secondSelected" 
                :options="getSecondCategory" 
                :multiple="true" 
                :close-on-select="false" 
                :preserve-search="true"
                placeholder="Select 1st category first"
                label="categoryName" 
                track-by="categoryName" 
                :preselect-first="true"
                @input="initProgram"
                >
            </multiselect>
        </div>
        <div class="row mt-3">
            <div class="col-xl-3 programCard" v-for="(program, index) in allProgramList" v-bind:key="program.id">
                <div class="card mb-4">
                    <div class="card-header">
                        <div class="d-flex">
                            <div class="col-md-8">
                                <span><font-awesome-icon :icon="['fas', 'clone']" class="mx-2" />프로그램 {{ index + 1}}</span>
                            </div>
                            <div class="col-md-4">
                                <a class="small text-dark stretched-link" href="#" @click="toProgramInfo(program.id)">자세히 보기</a>
                            </div>
                        </div>
                    </div>
                    <div class="card-body"> 
                        <table class="w-100">
                            <tbody>
                                <tr>
                                    <td class="bold" width="20%">제목</td>
                                    <td width="80%">{{program.programName}}</td>
                                </tr>
                                <tr>
                                    <td class="bold" width="20%">멘토</td>
                                    <td v-if="program.mentorList.length > 0" width="80%"> {{program.mentorList[0].username}} 외 {{program.mentorList.length - 1}} 명</td>
                                </tr>
                                <tr>
                                    <td class="bold" width="20%">인원</td>
                                    <td width="80%"> {{program.maxMember}}명</td>
                                </tr>
                                <tr>
                                    <td class="bold" width="20%">분류</td>
                                    <td width="80%"> {{program.category}}</td>
                                </tr>
                                <tr>
                                    <td class="bold" width="20%">모집기간</td>
                                    <td width="80%"> {{program.dueDate}} 까지</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 text-center">
                <button v-if="hasNext" class="btn btn-primary" @click="loadPrograms()">&plus; 더보기</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '@/service/axios.js';
import Multiselect from 'vue-multiselect';

export default {
    name: 'ProgramList',
    components: {
        Multiselect,
    },
    data() {
        return {
            //page info
            maxId: 0,
            minId: 0,
            firstSelected: '',
            secondSelected: [],

            //category info
            firstSelectList: [],
            secondSelectList: [],

            //program list
            hasNext: false,
            programs: [],
        }
    },
    methods : {
        loadPrograms() {
            const firstVal = this.firstSelected == '' ? '' : this.firstSelected.categoryName;
            const secondVal = this.secondSelected == [] ? [] : this.secondSelected.map((category) => {
                return category.categoryName;
            }).join(",");

            var min = this.programs.map(p => p.id).reduce( function (prev, cur) { return prev > cur ? cur : prev;});
            var max = this.programs.map(p => p.id).reduce( function (prev, cur) { return prev > cur ? prev : cur;});
            
            const params = {
                maxId: max,
                minId: min,
                first: firstVal,
                second: secondVal
            }
            this.programRequest(params);
        },
        async initProgram() {
            this.programs = [];
            const firstVal = this.firstSelected == '' ? '' : this.firstSelected.categoryName;
            var joiningResult = this.secondSelected.map((category) => {
                return category.categoryName;
            }).join(",");
            
            const params = {
                maxId: 0,
                minId: 0,
                first: firstVal,
                second: joiningResult
            }

            this.programRequest(params);
        },
        toProgramInfo(programId) {
            this.$router.push('/program/' + programId + '/info')
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
        async programRequest(requestParam) {
            axios.get('/api/programs/list',  { params: requestParam})
            .then(res => {
                if(res.data.programList != null ) {
                    this.hasNext = res.data.next;

                    for(var i = 0; i < res.data.programList.length; i++) {
                        this.programs.push(res.data.programList[i]);
                        if(this.maxId < res.data.programList[i].id) {
                            this.maxId = res.data.programList[i].id;
                        }

                        if(this.minId > res.data.programList[i].id || this.minId == 0) {
                            this.minId = res.data.programList[i].id;
                        }
                    }
                }
            }).catch(err => {
                console.log(err);
            })
        }
    },
    computed: {
        allProgramList() {
            return this.programs;
        },
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
        }
    },
    beforeMount() {
        this.initProgram();
        this.getCategoryList();
    },

}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
.section-title{
    margin: 1%;
    text-align: left;
}
.title {
    margin-bottom: 2%;
}
.selectBox{
    margin-left: 1%;
    width: 25%;
}
.catFilter {
    width: 100%;
    text-align: right;
    margin-left: 3%;
    font-size: 20px;
}
.filter-icon{
    padding-top: 10px;
}
.bold {
    font-weight: bold;
}

.category-item {
    margin-left: 2%;
    width: 150px;
    border: 1px solid #C4C4C4;
    box-sizing: border-box;
    border-radius: 10px;
    padding: 12px 13px;
    font-family: sans-serif;
    font-style: bold;
    font-weight: 600;
    font-size: 14px;
    line-height: 16px;
}
</style>
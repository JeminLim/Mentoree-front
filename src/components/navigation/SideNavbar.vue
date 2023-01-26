<template>
  <div>
    <b-button v-b-toggle.sidebar-1><font-awesome-icon :icon="['fas', 'bars']" /></b-button>
    <b-sidebar id="sidebar-1" title="MENTOREE" shadow>
        <div class="container-fluid">
            <div class="row">
                <h6 class="sidebar-head">Match</h6>
            </div>
            <div class="row">
                <span class="sidebar-item">
                    <font-awesome-icon :icon="['fas', 'search']" />
                    <router-link class="search-menu" :to="'/'">프로그램 찾기</router-link >
                </span>
            </div>
            <div class="row">
                <h6 class="sidebar-head">MY MENU</h6>
            </div>
            <div class="row">
                <a class="sidebar-item sidebar-collapse" v-b-toggle.collapseProgram href="#">
                    <font-awesome-icon :icon="['fas', 'columns']" class="collapse-icon" />내 프로그램<font-awesome-icon :icon="['fas', 'angle-down']" class="collapse-arrow" />
                </a>
                <b-collapse class="sidebar-item sidebar-collapse collapse-item" id="collapseProgram">
                    <div class="program-border">멘토 참여 프로그램</div>
                    <div v-for="program in getProgramAsMentor" v-bind:key="program.programId">
                        <hr>
                            <p class="collapse-item collapse-item-header">{{program.programName}}</p>
                            <router-link class="collapse-item nav-link" :to="'/program/' + program.programId + '/info'">프로그램 정보</router-link >
                            <router-link class="collapse-item nav-link" :to="'/program/' + program.programId + '/mission'">미션</router-link>
                        <hr>
                    </div>
                    <div class="program-border">멘티 참여 프로그램</div>
                    <div v-for="program in getProgramAsMentee" v-bind:key="program.programId">
                        <hr>
                            <p class="collapse-item collapse-item-header">{{program.programName}}</p>
                            <router-link class="collapse-item nav-link" :to="'/program/' + program.programId + '/info'">프로그램 정보</router-link >
                            <router-link class="collapse-item nav-link" :to="'/program/' + program.programId + '/mission'">미션</router-link>
                        <hr>
                    </div>
                </b-collapse>
            </div>
            
        </div>
    </b-sidebar>
  </div>
</template>

<script>
export default {
    computed: {
        getProgramAsMentor() {
            return this.$store.state.user.userInfo.mentor;
        },
        getProgramAsMentee() {
            return this.$store.state.user.userInfo.mentee;
        }
    }
}
</script>

<style scoped>
.sidebar-head {
    margin-top: 10%;
    text-align: left;
}

.sidebar-item {
    padding-left: 10%;
    margin-top: 5%;
    text-align: left;
}

.sidebar-collapse{
    text-align: left;
    text-decoration: none;
    color: black;
}

.collapse-icon, .collapse-arrow {
    margin-right: 5%;
}

.collapse-arrow {
    float: right;
}

.collapse-item {
    padding-left: 15%;
}

.collapse-item-header {
    margin-top: 3%;
    padding: 0;
}

.nav-link {
    margin-left: 5%;
    text-decoration: none;
}

.search-menu{
    margin-left: 3%;
    text-decoration: none;
    color: black;
}

.program-border{
    display: flex;
    flex-basis: 100%;
    align-items: center;
    color: rgb(0, 0, 0);
    font-size: 14px;
    margin: 8px 0px;
}

.program-border::before {
    content: "";
    flex-grow: 1;
    margin: 0px 16px;
    background: rgb(0, 0, 0);
    height: 1px;
    font-size: 0;
    line-height: 0px;
}

.program-border::after {
    content: "";
    flex-grow: 1;
    margin: 0px 16px;
    background: rgba(0, 0, 0);
    height: 1px;
    font-size: 0;
    line-height: 0px;
}

</style>
<template>
  <div class="home">
    <div class="container-fluid px-4">
      <div class="d-flex">
        <div class="col-xl-11 col-md-11">
          <h1 class="mt-4">프로그램 리스트</h1>
        </div>
        <div class="col-x1-1 col-md-1">
          <router-link class="btn btn-primary mt-4" to="/program/create">프로그램 생성</router-link>
        </div>
      </div>
      <div class="row">
        <ProgramList />
      </div>
    </div>
  </div>
</template>

<script>
import ProgramList from '@/components/main/ProgramList';

export default {
  name: 'Home',
  components: {
    ProgramList   
  }
}
</script>


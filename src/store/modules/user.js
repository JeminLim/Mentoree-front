const user = {
    namespaced: true,
    state: {
        userInfo: { 
                id: '',
                email: '',
                nickname: '',
                memberName: '',
                link: '',
                interests: [],
                participatedPrograms: [],
            },
        isLogin: false
    },
    mutations: {
        loginUser(state, payload) {
            state.userInfo.id = payload.id;
            state.userInfo.email = payload.email;
            state.userInfo.nickname = payload.nickname;
            state.userInfo.memberName = payload.memberName;
            state.userInfo.link = payload.link;
            if(payload.interests != null) state.userInfo.interests = payload.interests;
            state.userInfo.participatedPrograms = payload.participatedPrograms;
            state.isLogin = true;
        },
        addProgram(state, payload) {
            state.userInfo.participatedPrograms.push(payload);
        },
        logout(state) {
            state.userInfo.id  = '';
            state.userInfo.email = '';
            state.userInfo.nickname = '';
            state.userInfo.memberName = '';
            state.userInfo.link = '';
            state.userInfo.interests = [];
            state.userInfo.participatedPrograms = [];
            state.isLogin = false;
        },
        update(state, payload) {
            state.userInfo.nickname = payload.nickname;
            state.userInfo.link = payload.link;
            state.userInfo.interests = payload.interests;
            state.userInfo.memberName = payload.memberName;
        }
    },
    actions: {
        loginUser: ({commit}, params) => {
            commit('loginUser', params);
         },
         addProgram: ({commit}, params) => {
            commit('addProgram', params);
         },
         logout: ({commit}) => {
            commit('logout');
         },
         update: ({commit}, params) => {
            commit('update', params);
         }
    },
    getters: {
        GET_LOGIN_USER: function(state) {
            return state.userInfo.email;
        },
        GET_PARTICIPATE_PROGRAM: function(state) {
            return state.userInfo.participatedPrograms;
        }
    }
}

export default user;
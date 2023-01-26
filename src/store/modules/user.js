const user = {
    namespaced: true,
    state: {
        userInfo: { 
                id: '',
                email: '',
                nickname: '',
                username: '',
                history: [],
                mentor: [],
                mentee: [],
            },
        accessToken: null,
        isLogin: false
    },
    mutations: {
        loginUser(state, payload) {
            state.userInfo.id = payload.id;
            state.userInfo.email = payload.email;
            state.userInfo.nickname = payload.nickname;
            state.userInfo.username = payload.username;
            state.userInfo.history = payload.history;
            state.userInfo.mentor = payload.mentor;
            state.userInfo.mentee = payload.mentee;
            state.accessToken = payload.accessToken;
            state.isLogin = true;
        },
        addMentor(state, payload) {
            state.userInfo.mentor.push(payload);
        },
        addMentee(state, payload) {
            state.userInfo.mentee.push(payload);
        },
        logout(state) {
            state.userInfo.id  = '';
            state.userInfo.email = '';
            state.userInfo.nickname = '';
            state.userInfo.username = '';
            state.userInfo.history = [];
            state.userInfo.mentor = [];
            state.userInfo.mentee = [];
            state.isLogin = false;
        },
        update(state, payload) {
            state.userInfo.nickname = payload.nickname;
            state.userInfo.username = payload.username;
            state.userInfo.history = payload.histories;
        },
        reissue(state, payload) {
            state.accessToken = payload;
        }
    },
    actions: {
        loginUser: ({commit}, params) => {
            commit('loginUser', params);
         },
         addMentor: ({commit}, params) => {
            commit('addMentor', params);
         },
         addMentee: ({commit}, params) => {
            commit('addMentee', params);
         },
         logout: ({commit}) => {
            commit('logout');
         },
         update: ({commit}, params) => {
            commit('update', params);
         },
         reissue: ({commit}, params) => {
            commit('reissue', params);
         }
    },
    getters: {
        GET_LOGIN_USER: function(state) {
            return state.userInfo.email;
        },
        GET_PARTICIPATE_MENTOR: function(state) {
            return state.userInfo.mentor;
        },
        GET_PARTICIPATE_MENTEE: function(state) {
            return state.userInfo.mentee;
        }
    }
}

export default user;
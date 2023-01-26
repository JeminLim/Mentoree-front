import axios from "axios";
import store from '@/store/index';

const instance = axios.create({
    timeout: 30000
})

// request interceptor
instance.interceptors.request.use(async function (config) {
        //setting for header
        config.headers['Content-Type'] = 'application/json; charset=UTF-8';
        config.headers['Authorization'] = 'Bearer ' + store.state.user.accessToken;
        return config;

    }, function(error) {
        console.log('axios request error: ', error);
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    function(response) {
        try {
            return response;
        } catch(error) {
            console.error('[axios.interceptors.response] response : ', error.message);
        }
    }, function(error) {
        const config = error.config;
        if(error.response.data.code.startsWith('U')) {
            // 권한 없음 -> 이전 페이지로 이동
            if(error.response.data.code == 'U003') {
                alert("프로그램 참가자가 아닙니다.");
                history.go(-1);
            }
            //재발급 요청
            else if(error.response.data.code == 'U004') {
                axios.post('/api/reissue', {
                    headers: {'Authorization' : 'Bearer ' + store.state.user.accessToken}
                })
                .then(res => {
                    store.dispatch('user/reissue', res.data.accessToken);
                    config.headers['Authorization'] = 'Bearer ' + store.state.user.accessToken;
                    return axios.request(config);                  
                }).catch(error => {
                    console.log(error);
                });
            }
            else {
                store.dispatch('user/logout');
            }
        } 
        else {
            return Promise.reject(error);
        }
    }
)

export default instance;
import axios from 'axios';

let http = axios.create({
  baseURL: 'http://localhost:8080/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    'Authorization':'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAKg0OsOJorlb8GY3Qh2NCEcggs1D40LKLHI2iMHL+NJ4hLMFI3LqHyMcxiWTBjmfv/1w2Q+yJjhDtCLUE2UWXpcCAwEAAQ=='
  },
  transformRequest: [function (data) {
    let newData = '';
    for (let k in data) {
      // eslint-disable-next-line no-prototype-builtins
      if (data.hasOwnProperty(k) === true) {
        newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&';
      }
    }
    return newData;
  }]
});


var httpURL="http://127.0.0.1:9091";

function apiAxios(method, url, params, response) {
  http({
    method: method,
    url: httpURL+url,
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'GET' || method === 'DELETE' ? params : null,
  }).then(function (res) {
    response(res);
  }).catch(function (err) {
    response(err);
  })
}



export default {
  get: function (url, params, response) {
    return apiAxios('GET', url, params, response)
  },
  post: function (url, params, response) {
    return apiAxios('POST', url, params, response)
  },
  put: function (url, params, response) {
    return apiAxios('PUT', url, params, response)
  },
  delete: function (url, params, response) {
    return apiAxios('DELETE', url, params, response)
  }
}

import axios from "axios";
import qs from 'qs';

const header = {headers: {'Content-Type': 'application/x-www-form-urlencoded'}};
const post = (action, data, header) => {

    let url = "https://test.kelibbb.com";
    let param;
    if (data) {
        param = qs.stringify(data);
    }
    if (!header) {
        header = {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
    }
    return new Promise(resolve => {
        axios.post(`${url}${action}`, param, header).then(res => {
            resolve(res.data);
        });
    });
};

const get = (action, params) => {

    // let url = 'https://test.kelibbb.com/klkl_bh';
    let url = 'https://test.kelibbb.com';
    return new Promise(resolve =>
        axios.get(`${url}${action}`, {
                params
            }, header)
            .then(res => {
                resolve(res.data);
            })
    );
};

const jpost = (action, data, header) => {

    // let url = 'https://test.kelibbb.com/klkl_bh';
    let url = 'https://test.kelibbb.com';
    if (!header) {
        header = {headers: {'Content-Type': 'application/json'}}
    }
    return new Promise(resolve => {
        axios.post(`${url}${action}`, data, header).then(res => {
            resolve(res.data);
        });
    });
}

const jpost2 = (action, data, header) => {

  // let url = 'https://test.kelibbb.com/klkl_bh';
  let url = 'https://test.kelibbb.com';
  if (!header) {
    header = {headers: {'Content-Type': 'application/json'}}
  }
  return new Promise(resolve => {
    axios.post(`${url}${action}`, data, header).then(res => {
      resolve(res.data);
    });
  });
};

export {post, get, jpost,jpost2};


import axios from "axios";
import qs from 'qs';

const header = {headers: {'Content-Type': 'application/x-www-form-urlencoded'}};
const post = (action, data, header) => {

    let url = "https://kaka.kelibbb.com/klkl/merchants.php?";
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
    let url = 'https://api.kelibbb.com:3443';
    return new Promise(resolve =>
        axios
            .get(`${url}${action}`, {
                params
            }, header)
            .then(res => {
                resolve(res.data);
            })
    );
};

const jpost = (action, data, header) => {

    // let url = 'https://test.kelibbb.com/klkl_bh';
    let url = 'https://api.kelibbb.com:3443';
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
  let url = 'https://api.kelibbb.com:3443';
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


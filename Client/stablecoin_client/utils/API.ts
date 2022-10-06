import axios from 'axios';

/* 
get, post request 
send data to the server and get response
*/

const getData = async (url: string, dataName: string, reqData: string) => {
    try {
        const response = await axios.get(url, {
            params: {
                "address": reqData
            },
        });
        return response.data;
    }
    catch (err) {
        console.log(err);
    }
}

const postData = async (url: string, data: any) => {
    try {
        const response = await axios.post(url, data);
        return response.data;
    }
    catch (err) {
        console.log(err);
    }
}

export { getData, postData };
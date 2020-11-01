import axios from "axios";

// const serverUrl = 'http://localhost:7777/v1/quiz/';
const serverUrl = 'http://quizapi.webmonstr.com/v1/quiz/';



export class Request {

    async get(url: string) {
        let response = await axios.get(`${serverUrl}${url}`)
        return response.data;
    }

    async post(url: string, data: any) {
        let response = await axios.post(`${serverUrl}${url}`,data)
        return response.data;
    }
}
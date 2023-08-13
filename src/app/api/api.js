// require('dotenv').config()
import { getAuth } from "./auth";
export const baseUrl =  "https://dcloud.nayan.radr.in/"

export async function get(url, kwargs = {}, headers = {}) {
    const response = await fetch(url + "?" + new URLSearchParams(kwargs),
        {
            headers: {
                ...headers
            }
        }
    );
    if (response.status > 300)
        throw (response);
    else {
        console.log(response);
        return response.json();
    }
}

export async function post(url, kwargs, headers = {}) {
    const isFormdata = kwargs instanceof FormData;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            ...isFormdata ? {} : { "Content-Type": "application/json" },
            ...headers
        },
        body: isFormdata ? kwargs : JSON.stringify(kwargs)
    });
    if (response.status > 300) {
        throw (response);
    }
    else {

        console.log(response);
        return response.json();
    }
}


export class Model {

    baseurl;

    constructor(baseUrl) {
        this.baseurl = baseUrl;
    }


    get = async (id, kwargs = {}, auth = false) => {
        let headers = {};
        if (auth)
            headers = { "Authorization": `Bearer ${getAuth()}` };
        const data = await get(`${this.baseurl}${id}/`, kwargs, headers);
        return data;
    };

    post = async (kwargs = {}, auth = false) => {
        try {
            console.log(kwargs);
            const data = await post(`${this.baseurl}`, kwargs);
            return data;
        }
        catch (e) {
            console.log(e);
        }
    };

    filter = async (kwargs = {}, auth = false) => {
        try {
            let headers = {};
            if (auth)
                headers = { "Authorization": `Bearer ${getAuth()}` };
            const data = await get(`${this.baseurl}`, kwargs, headers);
            // console.log(data);
            const lst = data.results;
            return { results: lst, next: data.next };
        }
        catch (e) {
            throw e;
        }
    };


    action_general = async (path, kwargs = {}, auth = false) => {
        try {
            let headers = {};
            if (auth)
                headers = { "Authorization": `Bearer ${getAuth()}` };

            const data = await get(`${this.baseurl}${path}`, kwargs, headers);
            const lst = data.results.map((item) => new this.modelClass(item, this.baseurl));

            return { results: lst, next: data.next };
        }
        catch (e) {
            throw e;
        }
    };

    async create(kwargs) {
        console.log(kwargs);
        try {
            const headers = { "Authorization": `Bearer ${getAuth()}` };
            const data = await post(`${this.baseurl}`, kwargs, headers);
            return new this.modelClass(data, this.baseurl);
        }
        catch (e) {
            throw await e.json();
        }
    }

    async action_post(path, kwargs = {}) {
        try {
            const headers = { "Authorization": `Bearer ${getAuth()}` };
            const data = await post(`${this.baseurl}${path}`, kwargs, headers);
            return new this.modelClass(data, this.baseurl);
        }
        catch (e) {
            throw await e.json();
        }
    }

}


import axios from "axios";

export const BASE_URL = "https://dyn3.thecodingbuzz.com/";
export const IMG_URL = BASE_URL;

export const callApi = ({
    path,
    method = "GET",
    isForm,
    url = null,
    body = null,
    token = null,
}) => {

    let urlString = BASE_URL + path;


    let headers = {
        ...(isForm
            ? {}
            : {
                "Content-Type": "application/json",
                Accept: "application/json",
            }),
    };

    let options = {
        method,
        headers,
        url: urlString,
    };

    if (token) {
        headers["Authorization"] = "Bearer " + token;
    }

    if (body) {
        options.data = body;
    }

    if (url) {
        options.url = url;
    }

    return axios(options).then((res) => {
        if (res.status === 200) {
            return res.data;
        }
        return { status: res.status, ...res.data };
    }).catch((error) => {
        return { status: error.response?.status, ...error.response?.data };
    });
};

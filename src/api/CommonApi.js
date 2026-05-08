import axios from "axios";
import { BASE_URL, STATUS_CODE } from "./constants";
import { toast } from "react-toastify";

 
const METHOD = {
  GET: "get",
  POST: "post",
  PUT: "put",
  DELETE: "delete",
};
 
class API {
  constructor() {
    this.baseURL = BASE_URL;
  }
 
  async get(url, data) {
    return new Promise((resolve, reject) => {
      console.log('this is getAPI');
      this.api(METHOD.GET, url, data)     
        .then((response) => {
          resolve(response);
          
          console.log("this is response2",response)
        })
        .catch((error) => {
          toast.error("Something went wrong"); 
          console.log(error);
        });
    });

  }
 
  post(url, data) {
    return new Promise((resolve, reject) => {
      console.log('this is postAPI');
      this.api(METHOD.POST, url, data)
        .then((response) => {
           if(response.data){
            toast.success(" post request successfully");
            resolve(response);
          }
          else{
            toast.error("post Request Failed",);
          } 
        })
        .catch((error) => {
          toast.error("Something went wrong"); 
          console.log(error);
        });
    });
  }
  put(url, data) {
    return new Promise((resolve, reject) => {
      console.log('this is putAPI');
      this.api(METHOD.PUT, url, data)
        .then((response) => {
          toast.success(" update request successfully");
          resolve(response);
        })
        .catch((error) => {
          toast.error("Something went wrong"); 
          console.log(error);
        });
    });
  }
  delete(url, data) {
    return new Promise((resolve, reject) => {
      console.log('this is deleteAPI');
      this.api(METHOD.DELETE, url, data)
        .then((response) => {
          toast.success(" delete request successfully");
          resolve(response);
        })
        .catch((error) => {
          toast.error("Something went wrong"); 
          console.log(error);
        });
    });
  }
  api(method, url, data) {
    return new Promise(( resolve,reject) => {
      console.log('this is mainAPI function');
      let axiosConfig = {};
      axiosConfig.method = method;
      axiosConfig.url = this.baseURL + url;
      axiosConfig.headers = this.setHeaders(data);
      
      if (data) {
        if (data) axiosConfig.data = data;
      }
 
      axios(axiosConfig)
        .then((response) => {
          if (
            response &&
            response.status === STATUS_CODE.INTERNAL_SERVER_ERROR
          ) {
            toast.error("Something went wrong!!");
          } else {  
            resolve(response);
            console.log("this is response1")
            if (response) {
            }
            else if (response.status === 200) {
              toast.success(' response success')
                
            }
            else {
              toast.error("Something went wrong"); 
            }
          }
        })
        .catch((error) => {
          console.log("ERROR", error);
        });
    });
  }
  setHeaders(data) {
    let headers = {};
    console.log('this is headers');
    headers["accept-language"] = "en";
    headers["Content-Type"] = "application/json";
    headers["Accept"] = "application/json";
    headers["Authorization"] = localStorage.getItem("token");
    if (data) {
      if (data.isMultipart) {
        headers["Content-Type"] = "multipart/form-data";
      }
      if (data.headers) {
        for (var key in data.headers) {
          if (data.headers.hasOwnProperty(key)) {
            headers[key] = data.headers[key];
          }
        }
      }
    }
    return headers;
  }
}
export default API;




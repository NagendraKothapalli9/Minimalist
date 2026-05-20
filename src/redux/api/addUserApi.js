import API from "../../api/CommonApi";
const api = new API();
const endPoints = "USERS.json";

export const saveUserData = async (newUser) => {

    return new Promise(async (resolve, reject) => {
        try {
          console.log("this is post call in API---->");
          const response = await api.post(`${endPoints}`,newUser);

          console.log("post response", response);
          if (response && response.data) {
           
            resolve(response);
            console.log("response",response)
            return(response)
          } else {
            resolve([]); 
          }
        } catch (error) {
          console.error("Error in addUserData:", error); 
          reject(error);
        }
      });
    };
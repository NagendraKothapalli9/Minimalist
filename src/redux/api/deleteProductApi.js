import API from "../../api/CommonApi";
const api = new API();
const endPoints = "/products";

export const deleteProductApi = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
          console.log("this is delete call in API---->");
          const response = await api.delete(`${endPoints}/${id}.json`);

          console.log("delete response", response);
          if (response && response.data) {
            resolve(response);
            console.log("delete response",response)
            return(response)
          } else {
            resolve([]); 
          }
        } catch (error) {
          console.error("Error in deleteProductData:", error); 
          reject(error);
        }
      });
    };
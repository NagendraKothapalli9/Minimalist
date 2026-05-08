import API from "../../api/CommonApi";
const api = new API();
const endPoints = "products.json";

export const saveProductData = async (newProduct) => {

    return new Promise(async (resolve, reject) => {
        try {
          console.log("this is post call in API---->");
          const response = await api.post(`${endPoints}`,newProduct);

          console.log("post response", response);
          if (response && response.data) {
           
            resolve(response);
            console.log("response",response)
            return(response)
          } else {
            resolve([]); 
          }
        } catch (error) {
          console.error("Error in addProductData:", error); 
          reject(error);
        }
      });
    };
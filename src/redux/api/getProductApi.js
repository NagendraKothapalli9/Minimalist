import API from "../../api/CommonApi";
const api = new API();
const endPoints = "HomeProducts";
export const getProductData = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("this is get call in API---->", endPoints);
      const response = await api.get(`${endPoints}.json`);
      console.log("geted data", response);
      if (response && response.data) {
        const getedData = Object.keys(response.data).map(key => ({
          id: key,
          ...response.data[key]
        }));
        resolve(getedData);
        console.log("getedData",getedData)
        return(getedData)
      } else {
        resolve([]); 
      }
    } catch (error) {
      console.error("Error in getProductData:", error);
      reject(error);
    }
  });
};
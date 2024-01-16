import httpClient from "../axios";

export const getUsers = async () => {
      try {
    return await httpClient.get("/api/user/users");
    
  } catch (error) {
    console.log(error);
  }
};

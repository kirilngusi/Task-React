export const apiUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3001"
    : "somedeployerUrl";

export const LOCAL_STORAGE_TOKEN = "Access_Token";

export const LOCAL_STORAGE_ID_TOKEN = "Id_Token";

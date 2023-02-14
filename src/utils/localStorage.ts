import { LocalStorageOptions } from "../types/general";

export const setObject = async (key: LocalStorageOptions, payload: any) => {
  try {
    const tempUser = JSON.stringify(payload);
    await localStorage.setItem(key, tempUser);
  } catch (e) {
    // saving error
    console.log(e);
  }
};

export const getObject = async (key: LocalStorageOptions) => {
  try {
    const jsonValue = await localStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
    console.log(e);
  }
};

export const clearObject = async (key: LocalStorageOptions) => {
  try {
    await localStorage.removeItem(key);
  } catch (e) {
    console.log(e);
    // saving error
  }
};

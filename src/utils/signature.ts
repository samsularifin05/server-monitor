import CryptoJS from "crypto-js";

import { getItem } from "./localStroage";
import { IResponseLoginDto } from "../types/userdata";

export const { VITE_APP_SECRETKEY, VITE_APP_KEY, VITE_APP_BE_URL } = import.meta
  .env;
export const generateSignature = (timestampApp: string) => {
  const userData = getItem<IResponseLoginDto>("userdata");

  const signature = CryptoJS.SHA256(
    VITE_APP_KEY +
      VITE_APP_SECRETKEY +
      (userData?.access_token || "") +
      timestampApp
  ).toString();

  return signature;
};
export const generateSecret = () => {
  const seCret = CryptoJS.SHA256(VITE_APP_SECRETKEY).toString();

  return seCret;
};

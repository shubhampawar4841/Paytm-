
import { atom } from "recoil";

export const tokenAtom = atom({
  key: "tokenAtom",
  default: localStorage.getItem("token") || null, // Store as string, no JSON.parse
});


export const userAtom = atom({
  key: "userAtom",
  default: {
    firstname: "",
    lastname: "",
  },
});

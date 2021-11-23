import Cookie from "js-cookie";
export const getHeaders = () => {
  return { authorization: Cookie.get("jwt") };
};

import axios from "axios";

// ------- Setting for Axios -------
export function api() {
  //var user = localStorage.getItem("user");

  const api = axios.create({
    baseURL: "http://10.0.2.2:45455/api/studentplanner/",
    //withCredentials: true,
    // headers: {
    //   Authorization: !user ? null : 'Bearer ' + user.replace(/['"]+/g, '')
    // }
  });
  return api;
}
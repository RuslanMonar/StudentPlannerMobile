import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

export function api() {

  const api = axios.create({
    baseURL: "http://10.0.2.2:45455/api/studentplanner/",
    withCredentials: true,
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI5NTQyMTQ3ZS00MzUzLTRhMTctYTE3Mi0xNWIzNGM2MGY5YzAiLCJuYW1lIjoicnVzbGFuIiwiZW1haWwiOiJydXNsYW5AZ21haWwuY29tIiwibmJmIjoxNjgyODg1OTY1LCJleHAiOjE2ODM0OTA3NjUsImlhdCI6MTY4Mjg4NTk2NSwiYXVkIjoiU3R1ZGVudFBsYW5uZXItYXVkaWVuY2UifQ.o5oauynnaJNDXghHQp-RNvtoNVZxKbD0eAQGe57iX2Y' 
    }
  });
  return api;
}
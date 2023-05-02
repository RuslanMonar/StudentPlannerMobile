import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';

const getData = async () => await AsyncStorage.getItem('StudentPlannerToken');

export async function api() {
  const token = await getData();
  const api = axios.create({
    baseURL: "http://10.0.2.2:45455/api/studentplanner/",
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return api;
} 
import axios from "axios";
export const baseUrl = process.env.NEXT_PUBLIC_API_URL;

//  Axios import
const Axios = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
  },
});

// useSWR에서 Fetcher import
// 커스텀해서 사용할 시, Axios import
export const Fetcher = async (url) => await Axios.get(url).then((res) => res);
export default Axios;

/*
function App () {
  const { data, error } = useSWR('/api/data', Fetcher)
  ...
}
*/

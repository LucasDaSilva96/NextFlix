import axios from 'axios';
// This function is used to fetch data from the server
const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default fetcher;

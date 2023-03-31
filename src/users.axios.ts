import Axios from "axios";
const userQuery = Axios.create({
  baseURL: "https://randomuser.me/api",
});

export default userQuery;

import axios from "axios";

export default axios.create({
  baseURL:
    process.env.NODE_ENV !== "development"
      ? `/api`
      : `http://localhost:5000/api`,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

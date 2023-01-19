import axios from "axios";

let apiUrl;

const apiUrls = {
  production: "www.my-backend-api.railway.com/",
  development: "https://superhero-api-production.up.railway.app/api/superheroes/",
};

if (window.location.hostname === "localhost") {
  apiUrl = apiUrls.development;
} else {
  apiUrl = apiUrls.production;
}

const api = axios.create({
  baseURL: apiUrl,
});

export default api;
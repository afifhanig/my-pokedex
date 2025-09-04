import axios from "axios";
import { withExponentialRetry } from "../utils/axiosRetry";

export const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
  timeout: 8000,
});

withExponentialRetry(api, { retries: 3, baseDelayMs: 250 });

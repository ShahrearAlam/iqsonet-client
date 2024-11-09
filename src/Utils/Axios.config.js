import axios from "axios";
import { accessToken } from "./LocalStorage";

let URL;

switch (import.meta.env.VITE_APP_ENVIRONMENT) {
	case "DEVELOPMENT":
		URL = "http://localhost:8000/"
		break;

	case "PRODUCTION":
		URL = "http://production-url/"
		break;

	default:
		URL = "http://localhost:8000/"

}

export const instance = axios.create({
	baseURL: URL,
	headers: {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${accessToken()}`
	}
})

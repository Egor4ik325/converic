import { API_URL } from "../constants";

// Return promise for supported formats
export async function getSupportedFormats() {
    const response = await fetch(API_URL + 'convert/formats/', { headers: { 'content-type': 'application/json' } });
    const data = await response.json();
    return data;
}
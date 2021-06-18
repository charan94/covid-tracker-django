import { apiCall, API_URL } from "./api"

export const getGeneralStatsAPI = () => {
    const url = `${API_URL}/general-stats`;
    return apiCall(url);
}

export const getCountryStatsAPI = () => {
    const url = `${API_URL}/country-stats?limit=300&page=1`;
    return apiCall(url);
}
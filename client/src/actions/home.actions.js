import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCountryStatsAPI, getGeneralStatsAPI } from "../services/home.service";

export const loadGeneralStatsAction = createAsyncThunk(
    "home/loadgeneralstats",
    async () => {
        const response = await getGeneralStatsAPI();
        return response;
    }
)

export const loadCountryStatsAction = createAsyncThunk(
    "home/loadcountrystats",
    async () => {
        const response = await getCountryStatsAPI();
        return response;
    }
)
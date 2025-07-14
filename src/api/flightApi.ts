// flightApi.ts

import { useQuery } from "@tanstack/react-query";

// ========================
// SkyScrapper API Constants (from environment variables)
// ========================

const SKY_SCRAPPER_API_KEY = process.env.EXPO_PUBLIC_SKY_SCRAPPER_API_KEY;
const SKY_SCRAPPER_API_HOST = process.env.EXPO_PUBLIC_SKY_SCRAPPER_API_HOST;
const SKY_SCRAPPER_BASE_URL = process.env.EXPO_PUBLIC_SKY_SCRAPPER_BASE_URL;
const SKY_SCRAPPER_BASE_URL_V2 = process.env.EXPO_PUBLIC_SKY_SCRAPPER_BASE_URL_V2;

// ========================
// Live API Functions
// ========================

export async function fetchAutocomplete(query: string) {
  if (!query) return [];

  try {
    const response = await fetch(
      `${SKY_SCRAPPER_BASE_URL}/flights/searchAirport?query=${query}&locale=en-US`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": SKY_SCRAPPER_API_KEY!,
          "X-RapidAPI-Host": SKY_SCRAPPER_API_HOST!,
        },
      }
    );
    const data = await response.json();
    return data.data.map((item: any) => ({
      id: item.navigation.relevantFlightParams.skyId,
      name: item.presentation.title,
      code: item.navigation.relevantFlightParams.skyId,
      entityId: item.navigation.relevantFlightParams.entityId,
    }));
  } catch (e) {
    console.error("Autocomplete error:", e);
    // Fallback to mock data if API fails
    try {
      const airportsData = await import("../demoData/searchAirports.json");
      const airportList = airportsData.data || [];

      const filteredAirports = airportList.filter((item: any) => 
        item.presentation.title.toLowerCase().includes(query.toLowerCase()) ||
        item.presentation.suggestionTitle.toLowerCase().includes(query.toLowerCase()) ||
        item.skyId.toLowerCase().includes(query.toLowerCase())
      );

      return filteredAirports.map((item: any) => ({
        id: item.navigation.relevantFlightParams.skyId,
        name: item.presentation.title,
        code: item.navigation.relevantFlightParams.skyId,
        entityId: item.navigation.relevantFlightParams.entityId,
      }));
    } catch (mockError) {
      console.error("Mock data fallback error:", mockError);
      return [];
    }
  }
}

export async function fetchFlights(params: {
  originSkyId: string;
  destinationSkyId: string;
  originEntityId: string;
  destinationEntityId: string;
  date: string;
  returnDate?: string;
  cabinClass?: string;
  adults?: number;
  childrens?: number;
  infants?: number;
  sortBy?: string;
  currency?: string;
  market?: string;
  countryCode?: string;
}) {
  // Map params to API query
  const queryParams: Record<string, string> = {
    originSkyId: params.originSkyId,
    destinationSkyId: params.destinationSkyId,
    originEntityId: params.originEntityId,
    destinationEntityId: params.destinationEntityId,
    date: params.date,
    cabinClass: params.cabinClass || "economy",
    adults: String(params.adults || 1),
    sortBy: params.sortBy || "best",
  };

  // Add optional parameters
  if (params.returnDate) queryParams.returnDate = params.returnDate;
  if (params.childrens) queryParams.childrens = String(params.childrens);
  if (params.infants) queryParams.infants = String(params.infants);

  const query = new URLSearchParams(queryParams);
  const url = `${SKY_SCRAPPER_BASE_URL_V2}/flights/searchFlights?${query.toString()}`;

  try {
    console.log("Fetching live flight data from:", url);
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": SKY_SCRAPPER_API_KEY!,
        "X-RapidAPI-Host": SKY_SCRAPPER_API_HOST!,
      },
    });
    const data = await response.json();
    console.log("Live flight data response:", JSON.stringify(data, null, 2));
    return data.data?.itineraries || [];
  } catch (e) {
    console.error("Flight search error:", e);
    // Fallback to mock data if API fails
    try {
      const flightsData = await import("../demoData/searchFlights.json");
      const itineraries = flightsData.data?.itineraries || [];
      console.log("Using mock flight data fallback, params:", params);
      return itineraries;
    } catch (mockError) {
      console.error("Mock data fallback error:", mockError);
      return [];
    }
  }
}

export async function fetchFlightDetails(flightId: string) {
  try {
    // Note: SkyScrapper API doesn't offer a specific "flight details by ID" endpoint,
    // so we'll use the cached flight list approach or mock data
    const flightsData = await import("../demoData/searchFlights.json");
    const itineraries = flightsData.data?.itineraries || [];
    console.log("Using mock flight details data for ID:", flightId);
    return itineraries.find((it: any) => it.id === flightId) || null;
  } catch (e) {
    console.error("Flight details error:", e);
    return null;
  }
}

// ========================
// React Query Hooks
// ========================

export function useAutocomplete(query: string) {
  return useQuery({
    queryKey: ["autocomplete", query],
    queryFn: () => fetchAutocomplete(query),
    enabled: !!query,
    staleTime: 1000 * 60 * 10,
  });
}

export function useFlightSearch(params: {
  originSkyId: string;
  destinationSkyId: string;
  originEntityId: string;
  destinationEntityId: string;
  date: string;
  returnDate?: string;
  cabinClass?: string;
  adults?: number;
  childrens?: number;
  infants?: number;
  sortBy?: string;
  currency?: string;
  market?: string;
  countryCode?: string;
}) {
  console.log("=====>in useFlightSearch",params);
  return useQuery({
    queryKey: ["flights", params],
    queryFn: () => fetchFlights(params),
    //enabled: !!params.from && !!params.to && !!params.departDate,
  });
}

export function useFlightDetails(flightId: string) {
  return useQuery({
    queryKey: ["flightDetails", flightId],
    queryFn: () => fetchFlightDetails(flightId),
    enabled: !!flightId,
  });
}

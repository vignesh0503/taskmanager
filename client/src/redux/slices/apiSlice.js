import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URI = import.meta.env.VITE_APP_BASE_URL;

const baseQuery = fetchBaseQuery({
  baseUrl: `${API_URI}/api`,
  credentials: "include", // Sends cookies automatically
  prepareHeaders: (headers) => {
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: [],
  endpoints: (builder) => ({}),
});

// >>>>>>>>>>>>>

// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const API_URI = import.meta.env.VITE_APP_BASE_URL;

// const baseQuery = fetchBaseQuery({
//   baseUrl: `${API_URI}/api`,
//   credentials: "include", // ✅ This sends the cookies
//   prepareHeaders: (headers) => {
//     // ✅ We don't need token from localStorage anymore
//     // ✅ The token will come from the HTTPOnly Cookie
//     headers.set("Content-Type", "application/json");
//     return headers;
//   },
// });

// export const apiSlice = createApi({
//   baseQuery,
//   tagTypes: [],
//   endpoints: (builder) => ({}),
// });

// >>>>>>>>>>>>

// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const API_URI = import.meta.env.VITE_APP_BASE_URL;

// const baseQuery = fetchBaseQuery({
//   baseUrl: `${API_URI}/api`,
//   credentials: "include", // ✅ This sends the HTTPOnly cookie with each request
//   prepareHeaders: (headers) => {
//     headers.set("Content-Type", "application/json");
//     return headers;
//   },
// });

// export const apiSlice = createApi({
//   baseQuery,
//   tagTypes: [],
//   endpoints: (builder) => ({}),
// });

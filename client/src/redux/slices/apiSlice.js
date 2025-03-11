// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// // const API_URI = "http://localhost:8000/api";
// const API_URI = import.meta.env.VITE_APP_BASE_URL;

// const baseQuery = fetchBaseQuery({
//   baseUrl: API_URI + "/api",
//   credentials: "include",
//   prepareHeaders: (headers) => {
//     const token = localStorage.getItem("token");

//     if (token) {
//       headers.set("Authorization", `Bearer ${token}`);
//     }

//     return headers;
//   },
// });

// export const apiSlice = createApi({
//   baseQuery,
//   tagTypes: [],
//   endpoints: (builder) => ({}),
// });

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

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URI = import.meta.env.VITE_APP_BASE_URL;

const baseQuery = fetchBaseQuery({
  baseUrl: `${API_URI}/api`,
  credentials: "include", // ✅ This sends the cookies
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: [],
  endpoints: (builder) => ({}),
});

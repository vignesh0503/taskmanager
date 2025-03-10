import { apiSlice } from "../apiSlice";

const AUTH_URL = "/user";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          // ✅ Save User + Token in Redux + LocalStorage
          dispatch(setCredentials(data));

          // ✅ Reload the Page (Optional)
          window.location.href = "/dashboard";
        } catch (error) {
          console.error("Login Failed", error);
        }
      },
    }),

    register: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/register`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    logout: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/logout`,
        method: "POST",
        credentials: "include",
      }),
      async onQueryStarted(arg, { dispatch }) {
        try {
          // ✅ Clear Token + User from Redux
          dispatch(logout());

          // ✅ Redirect to Login Page
          window.location.href = "/login";
        } catch (error) {
          console.error("Logout Failed", error);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation , useLogoutMutation} = authApiSlice;

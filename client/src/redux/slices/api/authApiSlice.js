import { apiSlice } from "../apiSlice";
import { logout, setCredentials } from "../authSlice"; // ✅ Import logout

const AUTH_URL = "/user";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => {
        console.log("Sending Login Request:", data); // ✅ Debugging
        return {
          url: `${AUTH_URL}/login`,
          method: "POST",
          body: data,
          credentials: "include",
          headers: {
            "Content-Type": "application/json", // ✅ Ensure JSON format
          },
        };
      },

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("Login Successful:", data);
          dispatch(setCredentials(data));
          console.log("Login Successful:", data);
          window.location.href = "/dashboard";
        } catch (error) {
          console.error("Login Failed:", error);
          console.log("Server Response:", error?.error?.data || error);
          alert("Login failed. Please check your credentials.");
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
      query: () => ({
        url: `${AUTH_URL}/logout`,
        method: "POST",
        credentials: "include",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logout()); // ✅ Now logout is defined
          console.log("Logout successful");
          window.location.href = "/login";
        } catch (error) {
          console.error("Logout Failed", error);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } =
  authApiSlice;

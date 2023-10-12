import { apiSlice } from "../../redux/apiSlice";
import { logOut, setCredentials } from "./authSlice";

var baseUrl = "http://localhost:4000"
export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (credentials) => ({
        url: baseUrl + "/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    signUp: builder.mutation({
      query: (credentials) => ({
        url: baseUrl + "/register",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: baseUrl + "/logout",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logOut());
        } catch (err) {
          console.error(err);
        }
      },
    }),
    refresh: builder.mutation({
      query: () => ({
        url: baseUrl + "/refresh",
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials({ accessToken: data.accessToken }));
        } catch (err) {
          console.error(err);
          console.log("Refresh issue");
        }
      },
    }),
  }),
});

export const {
  useSignInMutation,
  useSignUpMutation,
  useLogoutMutation,
  useRefreshMutation,
} = authApiSlice;

import { apiSlice } from "../../redux/apiSlice";
var baseUrl = "http://localhost:5000"
export const recipeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRecipe: builder.query({
      query: (recipeId) => baseUrl + `/recipe/${recipeId}`,
      providesTags: ["recipes"],
    }),
    getRecipes: builder.query({
      query: () => baseUrl + "/recipe",
      providesTags: ["recipes"],
    }),
    addRecipe: builder.mutation({
      query: (recipeData) => ({
        url: baseUrl +"/recipe",
        method: "POST",
        body: { ...recipeData },
      }),
      invalidatesTags: ["recipes"],
    }),
    updateRecipe: builder.mutation({
      query: (args) => {
        const { recipeId, ...recipeData } = args;
        return {
          url: baseUrl +`/recipe/${recipeId}`,
          method: "PUT",
          body: { ...recipeData },
        };
      },
      invalidatesTags: ["recipes"],
    }),
    rateRecipe: builder.mutation({
      query: (args) => {
        const { recipeId, rating } = args;
        return {
          url: baseUrl +`/recipe/rate/${recipeId}`,
          method: "PUT",
          body: { rating },
        };
      },
      invalidatesTags: ["recipes"],
    }),
    deleteRecipe: builder.mutation({
      query: (recipeId) => ({
        url: baseUrl +`/recipe/${recipeId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["recipes"],
    }),
    commentRecipe: builder.mutation({
      query: (args) => {
        const { recipeId, comment } = args;
        return {
          url: baseUrl +`/recipe/comment/${recipeId}`,
          method: "PUT",
          body: { comment },
        };
      },
      invalidatesTags: ["recipes"],
    }),
    deleteCommentRecipe: builder.mutation({
      query: (args) => {
        const { recipeId, commentId } = args;
        return {
          url: baseUrl +`/recipe/comment/${recipeId}/${commentId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["recipes"],
    }),
    toggleFavorite: builder.mutation({
      query: ({ recipeId }) => {
        return {
          url: baseUrl +`/recipe/favorite/${recipeId}`,
          method: "PUT",
        };
      },
      invalidatesTags: ["recipes"],
    }),
  }),
});

export const {
  useGetRecipeQuery,
  useGetRecipesQuery,
  useAddRecipeMutation,
  useUpdateRecipeMutation,
  useRateRecipeMutation,
  useDeleteRecipeMutation,
  useCommentRecipeMutation,
  useDeleteCommentRecipeMutation,
  useToggleFavoriteMutation,
} = recipeApiSlice;

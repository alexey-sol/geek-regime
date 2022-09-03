import { RootState } from "@/app/store";
import { useGetAllPostsQuery } from "@/features/posts/services/api";
import { Paging } from "@/shared/types/models";

export const selectPostsPaging = (state: RootState): Paging =>
    state.posts.paging;

export const useSelectPostsPage = (paging?: Paging) => useGetAllPostsQuery(paging, {
    selectFromResult: ({ data }) => ({ page: data }),
});

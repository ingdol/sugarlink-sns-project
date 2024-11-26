import { FEED_PAGE_SIZE } from "@/constants";
import { useInfiniteQuery } from "@tanstack/react-query";
import { FEED_KEY } from "../key";
import { PaginatedFeedsDTO } from "../types";
import { fetchFeeds } from "../api";

interface UseFeedsQueryOptions {
  pageSize?: number;
}
export const useFetchFeeds = ({
  pageSize = FEED_PAGE_SIZE,
}: UseFeedsQueryOptions) => {
  return useInfiniteQuery<PaginatedFeedsDTO, Error>({
    initialPageParam: 0,
    queryKey: [FEED_KEY],
    queryFn: ({ pageParam }) =>
      fetchFeeds({ page: pageParam as number, pageSize }),
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage.page ?? 0;
      return lastPage.hasNextPage ? currentPage + 1 : undefined;
    },
  });
};

import { useInfiniteQuery } from "@tanstack/react-query";

export default function usePaginatedList<T>(
	key: string,
	fetchFn: (page: number) => Promise<PaginatedResponse<T>>
) {
	const {
		data,
		isLoading,
		isPending,
		isFetchingNextPage,
		hasNextPage,
		refetch,
		fetchNextPage,
		error,
	} = useInfiniteQuery({
		queryKey: [key],
		queryFn: async ({ pageParam }) => await fetchFn(pageParam),
		initialPageParam: 1,
		getNextPageParam: (last: PaginatedResponse<T>) => {
			if (last.page === last.total_pages) return undefined;
			return last.page++;
		},
	});

	const payload = data?.pages.flatMap((page) => page.results) || [];
	return {
		isLoading,
		isPending,
		isFetchingNextPage,
		hasNextPage,
		fetchNextPage,
		payload,
		refetch,
		error,
	};
}

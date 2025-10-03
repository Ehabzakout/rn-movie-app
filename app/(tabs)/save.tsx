import MovieCard from "@/components/common/movie-card";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { FlatList, Text, View } from "react-native";

const Save = () => {
	const queryClient = useQueryClient();
	const { data } = useQuery<TSavedDocument[]>({
		queryKey: ["savedDocument"],
		queryFn: async () => [],
		enabled: false,
		initialData: queryClient.getQueryData(["savedDocument"]),
	});

	return (
		<View className="flex-1 justify-center  bg-primary pt-16">
			{!data?.length ? (
				<Text className="text-zinc-50 font-bold text-xl my-auto mx-auto">
					No Saved Movies
				</Text>
			) : (
				<FlatList
					data={data}
					renderItem={({ item }) => {
						const { movieId, title, poster_url, release_date, vote_average } =
							item;
						const cardProps: IMovieCard = {
							id: movieId,
							title,
							poster_path: poster_url,
							release_date,
							vote_average,
						};
						return <MovieCard {...cardProps} />;
					}}
					numColumns={2}
					columnWrapperStyle={{
						gap: 20,
						width: "45%",
						marginTop: 20,
					}}
					contentContainerStyle={{ paddingBottom: 100, marginHorizontal: 20 }}
					ListHeaderComponent={
						<>
							{data && data?.length > 0 && (
								<Text className="text-zinc-50 font-bold text-xl mb-3 ">
									Your Saved Movies
								</Text>
							)}
						</>
					}
				/>
			)}
		</View>
	);
};

export default Save;

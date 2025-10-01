import MovieCard from "@/components/common/movie-card";
import SearchBar from "@/components/common/search-bar";
import { searchMovie } from "@/service/api";
import { updateSearchCount } from "@/service/app-write";
import { useFetch } from "@/service/use-fetch";
import React, { useEffect, useState } from "react";
import {
	ActivityIndicator,
	FlatList,
	Image,
	ImageBackground,
	Text,
	View,
} from "react-native";

const Search = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const { data, loading, error, fetchData, reset } = useFetch(
		() => searchMovie(searchQuery),
		false
	);

	useEffect(() => {
		const func = async () => {
			if (!searchQuery) {
				reset();
				return;
			}
			await fetchData();
		};

		const debounce = setTimeout(func, 1000);
		return () => {
			clearTimeout(debounce);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchQuery]);

	useEffect(() => {
		const updateFn = setTimeout(async () => {
			if (data?.results && data?.results.length > 0)
				await updateSearchCount(searchQuery.trim(), data?.results[0]);
		}, 1000);
		return () => {
			clearTimeout(updateFn);
		};
	}, [data]);
	return (
		<ImageBackground
			source={require("../../assets/images/background.png")}
			resizeMode="cover"
			className="flex-1 bg-primary pt-20 pb-28j"
		>
			<FlatList
				ListHeaderComponent={
					<>
						<Image
							source={require("../../assets/icons/logo.png")}
							className="mx-auto mb-8"
						/>
						<View className="h-14 mb-10">
							<SearchBar value={searchQuery} onChangeText={setSearchQuery} />
						</View>
						<View>
							{loading && (
								<ActivityIndicator size={"large"} color={"#f2f2f2"} />
							)}
							{error && <Text className="text-red-500">{error.message}</Text>}
							{!error && !loading && searchQuery.trim() && (
								<Text className="text-zinc-200 font-bold ">
									Search Results for :{"  "}
									<Text className="text-purple-300 font-bold text-xl">
										{searchQuery}
									</Text>
								</Text>
							)}
						</View>
					</>
				}
				data={data?.results}
				keyExtractor={(movie) => movie.id.toString()}
				numColumns={3}
				renderItem={({ item }) => <MovieCard {...item} />}
				columnWrapperStyle={{
					gap: 20,
					marginTop: 20,
					justifyContent: "center",
					alignItems: "center",
				}}
				className="mx-5 "
				contentContainerStyle={{ paddingBottom: 100 }}
				ListEmptyComponent={
					<>
						{!loading && !error && searchQuery.trim() ? (
							<Text className="text-zinc-300 font-semibold text-xl mt-7 mx-auto">
								No Match movies
							</Text>
						) : (
							<Text className="text-zinc-300 mx-auto font-semibold text-xl">
								Type to search a movie...
							</Text>
						)}
					</>
				}
			/>
		</ImageBackground>
	);
};

export default Search;

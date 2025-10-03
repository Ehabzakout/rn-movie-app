import MovieCard from "@/components/common/movie-card";
import SearchBar from "@/components/common/search-bar";
import TrendingCard from "@/components/common/trending-card";
import { getMovies } from "@/service/api";
import { getSavedMovies, getTrendingMovies } from "@/service/app-write";
import { useFetch } from "@/service/use-fetch";
import usePaginatedList from "@/service/use-paginated-list";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import type { NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import {
	ActivityIndicator,
	FlatList,
	Image,
	ImageBackground,
	RefreshControl,
	ScrollView,
	Text,
	View,
} from "react-native";
export default function Index() {
	const router = useRouter();
	const { data: trending, fetchData } = useFetch(() => getTrendingMovies());
	const {
		payload,
		fetchNextPage,
		error,
		isLoading,
		isPending,
		isFetchingNextPage,
		refetch,
	} = usePaginatedList("movies", (page) => getMovies({ page }));

	const handleScroll = ({
		nativeEvent,
	}: NativeSyntheticEvent<NativeScrollEvent>) => {
		const { contentOffset, contentSize, layoutMeasurement } = nativeEvent;
		const isCloseToBottom =
			layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
		if (isCloseToBottom && !isFetchingNextPage && !isPending && !isLoading)
			fetchNextPage();
	};
	const { data: savedDocument } = useQuery({
		queryKey: ["savedDocument"],
		queryFn: async () => await getSavedMovies(process.env.EXPO_PUBLIC_API_KEY!),
	});

	return (
		<ImageBackground
			source={require("../../assets/images/background.png")}
			style={{ flex: 1, paddingBottom: 90, backgroundColor: "black" }}
			resizeMode="cover"
		>
			<ScrollView
				refreshControl={
					<RefreshControl
						refreshing={isLoading && payload.length !== 0}
						onRefresh={() => {
							refetch();
							fetchData();
						}}
					/>
				}
				className="flex-1 mt-5"
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
				onScroll={handleScroll}
			>
				<Image
					source={require("../../assets/icons/logo.png")}
					className="w-12 h-10 mx-auto mb-8 mt-10"
				/>
				<View className="mt-10 mx-5">
					<SearchBar onPress={() => router.push("/search")} />
					{trending && trending?.length > 0 && (
						<View>
							<Text className="text-zinc-50 font-bold mt-5">
								Trending Movies:
							</Text>
							<FlatList
								data={trending}
								keyExtractor={(movie) => String(movie.movie_id)}
								renderItem={({ item, index }) => (
									<TrendingCard index={index} {...item} />
								)}
								horizontal
								showsHorizontalScrollIndicator={false}
								contentContainerStyle={{ marginTop: 20, marginLeft: 10 }}
								ItemSeparatorComponent={() => <View className="w-5" />}
							/>
						</View>
					)}
					<Text className="text-zinc-50 font-semibold mt-5">Movie List:</Text>
					{isLoading ? (
						<ActivityIndicator
							size={"large"}
							color={"#f2f2f2"}
							className="mx-auto my-10"
						/>
					) : error ? (
						<Text>{error.message}</Text>
					) : (
						<>
							<FlatList
								className=" mt-7"
								data={payload}
								keyExtractor={(movie) => movie.id.toString()}
								renderItem={({ item }) => {
									const { id, title, poster_path, release_date, vote_average } =
										item;
									const cardProps: IMovieCard = {
										id: id.toString(),
										title,
										poster_path,
										release_date,
										vote_average,
									};
									return <MovieCard {...cardProps} />;
								}}
								numColumns={3}
								columnWrapperStyle={{
									justifyContent: "flex-start",
									gap: 20,
									paddingRight: 5,
									marginBottom: 10,
									width: "30%",
								}}
								scrollEnabled={false}
								scrollEventThrottle={16}
							/>
							{isFetchingNextPage && (
								<ActivityIndicator size={"large"} color={"#f2f2f2"} />
							)}
						</>
					)}
				</View>
			</ScrollView>
		</ImageBackground>
	);
}

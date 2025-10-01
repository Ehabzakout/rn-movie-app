import MovieCard from "@/components/common/movie-card";
import SearchBar from "@/components/common/search-bar";
import { getMovies } from "@/service/api";
import usePaginatedList from "@/service/use-paginated-list";
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
								renderItem={({ item }) => <MovieCard {...item} />}
								numColumns={3}
								columnWrapperStyle={{
									justifyContent: "flex-start",
									gap: 20,
									paddingRight: 5,
									marginBottom: 10,
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

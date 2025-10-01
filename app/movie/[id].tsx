import MovieData from "@/components/common/movie-details";
import { getMovieDetails } from "@/service/api";
import { useFetch } from "@/service/use-fetch";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import {
	ActivityIndicator,
	Image,
	RefreshControl,
	ScrollView,
	StatusBar,
	Text,
	View,
} from "react-native";

const MovieDetails = () => {
	const { id }: { id: string } = useLocalSearchParams();
	const { data, loading, error, fetchData } = useFetch(() =>
		getMovieDetails(id)
	);

	return (
		<>
			<StatusBar hidden={true} />
			<View className="flex-1 bg-primary">
				{loading && (
					<View className="mt-20 mx-auto">
						<Text className="text-zinc-50 font-bold text-lg">
							Loading Movie Details{" "}
						</Text>
						<ActivityIndicator size={"large"} color={"#f2f2f2"} />
					</View>
				)}
				{error && (
					<Text className="mt-20 text-red-500 mx-auto font-bold text-lg">
						{error.message}{" "}
					</Text>
				)}
				<ScrollView
					refreshControl={
						<RefreshControl
							refreshing={loading && data !== null}
							onRefresh={fetchData}
						/>
					}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ minHeight: "100%", paddingBottom: 40 }}
				>
					<Image
						source={{
							uri: data?.poster_path
								? `https://image.tmdb.org/t/p/w500${data.poster_path}`
								: "https://placehold.co/600x400/1a1a1a/ffffff.png",
						}}
						className="w-full h-[550px]"
						resizeMode="stretch"
					/>
					{data && <MovieData {...data} />}
				</ScrollView>
			</View>
		</>
	);
};

export default MovieDetails;

import MovieData from "@/components/common/movie-details";
import { getMovieDetails } from "@/service/api";
import { useFetch } from "@/service/use-fetch";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
	ActivityIndicator,
	Image,
	RefreshControl,
	ScrollView,
	StatusBar,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

const MovieDetails = () => {
	const { id }: { id: string } = useLocalSearchParams();
	const { data, loading, error, fetchData } = useFetch(() =>
		getMovieDetails(id)
	);
	const router = useRouter();

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
					contentContainerStyle={{ minHeight: "100%", paddingBottom: 100 }}
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
				<TouchableOpacity
					onPress={router.back}
					className="absolute bottom-10 w-full"
				>
					<View className="bg-purple-950  mx-5 rounded-full py-3 justify-center items-center gap-3  mt-10 flex-row">
						<Ionicons name="arrow-back" size={20} color="#f2f2f2" />
						<Text className=" text-zinc-50  font-bold text-xl ">Go Back</Text>
					</View>
				</TouchableOpacity>
			</View>
		</>
	);
};

export default MovieDetails;

import MovieCard from "@/components/common/movie-card";
import SearchBar from "@/components/common/search-bar";
import { getMovies } from "@/service/api";
import { useFetch } from "@/service/use-fetch";
import { useRouter } from "expo-router";
import {
	ActivityIndicator,
	FlatList,
	Image,
	ImageBackground,
	ScrollView,
	Text,
	View,
} from "react-native";

export default function Index() {
	const router = useRouter();
	const { data: movies, loading, error } = useFetch(() => getMovies());

	return (
		<ImageBackground
			source={require("../../assets/images/background.png")}
			style={{
				flex: 1,
				backgroundColor: "black",
			}}
			resizeMode="cover"
		>
			<ScrollView
				className="flex-1 mt-5"
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
			>
				<Image
					source={require("../../assets/icons/logo.png")}
					className="w-12 h-10 mx-auto mb-8 mt-10"
				/>
				<View className="mt-10 mx-5">
					<SearchBar onPress={() => router.push("/search")} />
					<Text className="text-zinc-50 font-semibold mt-5">Movie List:</Text>
					{loading ? (
						<ActivityIndicator
							size={"large"}
							color={"#f2f2f2"}
							className="mx-auto my-10"
						/>
					) : error ? (
						<Text>{error.message}</Text>
					) : (
						<FlatList
							className=" mt-7"
							data={movies?.results}
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
						/>
					)}
				</View>
			</ScrollView>
		</ImageBackground>
	);
}

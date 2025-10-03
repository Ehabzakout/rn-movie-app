import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableHighlight, View } from "react-native";
import SaveMovie from "./save-movie";

const MovieCard = ({
	poster_path,
	id,
	title,
	vote_average,
	release_date,
}: IMovieCard) => {
	return (
		<Link href={`/movie/${id}`} asChild>
			<TouchableHighlight style={{ width: "100%", marginBottom: 10 }}>
				<View>
					<Image
						source={{
							uri: poster_path
								? `https://image.tmdb.org/t/p/w500${poster_path}`
								: "https://placehold.co/600x400/1a1a1a/ffffff.png",
						}}
						resizeMode="stretch"
						className="w-full h-48 rounded-md"
					/>
					<Text className="text-zinc-50" numberOfLines={1}>
						{title}
					</Text>

					<View className="flex-row gap-3 items-center mb-1 mt-3">
						<Ionicons name="star" size={20} color={"#ffc905"} />
						<Text className="text-zinc-300">{Math.round(vote_average)}</Text>
						<View className="ms-auto">
							<SaveMovie
								id={id.toString()}
								title={title}
								poster_url={poster_path}
								vote_average={vote_average}
								release_date={release_date}
							/>
						</View>
					</View>
					<View className="flex-row justify-between">
						<Text className="text-zinc-300">
							{new Date(release_date).getFullYear()}{" "}
						</Text>
						<Text className="text-zinc-300 font-bold">Movie</Text>
					</View>
				</View>
			</TouchableHighlight>
		</Link>
	);
};

export default MovieCard;

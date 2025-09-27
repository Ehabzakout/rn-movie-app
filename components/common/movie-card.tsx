import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity } from "react-native";

const MovieCard = ({ poster_path, id, title }: Movie) => {
	return (
		<Link href={`/movie/${id}`} asChild>
			<TouchableOpacity className="w-[30%]">
				<Image
					source={{
						uri: poster_path
							? `https://image.tmdb.org/t/p/w500${poster_path}`
							: "https://placehold.co/600x400/1a1a1a/ffffff.png",
					}}
					resizeMode="cover"
					className="w-full h-48 rounded-md"
				/>
				<Text className="text-zinc-50">{title}</Text>
			</TouchableOpacity>
		</Link>
	);
};

export default MovieCard;

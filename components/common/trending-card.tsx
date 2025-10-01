import MaskedView from "@react-native-masked-view/masked-view";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableHighlight, View } from "react-native";

const TrendingCard = ({
	index,
	...item
}: TrendingMovie & { index: number }) => {
	return (
		<Link href={`/movie/${item.movie_id}`} asChild>
			<TouchableHighlight>
				<View className="relative">
					<Image
						source={{
							uri: item.poster_url
								? `https://image.tmdb.org/t/p/w500${item.poster_url}`
								: "https://placehold.co/600x400/1a1a1a/ffffff.png",
						}}
						className="w-32 h-48 rounded-md"
						resizeMode="cover"
					/>
					<View className="absolute  bottom-8 left-0 z-10 w-12">
						<MaskedView
							maskElement={
								<Text className="text-zinc-50 font-bold text-6xl">
									{index + 1}
								</Text>
							}
						>
							<Image
								className="size-14"
								source={require("../../assets/images/rankingGradient.png")}
								resizeMode="cover"
							/>
						</MaskedView>
					</View>
					<Text className="text-zinc-50 font-bold mt-3" numberOfLines={1}>
						{item.title}
					</Text>
				</View>
			</TouchableHighlight>
		</Link>
	);
};

export default TrendingCard;

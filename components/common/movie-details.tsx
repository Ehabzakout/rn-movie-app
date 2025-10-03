import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import SaveMovie from "./save-movie";

const MovieData = ({ ...props }: MovieDetails) => {
	const {
		title,
		release_date,
		runtime,
		vote_average,
		vote_count,
		overview,
		status,
		genres,
		production_countries,
		poster_path,
		id,
	} = props;
	return (
		<View className="mt-6 mx-5">
			<View className="flex-row justify-between">
				<Text className="text-zinc-50 font-bold text-2xl capitalize">
					{title}
				</Text>
				<SaveMovie
					poster_url={poster_path!}
					vote_average={vote_average}
					title={title}
					release_date={release_date}
					id={id.toString()}
				/>
			</View>
			<View className="my-4 flex-row gap-2 items-center h-6">
				<Text className="text-zinc-300">
					{new Date(release_date).getFullYear()}
				</Text>
				<Text className="text-zinc-300">({runtime} m) </Text>
			</View>
			<View className="flex-row gap-2 items-center mb-10  py-2 bg-dark-100 w-44">
				<Ionicons name="star" size={20} color={"#ffc905"} />
				<Text className="text-zinc-50 font-semibold ">
					{Math.round(vote_average)}/10
				</Text>
				<Text className="text-zinc-300 ">({vote_count} votes)</Text>
			</View>
			<View>
				<Text className="text-zinc-300  text-xl">Overview</Text>
				<Text className="text-zinc-50 mt-5 leading-6 tracking-wider">
					{overview}
				</Text>
			</View>
			<View className="mt-10 flex-row justify-between">
				<View>
					<Text className="text-zinc-300 text-lg">Release Date </Text>
					<Text className="text-zinc-50 text-lg">
						{new Date(release_date)
							.toDateString()
							.split(" ")
							.slice(1)
							.join(" ")}
						(Worldwide)
					</Text>
				</View>
				<View>
					<Text className="text-zinc-300 text-lg">Status</Text>
					<Text className="text-zinc-50 text-lg">{status}</Text>
				</View>
			</View>

			<View className="mt-10">
				<Text className="text-zinc-300 text-xl">Generes</Text>
				<View className="flex-row gap-5 mt-3">
					{genres.map((item) => (
						<Text
							key={item.id}
							className="text-zinc-50 bg-dark-100 px-3 py-1 rounded-md"
						>
							{item.name}
						</Text>
					))}
				</View>
			</View>

			<View className="mt-10">
				<Text className="text-lg text-zinc-300">Countries</Text>
				<View className="flex-row gap-4 items-center">
					{production_countries.map((item, index) => {
						return (
							<React.Fragment key={item.name}>
								<Text className="text-zinc-300 font-semibold text-xl">
									{item.name}
								</Text>
								{index < production_countries.length - 1 && (
									<View className="size-2 rounded-full bg-zinc-300 mt-2" />
								)}
							</React.Fragment>
						);
					})}
				</View>
			</View>
		</View>
	);
};

export default MovieData;

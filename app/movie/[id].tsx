import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";

const MovieDetails = () => {
	const { id } = useLocalSearchParams();
	return (
		<>
			<StatusBar hidden={true} />
			<View className="flex-1 bg-primary">
				<Text className="text-zinc-50">details: {id}</Text>
			</View>
		</>
	);
};

export default MovieDetails;

const styles = StyleSheet.create({});

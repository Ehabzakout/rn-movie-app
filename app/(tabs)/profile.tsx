import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

const Profile = () => {
	return (
		<View className="flex-1 justify-center items-center bg-primary">
			<Ionicons name="person-outline" color="#f2f2f2" size={30} />
			<Text className="text-zinc-50">Profile</Text>
		</View>
	);
};

export default Profile;

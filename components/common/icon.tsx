import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text } from "react-native";

const Icon = ({ title, focused }: TIconProps) => {
	// map to real Ionicons names
	const iconMap = {
		home: { active: "home", inactive: "home-outline" },
		search: { active: "search", inactive: "search-outline" },
		save: { active: "bookmark", inactive: "bookmark-outline" },
		profile: { active: "person", inactive: "person-outline" },
	} as const;

	const iconName = focused ? iconMap[title].active : iconMap[title].inactive;

	return (
		<>
			<Ionicons
				name={iconName}
				color={focused ? "purple" : "#f2f2f2"}
				size={20}
			/>
			<Text
				style={{
					color: "#fff",
					textTransform: "capitalize",
					width: 100,
					textAlign: "center",
				}}
			>
				{title}
			</Text>
		</>
	);
};

const GradientIcon = ({ title, focused }: TIconProps) => {
	return (
		<>
			{focused ? (
				<LinearGradient
					colors={["#8b5ce9", "#d946ee"]}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 0 }}
					style={{
						borderRadius: 999,
						paddingHorizontal: 20,
						height: 65,
						width: 100,
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Icon title={title} focused={focused} />
				</LinearGradient>
			) : (
				<Icon title={title} focused={focused} />
			)}
		</>
	);
};

export default GradientIcon;

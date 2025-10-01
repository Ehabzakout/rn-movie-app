import GradientIcon from "@/components/common/icon";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

const TabsLayout = () => {
	return (
		<>
			<StatusBar style="light" />
			<Tabs
				screenOptions={{
					headerShown: false,
					tabBarShowLabel: false,
					animation: "shift",

					tabBarStyle: {
						backgroundColor: "#030014",
						height: 60,
						width: "90%",
						alignSelf: "center",
						position: "absolute",
						marginHorizontal: 20,
						bottom: 30,
						borderRadius: 70,
						justifyContent: "center",
						alignItems: "center",
						paddingTop: 10,
						overflow: "hidden",
						borderTopWidth: 0,
					},
					tabBarItemStyle: {
						flex: 1,
						alignItems: "center",
						justifyContent: "center",
					},
				}}
			>
				<Tabs.Screen
					name="index"
					options={{
						title: "Home",

						tabBarIcon: ({ focused }) => (
							<GradientIcon title="home" focused={focused} />
						),
					}}
				/>
				<Tabs.Screen
					name="search"
					options={{
						title: "Search",
						tabBarIcon: ({ focused }) => (
							<GradientIcon title="search" focused={focused} />
						),
					}}
				/>
				<Tabs.Screen
					name="save"
					options={{
						title: "Save",
						tabBarIcon: ({ focused }) => (
							<GradientIcon title="save" focused={focused} />
						),
					}}
				/>
				<Tabs.Screen
					name="profile"
					options={{
						title: "Profile",
						tabBarIcon: ({ focused }) => (
							<GradientIcon title="profile" focused={focused} />
						),
					}}
				/>
			</Tabs>
		</>
	);
};

export default TabsLayout;

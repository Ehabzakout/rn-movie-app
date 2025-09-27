import { Image, StyleSheet, TextInput, View } from "react-native";

const SearchBar = ({ onPress }: { onPress: () => void }) => {
	return (
		<View className=" flex-row flex-1 h-14  items-center gap-4 bg-primary/50 px-5 rounded-full">
			<Image
				source={require("../../assets/icons/search.png")}
				className="size-6 "
				resizeMode="cover"
				tintColor="#ab8bff"
			/>
			<TextInput
				onPress={onPress}
				className="w-full text-zinc-100"
				placeholder="Search your movie"
				placeholderTextColor={"#eeee"}
			/>
		</View>
	);
};

export default SearchBar;

const styles = StyleSheet.create({});

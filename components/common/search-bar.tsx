import { Image, TextInput, View } from "react-native";

const SearchBar = ({
	onPress,
	...props
}: {
	onPress?: () => void;
	value?: string;
	onChangeText?: (text: string) => void;
}) => {
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
				className="w-full text-zinc-100 pt-5"
				placeholder="Search your movie"
				placeholderTextColor={"#eeee"}
				{...props}
			/>
		</View>
	);
};

export default SearchBar;

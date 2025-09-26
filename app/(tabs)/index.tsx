import { ImageBackground, Text } from "react-native";
import background from "../../assets/images/bg.png";
export default function Index() {
	return (
		<ImageBackground
			source={background}
			style={{
				flex: 1,
			}}
			resizeMode="cover"
		>
			<Text className="font-bold text-red-500">Welcome</Text>
		</ImageBackground>
	);
}

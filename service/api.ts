import axios from "axios";

export const getMovies = async (query: string = "popular") => {
	const response = await axios.get<TMoviesData>(
		`${process.env.EXPO_PUBLIC_API}/movie/${query}`,
		{
			headers: {
				accept: "application/json",
				Authorization: `Bearer ${process.env.EXPO_PUBLIC_TOKEN}`,
			},
		}
	);

	if (!("results" in response.data))
		throw new Error(response.statusText || "can't get movies data");

	return response.data;
};

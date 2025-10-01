import axios from "axios";

export const getMovies = async ({
	sortBy = "popularity.desc",
	page = 1,
}: {
	sortBy?: string;
	page?: number;
}) => {
	const response = await axios.get<TMoviesData>(
		`${process.env.EXPO_PUBLIC_API}/discover/movie?sort_by=${sortBy}&page=${page}`,
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

export async function searchMovie(query?: string) {
	const response = await axios.get<TMoviesData>(
		`${process.env.EXPO_PUBLIC_API}/search/movie?query=${query}`,
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
}

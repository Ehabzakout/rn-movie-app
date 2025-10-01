import { API_HEADERS } from "@/constants/api-headers";
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

export async function getMovieDetails(movieId: string) {
	try {
		const response = await axios.get<MovieDetails>(
			`${process.env.EXPO_PUBLIC_API}/movie/${movieId}`,
			{
				headers: API_HEADERS,
			}
		);

		if (response.status !== 200) throw new Error(response.statusText);
		return response.data;
	} catch (error) {
		throw new Error(
			error instanceof Error ? error?.message : "Can't get movie"
		);
	}
}

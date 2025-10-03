import { saveMovie } from "@/service/app-write";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";

const SaveMovie = ({
	id,
	title,
	poster_url,
	release_date,
	vote_average,
}: {
	id: string;
	title: string;
	poster_url: string;
	release_date: string;
	vote_average: number;
}) => {
	const queryClient = useQueryClient();

	const { data: savedDocument } = useQuery<TSavedDocument[]>({
		queryKey: ["savedDocument"],
		queryFn: async () => [], // no-op, since parent already fetches, you just need cache
		enabled: false, // do not re-fetch, just read cache
		initialData: () => queryClient.getQueryData(["savedDocument"]), // read cache
	});
	const [savedMovieIds, setSavedMovieIds] = useState<string[]>([]);

	const { isPending, mutate } = useMutation({
		mutationKey: ["saveMovie"],
		mutationFn: saveMovie,
		onSuccess: (_data, newMovie) => {
			if (savedDocument) {
				if (!newMovie.deleteMovie) {
					queryClient.setQueryData(
						["savedDocument"],
						[...savedDocument, newMovie]
					);
				} else {
					const newDocuments = savedDocument.filter(
						(movie) => movie.movieId !== id
					);
					queryClient.setQueryData(["savedDocument"], newDocuments);
				}
			}
		},
		onError: (err) => {
			console.log(err);
			if (savedDocument) {
				const newDocuments: any[] = savedDocument.filter(
					(movie) => movie.movieId !== id
				);
				setSavedMovieIds(newDocuments);
			}
		},
	});
	useEffect(() => {
		if (savedDocument?.length)
			setSavedMovieIds(savedDocument?.map((movie) => movie.movieId));
	}, [savedDocument]);

	async function handleSave() {
		let deleteMovie = false;
		if (savedMovieIds?.includes(id)) {
			deleteMovie = true;
			const newMovieIds = savedMovieIds?.filter((movie) => movie !== id);
			setSavedMovieIds(newMovieIds);
		} else {
			setSavedMovieIds((prev) => [...prev, id]);
		}

		const newMovies = {
			userId: process.env.EXPO_PUBLIC_API_KEY!,
			title,
			poster_url,
			movieId: id,
			vote_average: Math.round(vote_average),
			release_date,
			deleteMovie,
		};

		mutate(newMovies);
	}

	return (
		<>
			{isPending ? (
				<ActivityIndicator size={"small"} color="#0099ff" />
			) : (
				<Ionicons
					size={20}
					color={"#0099ff"}
					name={savedMovieIds?.includes(id) ? "bookmark" : "bookmark-outline"}
					onPress={handleSave}
				/>
			)}
		</>
	);
};

export default SaveMovie;

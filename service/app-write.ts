import { Account, Client, Databases, ID, Query } from "react-native-appwrite";

export const client = new Client()
	.setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
	.setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)
	.setPlatform(process.env.EXPO_PUBLIC_PLATFORM!);
export const account = new Account(client);
export const database = new Databases(client);

const DATABASE_ID = process.env.EXPO_PUBLIC_DATABASE_ID!;
const SEARCHMOVIES_ID = process.env.EXPO_PUBLIC_COLLECTION_ID!;
const SAVED_MOVIES = process.env.EXPO_PUBLIC_SAVED!;
export const updateSearchCount = async (query: string, movie: Movie) => {
	const result = await database.listDocuments(DATABASE_ID, SEARCHMOVIES_ID, [
		Query.equal(`searchTerm`, query),
	]);
	try {
		if (result.documents.length > 0) {
			const existedMovie = result.documents[0];
			await database.updateDocument(
				DATABASE_ID,
				SEARCHMOVIES_ID,
				existedMovie.$id,
				{
					count: existedMovie.count + 1,
				}
			);
		} else {
			await database.createDocument(DATABASE_ID, SEARCHMOVIES_ID, ID.unique(), {
				searchTerm: query,
				title: movie.title,
				count: 1,
				poster_url: movie.poster_path,
				movie_id: String(movie.id),
			});
		}
	} catch (error) {
		throw new Error(
			error instanceof Error ? error?.message : "Can't update document"
		);
	}
};

export const getTrendingMovies = async () => {
	try {
		const results = await database.listDocuments(DATABASE_ID, SEARCHMOVIES_ID, [
			Query.limit(5),
			Query.orderDesc("count"),
		]);
		return results.documents as unknown as TrendingMovie[];
	} catch (error) {
		throw new Error(
			error instanceof Error ? error?.message : "Can't update document"
		);
	}
};

export const getSavedMovies = async (userId: string) => {
	try {
		const results = await database.listDocuments(DATABASE_ID, SAVED_MOVIES, [
			Query.equal("userId", userId),
		]);
		return results.documents as unknown as TSavedDocument[];
	} catch (error) {
		throw new Error(
			error instanceof Error ? error?.message : "Can't get document"
		);
	}
};

export const saveMovie = async ({
	userId,
	movieId,
	title,
	poster_url,
	vote_average,
	release_date,
	deleteMovie,
}: {
	userId: string;
	movieId: string;
	title: string;
	poster_url: string;
	vote_average: number;
	release_date: string;
	deleteMovie: boolean;
}) => {
	if (deleteMovie) {
		const existedMovie = await database.listDocuments(
			DATABASE_ID,
			SAVED_MOVIES,
			[Query.equal("movieId", movieId), Query.equal("userId", userId)]
		);
		await database.deleteDocument(
			DATABASE_ID,
			SAVED_MOVIES,
			existedMovie.documents[0].$id
		);
	} else {
		await database.createDocument(DATABASE_ID, SAVED_MOVIES, ID.unique(), {
			userId,
			movieId,
			title,
			poster_url,
			vote_average,
			release_date,
		});
	}
};

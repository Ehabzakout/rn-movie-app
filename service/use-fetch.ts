import { useEffect, useState } from "react";

export const useFetch = <T>(
	fetchFn: () => Promise<T>,
	autoFetch: boolean = true
) => {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	async function fetchData() {
		try {
			setLoading(true);
			setError(null);
			const payload = await fetchFn();
			setData(payload);
		} catch (error) {
			if (error instanceof Error) setError(error);
			else setError(new Error("can't get data"));
		} finally {
			setLoading(false);
		}
	}
	const reset = () => {
		setData(null);
		setLoading(false);
		setError(null);
	};

	useEffect(() => {
		if (autoFetch) fetchData();
	}, []);

	return { data, loading, error, fetchData, reset };
};

declare type TIconProps = {
	title: "home" | "search" | "save" | "profile";
	focused: boolean;
};

declare type TMoviesData = {
	page: number;
	results: Movie[];
	total_pages: number;
	total_results: number;
};

import React, { useState } from "react";

const useHttp = (applyData, url, options) => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const sendRequest = async () => {
		setIsLoading(true);
		setError(null);
		try {
			const response = await fetch(url, options);

			if (!response.ok) {
				throw new Error("Request failed!");
			}
			console.log("sendRequest/fetchTasks");
			const data = await response.json();
			applyData(data);
		} catch (err) {
			setError(err.message || "Something went wrong!");
		}
		setIsLoading(false);
	};

	return {
		isLoading,
		error,
		sendRequest,
	};
};

export default useHttp;

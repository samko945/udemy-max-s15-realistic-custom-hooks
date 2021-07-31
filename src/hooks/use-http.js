import React, { useState, useCallback } from "react";

const useHttp = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	// minimise dependencies of sendRequest by passing them as parameters instead of externally.
	const sendRequest = useCallback(async (applyData, url, options) => {
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
	}, []);

	return {
		isLoading,
		error,
		sendRequest,
	};
};

export default useHttp;

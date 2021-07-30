import React, { useState, useEffect } from "react";
import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useHttp from "./hooks/use-http";

function App() {
	const [tasks, setTasks] = useState([]);

	const transformTasks = (tasksObj) => {
		const loadedTasks = [];
		for (const key in tasksObj) {
			loadedTasks.push({ id: key, text: tasksObj[key].text });
		}
		setTasks(loadedTasks);
	};
	const {
		isLoading,
		error,
		sendRequest: fetchTasks,
	} = useHttp(transformTasks, "https://max-udemy-s15-custom-hooks-default-rtdb.firebaseio.com/tasks.json");

	useEffect(() => {
		fetchTasks();
	}, []);

	const taskAddHandler = (task) => {
		setTasks((prevTasks) => prevTasks.concat(task));
	};

	return (
		<React.Fragment>
			<NewTask onAddTask={taskAddHandler} />
			<Tasks items={tasks} loading={isLoading} error={error} onFetch={fetchTasks} />
		</React.Fragment>
	);
}

export default App;

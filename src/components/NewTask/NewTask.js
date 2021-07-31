import { useState } from "react";

import Section from "../UI/Section";
import TaskForm from "./TaskForm";
import useHttp from "../../hooks/use-http";

const NewTask = (props) => {
	const { isLoading, error, sendRequest } = useHttp();

	const createTask = (taskText, taskData) => {
		const generatedId = taskData.name; // firebase-specific => "name" contains generated id
		const createdTask = { id: generatedId, text: taskText };
		props.onAddTask(createdTask);
	};

	// bind the createTask function with taskText object to make it accessible. (Alternative to nesting createTask inside of enterTaskHandler)
	const enterTaskHandler = async (taskText) => {
		sendRequest(
			createTask.bind(null, taskText),
			"https://max-udemy-s15-custom-hooks-default-rtdb.firebaseio.com/tasks.json",
			{
				method: "POST",
				body: JSON.stringify({ text: taskText }),
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
	};
	return (
		<Section>
			<TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
			{error && <p>{error}</p>}
		</Section>
	);
};

export default NewTask;

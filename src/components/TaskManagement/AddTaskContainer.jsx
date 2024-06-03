import React, { useState, useCallback } from 'react';
import { useTasks } from '../../contexts/TaskContext';
import AddTask from '../UIComponents/AddTask.jsx';

const AddTaskContainer = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const { addNewTask } = useTasks();
    const [isDone, setIsDone] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');   

    const handleAddTask = useCallback((event) => {
        event.preventDefault();
        if (title && description && category) {
            const newTask = {
                title,
                description,
                category,
                status: 'To Do',
                isDone,
                createdAt: new Date().toISOString(),
                assigned: 'Unassigned' 
            };
            addNewTask(newTask);
            setTitle('');
            setDescription('');
            setCategory('');
            setIsDone(false);
            setErrorMessage('');
        } else {
            setErrorMessage('Please fill in all fields');   
        }
    }, [title, description, category, isDone, addNewTask]);

    return (
        <AddTask
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            category={category}
            setCategory={setCategory}
            isDone={isDone}
            setIsDone={setIsDone}
            handleAddTask={handleAddTask}
            errorMessage={errorMessage}
        />
    );
};

export default AddTaskContainer;

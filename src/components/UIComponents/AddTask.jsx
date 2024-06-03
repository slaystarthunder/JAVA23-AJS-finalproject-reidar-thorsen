import React from 'react';
import TextField from './TextField';
import Button from './Button';
import '../../styles/AddTask.css';

const AddTask = ({ title, setTitle, description, setDescription, category, setCategory, isDone, setIsDone, handleAddTask, errorMessage }) => {
    return (
        <form className="add-task" onSubmit={handleAddTask}>
            <h2 className="headline">Title</h2>
            <TextField value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter title here" />
            <h2 className="headline">Description</h2>
            <TextField value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter description here" />
            <h2 className="headline">Category</h2>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Select category</option>
                <option value="UX">UX</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
            </select>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <Button type="submit">Create Task</Button>
        </form>
    );
};

export default AddTask;

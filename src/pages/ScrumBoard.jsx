import React, { useCallback } from 'react';
import AddTaskContainer from '../components/TaskManagement/AddTaskContainer';
import TaskList from '../components/TaskManagement/TaskList';
import { useTasks } from '../contexts/TaskContext';
import '../styles/ScrumBoard.css';

const ScrumBoard = () => {
    const { tasks, updateTaskStatus, deleteTask, assignUserToTask, groupTasksByStatus } = useTasks();
    const groupedTasks = groupTasksByStatus(tasks);

    const handleMoveTask = useCallback((task) => {
        const nextStatus = {
            "To Do": "In Progress",
            "In Progress": "Done",
            "Done": "To Do"
        }[task.status];
        updateTaskStatus(task, nextStatus);
    }, [updateTaskStatus]);

    return (
        <div className="scrum-board">
            <AddTaskContainer />
            <div className="task-list-wrapper">
                {["To Do", "In Progress", "Done"].map((status) => (
                    <div className="task-list-container" key={status}>
                        <TaskList
                            tasks={groupedTasks[status]}
                            status={status}
                            onMoveTask={handleMoveTask}
                            onDeleteTask={deleteTask}
                            onAssignUser={assignUserToTask}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ScrumBoard;

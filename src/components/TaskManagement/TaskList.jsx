import React from 'react';
import { useTasks } from '../../contexts/TaskContext';
import '../../styles/TaskList.css';

const TaskList = ({ tasks, status, onMoveTask, onDeleteTask }) => {
    const { assignedUser, assignUserLocalChange, submitUserAssignment } = useTasks();

    const handleAssignUserChange = (taskId, value) => {
        assignUserLocalChange(taskId, value);
    };

    const handleAssignUserSubmit = (task) => {
        submitUserAssignment(task);
    };

    const getMoveButtonText = (status) => {
        switch (status) {
            case 'To Do':
                return 'Assign >>';
            case 'In Progress':
                return 'Done >>';
            case 'Done':
                return 'Remove task';
            default:
                return 'Move';
        }
    };

    const handleMoveTask = (task) => {
        if (status === 'Done') {
            onDeleteTask(task.id);
        } else {
            onMoveTask(task);
        }
    };

    return (
        <div className="task-list">
            <h2 className="headline">{status}</h2>
            {tasks && tasks.length > 0 ? (
                tasks.map(task => (
                    <div key={task.id} className="task">
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                        <p>Category: {task.category}</p>
                        {status === 'In Progress' && (
                            <>
                                <p>Assigned to: {task.assigned}</p>
                                <button onClick={() => handleMoveTask(task)}>{getMoveButtonText(status)}</button>
                            </>
                        )}
                        {status === 'To Do' && (
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                handleAssignUserSubmit(task);
                            }}>
                                <input
                                    type="text"
                                    placeholder="Assign user"
                                    value={assignedUser[task.id] || ''}
                                    onChange={(e) => handleAssignUserChange(task.id, e.target.value)}
                                />
                                <button type="submit">{getMoveButtonText(status)}</button>
                            </form>
                        )}
                        {status === 'Done' && (
                            <button onClick={() => handleMoveTask(task)}>{getMoveButtonText(status)}</button>
                        )}
                    </div>
                ))
            ) : (
                <p>No tasks available</p>
            )}
        </div>
    );
};

export default TaskList;

import React from 'react';
import TaskList from '../components/TaskManagement/TaskList';

const TaskListWrapper = ({ tasks, status, onMoveTask, onDeleteTask, onAssignUser }) => {
    return (
        <TaskList
            tasks={tasks}
            status={status}
            onMoveTask={onMoveTask}
            onDeleteTask={onDeleteTask}
            onAssignUser={onAssignUser}
        />
    );
};

export default TaskListWrapper;

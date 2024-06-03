import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import { fetchTasksOnceFromFirebase, updateTaskFieldInFirebase, addTaskToFirebase, deleteTaskFromFirebase } from '../services/DataAccessObject';

const TaskContext = createContext();

const taskReducer = (state, action) => {
    switch (action.type) {
        case 'SET_TASKS':
            return { ...state, tasks: action.payload, isLoading: false };
        case 'ADD_TASK':
            return { ...state, tasks: [...state.tasks, action.payload] };
        case 'UPDATE_TASK':
            return { ...state, tasks: state.tasks.map(task => task.id === action.payload.id ? action.payload : task) };
        case 'DELETE_TASK':
            return { ...state, tasks: state.tasks.filter(task => task.id !== action.payload) };
        case 'SET_LOADING':
            return { ...state, isLoading: true };
        case 'SET_ERROR':
            return { ...state, error: action.payload, isLoading: false };
        case 'ASSIGN_USER_LOCAL':
            return {
                ...state,
                assignedUser: { ...state.assignedUser, [action.payload.taskId]: action.payload.value },
            };
        case 'ASSIGN_USER':
            return {
                ...state,
                tasks: state.tasks.map(task =>
                    task.id === action.payload.id ? action.payload : task
                ),
            };
        default:
            return state;
    }
};

export const TaskProvider = ({ children }) => {
    const [state, dispatch] = useReducer(taskReducer, { tasks: [], isLoading: false, error: null, assignedUser: {} });

    const fetchTasks = useCallback(() => {
        dispatch({ type: 'SET_LOADING' });
        fetchTasksOnceFromFirebase(
            (tasks) => {
                dispatch({ type: 'SET_TASKS', payload: tasks });
            },
            (error) => {
                dispatch({ type: 'SET_ERROR', payload: error });
            }
        );
    }, []);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const addNewTask = async (task) => {
        try {
            const newTaskId = await addTaskToFirebase(task);
            dispatch({ type: 'ADD_TASK', payload: { ...task, id: newTaskId } });
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: error });
        }
    };

    const updateTaskStatus = useCallback(async (task, newStatus) => {
        try {
            await updateTaskFieldInFirebase(task.id, 'status', newStatus);
            dispatch({ type: 'UPDATE_TASK', payload: { ...task, status: newStatus } });
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: 'Failed to update task status. Please try again.' });
        }
    }, []);

    const deleteTask = async (taskId) => {
        try {
            await deleteTaskFromFirebase(taskId);
            dispatch({ type: 'DELETE_TASK', payload: taskId });
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: 'Failed to delete task. Please try again.' });
        }
    };

    const assignUserToTask = useCallback(async (task, user) => {
        try {
            await updateTaskFieldInFirebase(task.id, 'assigned', user);
            dispatch({ type: 'ASSIGN_USER', payload: { ...task, assigned: user } });
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: 'Failed to assign user. Please try again.' });
        }
    }, []);

    const assignUserLocalChange = (taskId, value) => {
        dispatch({ type: 'ASSIGN_USER_LOCAL', payload: { taskId, value } });
    };

    const submitUserAssignment = async (task) => {
        if (state.assignedUser[task.id]) {
            try {
                await updateTaskFieldInFirebase(task.id, 'assigned', state.assignedUser[task.id]);
                await updateTaskFieldInFirebase(task.id, 'status', 'In Progress');
                dispatch({ type: 'ASSIGN_USER', payload: { ...task, assigned: state.assignedUser[task.id], status: 'In Progress' } });
                dispatch({ type: 'ASSIGN_USER_LOCAL', payload: { taskId: task.id, value: '' } });
            } catch (error) {
                dispatch({ type: 'SET_ERROR', payload: 'Failed to assign user. Please try again.' });
            }
        }
    };

    const groupTasksByStatus = useCallback((tasks) => {
        return tasks.reduce((acc, task) => {
            const { status } = task;
            if (!acc[status]) acc[status] = [];
            acc[status].push(task);
            return acc;
        }, {});
    }, []);

    return (
        <TaskContext.Provider value={{ ...state, fetchTasks, addNewTask, updateTaskStatus, deleteTask, assignUserToTask, groupTasksByStatus, assignUserLocalChange, submitUserAssignment }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTasks = () => {
    const context = useContext(TaskContext);
    if (context === undefined) {
        throw new Error('useTasks must be used within a TaskProvider');
    }
    return context;
};

import { ref, set, push, update, remove, onValue } from 'firebase/database';
import { db } from './FirebaseConfig';

const tasksRef = ref(db, 'tasks');

export const addTaskToFirebase = (task) => {
  const newTaskRef = push(tasksRef);
  return set(newTaskRef, task).then(() => newTaskRef.key);
};

export const fetchTasksOnceFromFirebase = (onSuccess, onError) => {
  onValue(tasksRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      const tasks = Object.entries(data).map(([id, task]) => ({ id, ...task }));
      onSuccess(tasks);
    } else {
      onSuccess([]);
    }
  }, (error) => {
    if (onError) {
      onError(error);
    }
  }, { onlyOnce: true });
};

export const updateTaskFieldInFirebase = (taskId, field, value) => {
  const updates = {};
  updates[`/tasks/${taskId}/${field}`] = value;
  return update(ref(db), updates);
};

export const deleteTaskFromFirebase = (taskId) => {
  const taskRef = ref(db, `tasks/${taskId}`);
  return remove(taskRef);
};

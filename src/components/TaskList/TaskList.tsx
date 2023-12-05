import React, { useEffect, useState } from 'react';
import { IonList, IonItem, IonLabel, IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import ApiService from '../../services/ApiService';

interface Task {
  id: string;
  title: string;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const history = useHistory();

  // Définition de la fonction fetchTasks
  const fetchTasks = () => {
    const subscription = ApiService.get<Task[]>('tasks').subscribe({
      next: data => setTasks(data),
      error: err => console.error('Erreur lors de la récupération des tâches:', err)
    });
    return () => subscription.unsubscribe();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleEdit = (taskId: string) => {
    history.push(`/edit-task/${taskId}`);
  };

  const handleDelete = (taskId: string) => {
    ApiService.delete(`tasks/${taskId}`).subscribe({
      next: () => fetchTasks(), // Appel de fetchTasks après la suppression
      error: err => console.error('Erreur lors de la suppression de la tâche:', err)
    });
  };

  return (
    <IonList>
      {tasks.map(task => (
        <IonItem key={task.id}>
          <IonLabel>{task.title}</IonLabel>
          <IonButton onClick={() => handleEdit(task.id)}>Edit</IonButton>
          <IonButton onClick={() => handleDelete(task.id)}>Delete</IonButton>
        </IonItem>
      ))}
    </IonList>
  );
};

export default TaskList;

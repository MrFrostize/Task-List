import React, { useEffect, useState } from 'react';
import { IonList, IonItem, IonLabel, IonButton, IonContent, IonAlert } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import ApiService from '../../services/ApiService';
import './TaskList.css';

interface Task {
  id: string;
  title: string;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const history = useHistory();

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
    setSelectedTask(taskId);
    setShowDeleteAlert(true);
  };

  const confirmDelete = () => {
    if (selectedTask) {
      ApiService.delete(`tasks/${selectedTask}`).subscribe({
        next: () => fetchTasks(),
        error: err => console.error('Erreur lors de la suppression de la tâche:', err)
      });
    }
    setShowDeleteAlert(false);
  };

  return (
    <IonContent>
      {tasks.length > 0 ? (
        <IonList>
          {tasks.map(task => (
            <IonItem key={task.id}>
              <IonLabel>{task.title}</IonLabel>
              <IonButton onClick={() => handleEdit(task.id)}>Edit</IonButton>
              <IonButton color="danger" onClick={() => handleDelete(task.id)}>Delete</IonButton>
            </IonItem>
          ))}
        </IonList>
      ) : (
        <div>No tasks available</div>
      )}
      <IonAlert
        isOpen={showDeleteAlert}
        onDidDismiss={() => setShowDeleteAlert(false)}
        header={'Confirm Delete'}
        message={'Are you sure you want to delete this task?'}
        buttons={[
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: blah => {
              setShowDeleteAlert(false);
            }
          },
          {
            text: 'Okay',
            handler: () => {
              confirmDelete();
            }
          }
        ]}
      />
    </IonContent>
  );
};

export default TaskList;

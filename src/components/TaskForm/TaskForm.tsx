import React, { useState, useEffect } from 'react';
import { IonInput, IonButton, IonContent, IonItem, IonLabel } from '@ionic/react';
import { useParams, useHistory } from 'react-router-dom';
import ApiService from '../../services/ApiService';

interface Task {
  id: string;
  title: string;
  description?: string;
}

interface RouteParams {
  id?: string;
}

const TaskForm: React.FC = () => {
  const [task, setTask] = useState<Task>({ id: '', title: '', description: '' });
  const { id } = useParams<RouteParams>();
  const isEditing = id !== undefined;
  const history = useHistory();

  useEffect(() => {
    if (isEditing && id) {
      const subscription = ApiService.get<Task>(`tasks/${id}`).subscribe({
        next: data => setTask(data),
        error: err => console.error('Erreur lors du chargement de la tâche:', err)
      });
      return () => subscription.unsubscribe();
    }
  }, [id, isEditing]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const operation = isEditing ? ApiService.put : ApiService.post;
    operation<Task>(`tasks/${isEditing ? id : ''}`, task).subscribe({
      next: () => history.push('/tasks'),
      error: err => console.error('Erreur lors de l’enregistrement de la tâche:', err)
    });
  };

  const handleInputChange = (e: CustomEvent, field: keyof Task) => {
    setTask({ ...task, [field]: e.detail.value! });
  };

  return (
    <IonContent>
      <form onSubmit={handleSubmit}>
        <IonItem>
          <IonLabel position="floating">Task Title</IonLabel>
          <IonInput value={task.title} onIonChange={e => handleInputChange(e, 'title')} />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Description</IonLabel>
          <IonInput value={task.description} onIonChange={e => handleInputChange(e, 'description')} />
        </IonItem>
        <IonButton expand="block" type="submit">Save Task</IonButton>
      </form>
    </IonContent>
  );
};

export default TaskForm;

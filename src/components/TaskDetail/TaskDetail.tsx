import React, { useEffect, useState } from 'react';
import { IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton } from '@ionic/react';
import { useParams, useHistory } from 'react-router-dom';
import ApiService from '../../services/ApiService';

interface Task {
  id: string;
  title: string;
  description?: string;
}

interface RouteParams {
  id: string;
}

const TaskDetail: React.FC = () => {
  const [task, setTask] = useState<Task | null>(null);
  const { id } = useParams<RouteParams>();
  const history = useHistory();

  useEffect(() => {
    const subscription = ApiService.get<Task>(`tasks/${id}`).subscribe({
      next: data => setTask(data),
      error: err => console.error('Erreur lors du chargement de la tâche:', err)
    });
    return () => subscription.unsubscribe();
  }, [id]);

  return (
    <IonContent>
      {task && (
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>{task.title}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            {task.description}
            {/* Autres détails de la tâche ici */}
          </IonCardContent>
        </IonCard>
      )}
      <IonButton expand="block" onClick={() => history.push('/tasks')}>Back to List</IonButton>
    </IonContent>
  );
};

export default TaskDetail;

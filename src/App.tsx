import React from "react";
import {
  IonApp,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonFooter,
  IonRouterOutlet,
  IonMenuButton,
  IonMenu,
  IonList,
  IonItem,
  IonMenuToggle,
  IonIcon,
} from "@ionic/react";
import {
  list,
  addCircleOutline,
  informationCircleOutline,
} from "ionicons/icons";
import TaskList from "./components/TaskList/TaskList";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from "react-router-dom";
import TaskForm from "./components/TaskForm/TaskForm";
import TaskDetail from "./components/TaskDetail/TaskDetail";
import './App.css'

const App: React.FC = () => {
  return (
    <IonApp>
      <IonMenu contentId="main-content">
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonMenuToggle auto-hide="false">
              <IonItem
                button
                routerLink="/tasks"
                routerDirection="none"
                lines="none"
                detail={false}
              >
                <IonIcon slot="start" icon={list} />
                View Tasks
              </IonItem>
              <IonItem
                button
                routerLink="/tasks/new"
                routerDirection="none"
                lines="none"
                detail={false}
              >
                <IonIcon slot="start" icon={addCircleOutline} />
                Add Task
              </IonItem>
              <IonItem
                button
                routerLink="/about"
                routerDirection="none"
                lines="none"
                detail={false}
              >
                <IonIcon slot="start" icon={informationCircleOutline} />
                About
              </IonItem>
            </IonMenuToggle>
          </IonList>
        </IonContent>
      </IonMenu>

      <div id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonMenuButton slot="start" />
            <IonTitle>Your Task Manager</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <Router>
            <IonRouterOutlet>
              <Route path="/tasks" component={TaskList} exact />
              <Route path="/tasks/new" component={TaskForm} exact />
              <Route path="/tasks/:id" component={TaskDetail} exact />
              <Redirect from="/" to="/tasks" exact />
            </IonRouterOutlet>
          </Router>
        </IonContent>

        <IonFooter>
          <IonToolbar>
            <IonTitle>Footer Content</IonTitle>
          </IonToolbar>
        </IonFooter>
      </div>
    </IonApp>
  );
};

export default App;

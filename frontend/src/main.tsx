import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss'

import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {RootLayout} from "./components/layouts/root.tsx";
import {Login} from "./features/auth/login.tsx";
import {Register} from "./features/auth/register.tsx";
import {TaskList} from "./features/tasks/task-list.tsx";
import {Provider} from "react-redux";
import {store} from "./store";

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'register',
                element: <Register />
            },
            {
                path: 'tasks',
                element: <TaskList />
            }
        ]
    }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Provider store={store}>
          <RouterProvider router={router} />
      </Provider>
  </StrictMode>,
)

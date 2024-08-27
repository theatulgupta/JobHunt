import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Home from './components/home/Home';
import Jobs from './components/jobs/Jobs';

// Define the router with routes
const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/jobs',
    element: <Jobs />,
  },
]);

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;

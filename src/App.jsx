import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Browse from './components/browse/browse';
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
  {
    path: '/browse',
    element: <Browse />,
  },
]);

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import AdminJobs from './components/admin/AdminJobs';
import Companies from './components/admin/Companies';
import CompanySetup from './components/admin/CompanySetup';
import CreateCompany from './components/admin/CreateCompany';
import Login from './components/auth/Login';
import Profile from './components/auth/Profile';
import Signup from './components/auth/Signup';
import Browse from './components/browse/browse';
import Home from './components/home/Home';
import JobDescription from './components/jobs/JobDescription';
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
    path: '/description/:id',
    element: <JobDescription />,
  },
  {
    path: '/browse',
    element: <Browse />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },

  // Admin Routes
  {
    path: '/admin/companies',
    element: <Companies />,
  },
  {
    path: '/admin/companies/create',
    element: <CreateCompany />,
  },
  {
    path: '/admin/companies/:id',
    element: <CompanySetup />,
  },
  {
    path: '/admin/jobs',
    element: <AdminJobs />,
  },
]);

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;

import { useDispatch, useSelector } from 'react-redux';

import { setAllJobs } from '@/redux/jobSlice';
import { JOB_API_ENDPOINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react';

const useGetAllJobs = (pollInterval = 5000) => {
  // pollInterval in milliseconds
  const dispatch = useDispatch();
  const job = useSelector((store) => store.job.job);

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const response = await axios.get(`${JOB_API_ENDPOINT}/get`, { withCredentials: true });

        if (response.data.success) {
          dispatch(setAllJobs(response.data.data));
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    // Initial fetch
    fetchAllJobs();

    // Polling
    const intervalId = setInterval(fetchAllJobs, pollInterval);

    // Cleanup
    return () => clearInterval(intervalId);
  }, [dispatch, pollInterval]);

  return job;
};

export default useGetAllJobs;

import { APPLICATION_API_ENDPOINT, JOB_API_ENDPOINT } from '@/utils/constant';
import { daysAgoFunction, formatDate } from '@/utils/helperFunctions';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setJob } from '@/redux/jobSlice';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

const JobDescription = () => {
  const { id: jobId } = useParams();
  const dispatch = useDispatch();

  const { user } = useSelector((store) => store.auth);
  const { job } = useSelector((store) => store.job);

  const isInitiallyApplied = useMemo(
    () => job?.applications?.some((application) => application.applicant === user?._id) || false,
    [job, user],
  );

  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const { data } = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (data.success) {
          dispatch(setJob(data.data));
          setIsApplied(isInitiallyApplied);
        }
      } catch (error) {
        console.error('Error fetching job:', error);
      }
    };
    fetchJob();
  }, [jobId, dispatch, isInitiallyApplied]);

  const handleApplyJob = async () => {
    try {
      const { data } = await axios.get(`${APPLICATION_API_ENDPOINT}/apply/${jobId}`, {
        withCredentials: true,
      });

      if (data.success) {
        setIsApplied(true);
        dispatch(
          setJob({
            ...job,
            applications: [...job.applications, { applicant: user?._id }],
          }),
        );
        toast.success(data.message);
      }
    } catch (error) {
      console.error('Error applying for job:', error);
      toast.error(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="max-w-[90%] mx-auto my-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{job?.title}</h1>

          {/* Job Description Badges */}
          <div className="flex gap-1 mt-4">
            <Badge className="mr-1 font-bold text-blue-700" variant="ghost">
              {job?.openings}
            </Badge>
            <Badge className="text-[#F83002] mr-1 font-bold" variant="ghost">
              {job?.jobType}
            </Badge>
            <Badge className="text-[#7209B7] mr-1 font-bold" variant="ghost">
              {job?.salary / 100000}LPA
            </Badge>
          </div>
        </div>
        <Button
          onClick={handleApplyJob}
          disabled={isApplied}
          className={`rounded-lg ${
            isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#6A38C2] hover:bg-[#4a15a6]'
          }`}
        >
          {isApplied ? 'Already Applied' : 'Apply Now'}
        </Button>
      </div>

      {/* Job Description */}
      <h1 className="pt-4 pb-2 font-medium border-b-2 border-b-gray-300">Job Description</h1>
      <div className="my-4">
        <h1 className="my-1 font-bold">
          Role <span className="pl-4 font-normal text-gray-800">{job?.title}</span>
        </h1>
        <h1 className="my-1 font-bold">
          Location <span className="pl-4 font-normal text-gray-800">{job?.location}</span>
        </h1>
        <h1 className="my-1 font-bold">
          Description <span className="pl-4 font-normal text-gray-800">{job?.description}</span>
        </h1>
        <h1 className="my-1 font-bold">
          Experience <span className="pl-4 font-normal text-gray-800">{job?.experience}</span>
        </h1>
        <h1 className="my-1 font-bold">
          Salary <span className="pl-4 font-normal text-gray-800">{job?.salary / 100000}LPA</span>
        </h1>
        <h1 className="my-1 font-bold">
          Total Applicants{' '}
          <span className="pl-4 font-normal text-gray-800">{job?.applications.length}</span>
        </h1>
        <h1 className="my-1 font-bold">
          Posted On
          <span className="pl-4 font-normal text-gray-800">{formatDate(job?.createdAt)}</span>
          <span className="ml-2">
            {daysAgoFunction(job?.createdAt) === 0
              ? '(Today)'
              : `(${daysAgoFunction(job?.createdAt)} days ago)`}
          </span>
        </h1>
      </div>
    </div>
  );
};

export default JobDescription;

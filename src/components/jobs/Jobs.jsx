import { useSelector } from 'react-redux';
import Navbar from '../shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';

const Jobs = () => {
  const { allJobs } = useSelector((store) => store.job);
  return (
    <div>
      <Navbar />
      <div className="mx-auto mt-5 max-w-[90%]">
        <div className="flex gap-5">
          <div className="w-[20%]">
            <FilterCard />
          </div>
          {allJobs.length <= 0 ? (
            <span>No Jobs Found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5 no-scrollbar">
              <div className="grid grid-cols-3 gap-4">
                {allJobs.map((job, index) => (
                  <div key={job._id}>
                    <Job job={job} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;

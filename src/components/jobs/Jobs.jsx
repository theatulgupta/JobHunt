import Navbar from '../shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';

const jobsArray = [1, 2, 3, 4, 5, 6];

const Jobs = () => {
  return (
    <div>
      <Navbar />
      <div className="mx-auto mt-5 max-w-[90%]">
        <div className="flex gap-5">
          <div className="w-[20%]">
            <FilterCard />
          </div>
          {jobsArray.length <= 0 ? (
            <span>No Jobs Found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5 no-scrollbar">
              <div className="grid grid-cols-3 gap-4">
                {jobsArray.map((job, index) => (
                  <div>
                    <Job />
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

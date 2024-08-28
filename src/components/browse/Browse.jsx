import Job from '../jobs/Job';
import Navbar from '../shared/Navbar';

const randomJobs = [1, 2, 3, 4, 5, 6];

const Browse = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-[90%] mx-auto my-10">
        <h1 className="my-10 text-xl font-bold">Search Results ({randomJobs.length})</h1>
        <div className="grid grid-cols-3 gap-4">
          {randomJobs.map((item, index) => (
            <Job />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Browse;

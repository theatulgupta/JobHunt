import { Badge } from '../ui/badge';

const LatestJobCard = ({ job }) => {
  return (
    <div className="p-5 bg-white border border-gray-100 rounded-md shadow-xl cursor-pointer">
      <div>
        <h1 className="text-lg font-medium">{job?.title}</h1>
        <p className="text-sm text-gray-500">{job?.location}</p>
      </div>
      <div>
        <h1 className="my-2 text-lg font-bold">{job?.title}</h1>
        <p className="text-sm text-gray-600 line-clamp-2">{job?.description}</p>
      </div>
      <div className="overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 mt-4 truncate min-w-fit">
          <Badge className="font-bold text-blue-700" variant="ghost">
            {job?.openings}
          </Badge>
          <Badge className="text-[#F83002] font-bold" variant="ghost">
            {job?.jobType}
          </Badge>
          <Badge className="text-[#7209B7] font-bold" variant="ghost">
            {`${job?.salary / 100000}LPA`}
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default LatestJobCard;

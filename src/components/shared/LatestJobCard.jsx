import { Badge } from '../ui/badge';

const LatestJobCard = () => {
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer">
      <div>
        <h1 className="font-medium text-lg">Company Name</h1>
        <p className="text-sm text-gray-500">India</p>
      </div>
      <div>
        <h1 className="text-lg my-2 font-bold">Job Title</h1>
        <p className="text-sm text-gray-600">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        </p>
      </div>
      <div className="mt-4">
        <Badge className="mr-1 text-bule-700 font-bold" variant="ghost">
          12 Openings
        </Badge>
        <Badge className="text-[#F83002] mr-1  font-bold" variant="ghost">
          Part Time
        </Badge>
        <Badge className="text-[#7209B7] mr-1 font-bold" variant="ghost">
          12LPA
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCard;

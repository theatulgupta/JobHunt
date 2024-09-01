import { Avatar, AvatarImage } from '../ui/avatar';

import { LOGO_URL } from '@/utils/constant';
import { daysAgoFunction } from '@/utils/helperFunctions';
import { Bookmark } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

const Job = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div className="p-5 bg-white border border-gray-100 rounded-md shadow-xl">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {daysAgoFunction(job?.createdAt) === 0
            ? 'Today'
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>
      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={LOGO_URL} />
          </Avatar>
        </Button>
        <div>
          <h1 className="text-lg font-medium">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500">{job?.location}</p>
        </div>
      </div>
      <div>
        <h1 className="my-2 text-lg font-bold">{job?.title}</h1>
        <p className="text-sm text-gray-600 line-clamp-2">{job?.description}</p>
      </div>
      <div className="overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 mt-4 truncate min-w-fit">
          <Badge className="font-bold text-blue-700" variant="ghost">
            {job?.position} Positions
          </Badge>
          <Badge className="text-[#F83002] font-bold" variant="ghost">
            {job?.jobType}
          </Badge>
          <Badge className="text-[#7209b7] font-bold" variant="ghost">
            {job?.salary / 100000}LPA
          </Badge>
        </div>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button onClick={() => navigate(`/description/${job?._id}`)} variant="outline">
          Details
        </Button>
        <Button className="bg-[#7209b7]">Save For Later</Button>
      </div>
    </div>
  );
};

export default Job;

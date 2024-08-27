import { Avatar, AvatarImage } from '../ui/avatar';

import { LOGO_URL } from '@/utils/constant';
import { Bookmark } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

const Job = () => {
  return (
    <div className="p-5 bg-white border border-gray-100 rounded-md shadow-xl">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">2 days ago</p>
        <Button variant="ghost" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>
      <div className="flex items-center gap-2 my-2">
        <Button classNamep-6 variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={LOGO_URL} alt="@shadcn" />
          </Avatar>
        </Button>
        <div className="flex flex-col ml-1">
          <h1 className="text-lg font-medium">Company Name</h1>
          <p className="text-sm text-gray-500">India</p>
        </div>
      </div>

      <div>
        <h1 className="mt-2 mb-1 text-lg font-bold">Title</h1>
        <p className="text-sm text-gray-600">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil, voluptatum!
        </p>
      </div>

      <div className="mt-4">
        <Badge className="mr-1 font-bold text-bule-700" variant="ghost">
          12 Openings
        </Badge>
        <Badge className="text-[#F83002] mr-1  font-bold" variant="ghost">
          Part Time
        </Badge>
        <Badge className="text-[#7209B7] mr-1 font-bold" variant="ghost">
          12LPA
        </Badge>
      </div>

      <div className="flex flex-col justify-center gap-2 mt-4 items-left">
        <Button variant="outline">Details</Button>
        <Button variant="ghost" className="bg-[#6A38C2] text-white">
          Save For Later
        </Button>
      </div>
    </div>
  );
};

export default Job;

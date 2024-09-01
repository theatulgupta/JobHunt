import { Contact, Mail, Pen } from 'lucide-react';
import { Avatar, AvatarImage } from '../ui/avatar';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import AppliedJobTable from '../jobs/AppliedJobTable';
import Navbar from '../shared/Navbar';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import UpdateProfileDialog from './UpdateProfileDialogue';

const isResume = true;

const Profile = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const skills = user?.profile?.skills;
  return (
    <div>
      <Navbar />
      <div className="max-w-[70%] mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-8">
            <Avatar className="w-24 h-24">
              <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
            </Avatar>
            <div>
              <h1 className="text-xl font-medium">{user?.fullname}</h1>
              <p>{user?.profile?.bio}</p>
            </div>
          </div>
          <Button onClick={() => setOpen(true)} className="text-right" variant="outline">
            <Pen />
          </Button>
        </div>
        <div className="flex flex-col gap-2 my-5">
          <div className="flex items-center gap-3">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <Contact />
            <span>{user?.phone}</span>
          </div>
        </div>

        {/* Skills Section */}
        <div className="my-3">
          <Label className="text-lg font-semibold">Skills</Label>
          <div className="flex flex-wrap gap-1.5 my-2 overflow-x-auto no-scrollbar">
            {skills?.length !== 0 ? (
              skills?.map((skill, index) => (
                <Badge key={index} className="flex items-center px-3 truncate min-w-fit">
                  {skill}
                </Badge>
              ))
            ) : (
              <span>Not Available</span>
            )}
          </div>
        </div>

        {/* Resume Section */}
        <div className="grid items-center w-full max-w-sm gap-1 my-3">
          <Label className="text-lg font-semibold">Resume</Label>
          {isResume ? (
            <a
              className="w-full text-blue-500 cursor-pointer hover:underline"
              target="_blank"
              href={user?.profile?.resume}
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span>Not Available</span>
          )}
        </div>
      </div>

      {/* Jobs Section */}
      <div className="my-3 max-w-[69%] mx-auto bg-white rounded-2xl">
        <Label className="text-lg font-semibold">Applied Jobs</Label>
        <AppliedJobTable />
      </div>

      {/* Update Profile Dialogue */}
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;

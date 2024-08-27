import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, User2 } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const user = false;
  return (
    <div className="bg-white mx-2">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold">
            Job<span className="text-[#F83002]">Hunt</span>
          </h1>
        </div>
        <div className="flex items-center gap-12">
          <ul className="flex gap-5 font-medium items-center">
            <li>Home</li>
            <li>Jobs</li>
            <li>Browse</li>
          </ul>
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#4a15a6]">Signup</Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div>
                  <div className="flex gap-2 items-center justify-left">
                    <Avatar className="cursor-pointer">
                      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    </Avatar>
                    <div className="ml-2">
                      <h4 className="font-medium">Atul Kumar Gupta</h4>
                      <p className="text-sm text-muted-foreground">Lorem ipsum dolor sit amet.</p>
                    </div>
                  </div>
                  <div className="flex flex-col text-gray-600 my-2 ml-2">
                    <div className="flex items-center gap-2 cursor-pointer">
                      <User2 />
                      <Button variant="ghost">View Profile</Button>
                    </div>
                    <div className="flex items-center gap-2 cursor-pointer">
                      <LogOut />
                      <Button variant="ghost">Logout</Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

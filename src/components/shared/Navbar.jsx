import { LogOut, User2 } from 'lucide-react';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

import { Button } from '@/components/ui/button';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const user = useSelector((store) => store.auth.user);
  return (
    <div className="mx-2 bg-white">
      <div className="flex items-center justify-between h-16 mx-auto max-w-[90%]">
        <div>
          <h1 className="text-2xl font-bold">
            Job<span className="text-[#F83002]">Hunt</span>
          </h1>
        </div>
        <div className="flex items-center gap-12">
          <ul className="flex items-center gap-5 font-medium">
            <li>
              <Button className="text-md" variant="ghost">
                <Link to="/">Home</Link>
              </Button>
            </li>
            <li>
              <Button className="text-md" variant="ghost">
                <Link to="/jobs">Jobs</Link>
              </Button>
            </li>
            <li>
              <Button className="text-md" variant="ghost">
                <Link to="/browse">Browse</Link>
              </Button>
            </li>
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
                  <div className="flex items-center gap-2 justify-left">
                    <Avatar className="cursor-pointer">
                      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    </Avatar>
                    <div className="ml-2">
                      <h4 className="font-medium">Atul Kumar Gupta</h4>
                      <p className="text-sm text-muted-foreground">Lorem ipsum dolor sit amet.</p>
                    </div>
                  </div>
                  <div className="flex flex-col my-2 ml-2 text-gray-600">
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

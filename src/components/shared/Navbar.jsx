import { LogOut, User2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

import { Button } from '@/components/ui/button';
import { setUser } from '@/redux/authSlice';
import { USER_API_ENDPOINT } from '@/utils/constant';
import axios from 'axios';
import { toast } from 'sonner';

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${USER_API_ENDPOINT}/logout`, {
        withCredentials: true,
      });

      if (response.data.success) {
        dispatch(setUser(null));
        navigate('/');
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Logout failed.');
    }
  };

  return (
    <div className="mx-2 bg-white">
      <div className="flex items-center justify-between h-16 mx-auto max-w-[90%]">
        <h1 className="text-2xl font-bold">
          Job<span className="text-[#F83002]">Hunt</span>
        </h1>
        <div className="flex items-center gap-12">
          <ul className="flex items-center gap-5 font-medium">
            {user && user.role === 'recruiter' ? (
              <>
                <li>
                  <Button className="text-md" variant="ghost">
                    <Link to="/admin/companies">Companies</Link>
                  </Button>
                </li>
                <li>
                  <Button className="text-md" variant="ghost">
                    <Link to="/admin/jobs">Jobs</Link>
                  </Button>
                </li>
              </>
            ) : (
              <>
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
              </>
            )}
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
                  <AvatarImage src={user.profile?.profilePhoto} />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div>
                  <div className="flex items-center gap-2">
                    <Avatar className="cursor-pointer">
                      <AvatarImage src={user.profile?.profilePhoto} />
                    </Avatar>
                    <div className="ml-2">
                      <h4 className="font-medium">{user.fullname}</h4>
                      <p className="text-sm text-muted-foreground">{user.profile?.bio}</p>
                    </div>
                  </div>
                  <div className="flex flex-col my-2 text-gray-600">
                    {user && (
                      <>
                        {user.role === 'student' && (
                          <div className="flex items-center gap-2 cursor-pointer">
                            <User2 />
                            <Button variant="ghost">
                              <Link to="/profile">View Profile</Link>
                            </Button>
                          </div>
                        )}
                        <div className="flex items-center gap-2 cursor-pointer">
                          <LogOut />
                          <Button onClick={handleLogout} variant="ghost">
                            Logout
                          </Button>
                        </div>
                      </>
                    )}
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

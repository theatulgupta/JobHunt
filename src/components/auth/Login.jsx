import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Loader2 } from 'lucide-react';
import Navbar from '../shared/Navbar';
import { RadioGroup } from '../ui/radio-group';
import RadioOption from '../shared/RadioOption';
import { USER_API_ENDPOINT } from '@/utils/constant';
import axios from 'axios';
import { setLoading } from '@/redux/authSlice';
import { toast } from 'sonner';
import { useState } from 'react';

const Login = () => {
  const [input, setInput] = useState({
    email: '',
    password: '',
    role: '',
  });

  const navigate = useNavigate();
  const loading = useSelector((store) => store.auth.loading);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({ ...prevInput, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input.email || !input.password || !input.role) {
      toast.error('All fields are required.');
      return;
    }

    try {
      dispatch(setLoading(true));
      const response = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      if (response.data.success) {
        navigate('/');
        toast.success(response.data.message);
      }
    } catch (error) {
      if (error.response.data) {
        toast.error(error.response.data.message);
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto mt-2">
        <form onSubmit={handleSubmit} className="w-1/2 border border-gray-200 rounded-md p-4">
          <h1 className="font-bold text-2xl mb-5">Login</h1>

          <div className="my-2">
            <Label>Email Address</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={handleChange}
              placeholder="johndoe@email.com"
            />
          </div>

          <div className="my-2">
            <Label>Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={handleChange}
              placeholder="Type your Password"
            />
          </div>

          <RadioGroup className="flex items-center gap-4 my-5">
            <RadioOption
              label="Student"
              value="student"
              checked={input.role === 'student'}
              onChange={handleChange}
            />
            <RadioOption
              label="Recruiter"
              value="recruiter"
              checked={input.role === 'recruiter'}
              onChange={handleChange}
            />
          </RadioGroup>

          {loading ? (
            <Button className="w-full my-2">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait...
            </Button>
          ) : (
            <Button className="w-full my-2" type="submit">
              Login
            </Button>
          )}

          <div className="flex items-center justify-center text-sm">
            <span>Don't have an account?</span>
            <Link className="text-[#F83002] mx-1 font-medium" to="/signup">
              Signup
            </Link>
            <span>here</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

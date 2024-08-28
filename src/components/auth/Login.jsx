import { setLoading, setUser } from '@/redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { USER_API_ENDPOINT } from '@/utils/constant';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import Navbar from '../shared/Navbar';
import RadioOption from '../shared/RadioOption';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { RadioGroup } from '../ui/radio-group';

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
      const res = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.data.user));
        navigate('/');
        toast.success(res.data.message);
      } else {
        toast.error('Invalid response from server');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Failed to login. Please try again later');
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center mx-auto mt-2 max-w-7xl">
        <form onSubmit={handleSubmit} className="w-1/2 p-4 border border-gray-200 rounded-md">
          <h1 className="mb-5 text-2xl font-bold">Login</h1>

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
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
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

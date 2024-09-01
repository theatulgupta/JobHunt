import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { setLoading } from '@/redux/authSlice';
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

const Signup = () => {
  const [input, setInput] = useState({
    fullname: '',
    email: '',
    phone: '',
    password: '',
    role: '',
    file: null,
  });

  const navigate = useNavigate();
  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({ ...prevInput, [name]: value }));
  };

  const handleFileChange = (e) => {
    setInput((prevInput) => ({ ...prevInput, file: e.target.files?.[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !input.fullname ||
      !input.email ||
      !input.phone ||
      !input.password ||
      !input.role ||
      !input.file
    ) {
      toast.error('All fields are required.');
      return;
    }

    const formData = {
      fullname: input.fullname.trim(),
      email: input.email.trim(),
      phone: input.phone.trim(),
      password: input.password.trim(),
      role: input.role,
      file: input.file,
    };

    try {
      dispatch(setLoading(true));
      const response = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
      if (response.data.success) {
        navigate('/');
        toast.success(response?.data?.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center mx-auto mt-2 max-w-7xl">
        <form onSubmit={handleSubmit} className="w-1/2 p-4 border border-gray-200 rounded-md">
          <h1 className="mb-5 text-2xl font-bold">Sign Up</h1>

          <div className="my-2">
            <Label>Full Name</Label>
            <Input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={handleChange}
              placeholder="John Doe"
            />
          </div>

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
            <Label>Phone</Label>
            <Input
              type="text"
              value={input.phone}
              name="phone"
              onChange={handleChange}
              placeholder="77XXXXXX25"
            />
          </div>

          <div className="my-2">
            <Label>Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={handleChange}
              placeholder="Strong Password"
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

          <div className="flex items-center gap-2 my-2">
            <Label>Profile</Label>
            <Input
              accept="image/*"
              type="file"
              name="file"
              onChange={handleFileChange}
              className="cursor-pointer"
            />
          </div>

          {loading ? (
            <Button className="w-full my-2">
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Please wait...
            </Button>
          ) : (
            <Button className="w-full my-2" type="submit">
              Signup
            </Button>
          )}

          <div className="flex items-center justify-center text-sm">
            <span>Already have an account?</span>
            <Link className="text-[#F83002] mx-1 font-medium" to="/login">
              Login
            </Link>
            <span>here</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;

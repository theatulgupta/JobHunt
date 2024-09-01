import { useCallback, useState } from 'react';

import { setCompany } from '@/redux/companySlice';
import { COMPANY_API_ENDPOINT } from '@/utils/constant';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Navbar from '../shared/Navbar';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

const CreateCompany = () => {
  const [companyName, setCompanyName] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCancel = useCallback(() => {
    navigate('/admin/companies');
  }, [navigate]);

  // Register a new company and handle navigation
  const registerNewCompany = async () => {
    try {
      const response = await axios.post(
        `${COMPANY_API_ENDPOINT}/register`,
        { companyName },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      );

      if (response.data.success) {
        const companyId = response.data.data._id;
        dispatch(setCompany(response.data.data));
        toast.success(response.data.message);
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-[50%] mx-auto my-10">
        <div className="my-10">
          <h1 className="text-2xl font-bold">Your Company Name</h1>
          <p className="text-gray-500">
            What would you like to give your company name? You can change it later.
          </p>
        </div>
        <Label>Company Name</Label>
        <Input
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="my-2"
          placeholder="JobHunt, Google etc..."
          type="text"
        />
        <div className="flex items-center gap-4 my-5">
          <Button onClick={handleCancel} variant="outline">
            Cancel
          </Button>
          <Button onClick={registerNewCompany}>Continue</Button>
        </div>
      </div>
    </div>
  );
};

export default CreateCompany;

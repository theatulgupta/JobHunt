import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import useGetCompany from '@/hooks/useGetCompany'; // Import your custom hook
import { COMPANY_API_ENDPOINT } from '@/utils/constant';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import Navbar from '../shared/Navbar';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

const CompanySetup = () => {
  const [input, setInput] = useState({
    name: '',
    description: '',
    website: '',
    location: '',
    file: null,
  });
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { company } = useSelector((state) => state.company);

  useGetCompany({ companyId: id });

  useEffect(() => {
    if (company) {
      setInput({
        name: company.name || '',
        description: company.description || '',
        website: company.website || '',
        location: company.location || '',
        file: null,
      });
    }
  }, [company]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setInput((prev) => ({ ...prev, file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('name', input.name);
    formData.append('description', input.description);
    formData.append('website', input.website);
    formData.append('location', input.location);

    if (input.file) {
      formData.append('file', input.file);
    }

    try {
      const response = await axios.put(`${COMPANY_API_ENDPOINT}/update/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/admin/companies');
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-[50%] mx-auto my-10">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              className="flex items-center gap-2 font-semibold text-gray-500"
              onClick={() => window.history.back()}
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="text-xl font-bold">Company Setup</h1>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Company Name</Label>
              <Input type="text" name="name" value={input.name} onChange={handleInputChange} />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label>Website</Label>
              <Input
                type="text"
                name="website"
                value={input.website}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label>Upload Logo</Label>
              <Input type="file" name="file" accept="image/*" onChange={handleFileChange} />
            </div>
          </div>
          <Button type="submit" className="w-full mt-8" disabled={loading}>
            {loading ? 'Updating...' : 'Update'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;

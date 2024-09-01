import { useDispatch, useSelector } from 'react-redux';
import { Dialog, DialogContent, DialogFooter, DialogTitle } from '../ui/dialog';

import { setUser } from '@/redux/authSlice';
import { USER_API_ENDPOINT } from '@/utils/constant';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

const UpdateProfileDialogue = ({ open, setOpen }) => {
  const { fullname, email, phone, profile } = useSelector((store) => store.auth.user) || {};
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    fullname: fullname || '',
    email: email || '',
    phone: phone || '',
    bio: profile?.bio || '',
    skills: profile?.skills || [],
    file: profile?.resume || null,
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file' && files[0] && files[0].type !== 'application/pdf') {
      toast.error('Please select a valid PDF file.');
      return;
    }
    setInput((prev) => ({
      ...prev,
      [name]: name === 'skills' ? value.split(',') : files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('fullname', input.fullname.trim());
    formData.append('email', input.email.trim());
    formData.append('phone', input.phone);
    formData.append('bio', input.bio.trim());

    const skills = input.skills.map((skill) => skill.trim());
    formData.append('skills', skills.join(','));

    if (input.file && input.file.size > 5 * 1024 * 1024) {
      toast.error('File size exceeds the limit of 5MB.');
      return;
    }

    if (input.file) {
      formData.append('file', input.file);
    }

    try {
      setLoading(true);
      const response = await axios.put(`${USER_API_ENDPOINT}/profile/update`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      if (response.data.success) {
        dispatch(setUser(response?.data?.data?.user));
        toast.success(response?.data?.message);
        setOpen(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} onOpenChange={() => setOpen(false)}>
      <DialogContent
        aria-describedby="profile-update-dialog-description"
        className="sm:max-w-[425px]"
      >
        <DialogTitle>Update Profile</DialogTitle>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {[
              { label: 'Name', type: 'text', name: 'fullname', value: input.fullname },
              { label: 'Email', type: 'email', name: 'email', value: input.email },
              { label: 'Phone', type: 'number', name: 'phone', value: input.phone },
              { label: 'Bio', type: 'text', name: 'bio', value: input.bio },
              { label: 'Skills', type: 'text', name: 'skills', value: input.skills.join(',') },
            ].map(({ label, name, value }) => (
              <div key={name} className="grid items-center grid-cols-4 gap-4">
                <Label htmlFor={name} className="text-right">
                  {label}
                </Label>
                <Input
                  id={name}
                  name={name}
                  value={value}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
            ))}
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="resume" className="text-right">
                Resume
              </Label>
              <Input
                id="resume"
                name="file"
                type="file"
                accept="application/pdf"
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button className="w-full my-2" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Please wait...
                </>
              ) : (
                'Update'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>

      <div id="profile-update-dialog-description" hidden>
        This dialog allows you to update your profile information.
      </div>
    </Dialog>
  );
};

export default UpdateProfileDialogue;

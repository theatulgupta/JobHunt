import { useNavigate } from 'react-router-dom';
import Navbar from '../shared/Navbar';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import CompaniesTable from './CompaniesTable';

const Companies = () => {
  const navigate = useNavigate();

  const handleNewCompanyClick = () => {
    navigate('/admin/companies/create');
  };

  return (
    <div className="max-w-[70%] mx-auto my-10">
      <Navbar />
      <div className="flex items-center justify-between my-5">
        <Input className="w-fit" placeholder="Filter by name" />
        <Button onClick={handleNewCompanyClick}>New Company</Button>
      </div>
      <CompaniesTable />
    </div>
  );
};

export default Companies;

import { setCompany } from '@/redux/companySlice';
import { COMPANY_API_ENDPOINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useGetCompany = ({ companyId }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await axios.get(`${COMPANY_API_ENDPOINT}/get/${companyId}`, {
          withCredentials: true,
        });

        if (response.data.success) {
          dispatch(setCompany(response.data.data));
        } else {
          console.error('Failed to fetch company:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching company:', error);
      }
    };

    fetchCompany();
  }, [dispatch, companyId]);
};

export default useGetCompany;

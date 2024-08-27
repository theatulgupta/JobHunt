import axios from 'axios';

const handleError = (error) => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      console.error('Server responded with an error:', error.response.data);
      console.error('Status code:', error.response.status);
      console.error('Headers:', error.response.headers);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error:', error.message);
    }
  } else {
    console.error('Error:', error.message);
  }
};

export default handleError;

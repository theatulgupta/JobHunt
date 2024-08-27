import { Input } from '../ui/input';
import { Label } from '../ui/label';

const RadioOption = ({ label, value, checked, onChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <Input
        type="radio"
        name="role"
        value={value}
        checked={checked}
        onChange={onChange}
        className="cursor-pointer"
      />
      <Label>{label}</Label>
    </div>
  );
};

export default RadioOption;

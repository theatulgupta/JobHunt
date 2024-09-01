import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

import { Label } from '../ui/label';

const filterData = [
  {
    filterType: 'Location',
    array: ['Delhi NCR', 'Pune', 'Bangalore', 'Chennai', 'Hyderabad', 'Mumbai', 'Indore'],
  },
  {
    filterType: 'Industry',
    array: ['IT', 'Finance', 'Marketing', 'Healthcare', 'Education', 'Manufacturing', 'Retail'],
  },
  {
    filterType: 'Salary',
    array: [
      '₹10,000 - ₹20,000',
      '₹20,000 - ₹30,000',
      '₹30,000 - ₹40,000',
      '₹40,000 - ₹50,000',
      '₹50,000+',
    ],
  },
];

const FilterCard = () => {
  return (
    <div className="w-full p-4 rounded-md bg-gray-50">
      <h1 className="text-lg font-bold">Filter Jobs</h1>
      <hr className="my-2" />
      <RadioGroup>
        {filterData.map((industry, index) => (
          <div key={index} className="flex flex-col gap-2">
            <h1 className="text-lg font-semibold">{industry.filterType}</h1>
            {industry.array.map((item, index) => (
              <div key={`${industry.filterType}-${index}`} className="flex gap-2">
                <RadioGroupItem id={item} name={industry.filterType} value={item} />
                <Label htmlFor={item}>{item}</Label>
              </div>
            ))}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;

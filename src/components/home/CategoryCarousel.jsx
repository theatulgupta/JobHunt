import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';

import { Button } from '../ui/button';

const CategoryCarousel = () => {
  const categories = [
    'Frontend Developer',
    'Backend Developer',
    'Data Science',
    'Graphic Designer',
    'Full Stack Developer',
    'Machine Learning Engineer',
    'Blockchain Developer',
    'Cyber Security Expert',
    'Web Developer',
    'Mobile App Developer',
    'UI/UX Designer',
    'DevOps Engineer',
    'Artificial Intelligence Engineer',
    'Data Analyst',
    'Business Intelligence Developer',
    'Cloud Computing Professional',
    'Network Architect',
    'Database Administrator',
    'Software Engineer',
    'IT Project Manager',
  ];

  return (
    <Carousel className="w-full max-w-xl mx-auto my-20">
      <CarouselContent gap={1}>
        {categories.map((category, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <Button className="rounded-full" variant="outline">
              {category}
            </Button>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default CategoryCarousel;

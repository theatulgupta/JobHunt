import { Avatar, AvatarImage } from '../ui/avatar';
import { Edit2, MoreHorizontal } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

import { LOGO_URL } from '@/utils/constant';

const CompaniesTable = () => {
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <Avatar>
                <AvatarImage src={LOGO_URL} />
              </Avatar>
            </TableCell>
            <TableCell>Company Name</TableCell>
            <TableCell>01-09-2024</TableCell>
            <TableCell className="cursor-pointer">
              <Popover>
                <PopoverTrigger>
                  <MoreHorizontal />
                </PopoverTrigger>
                <PopoverContent className="w-32">
                  <div className="flex items-center gap-2 cursor-pointer w-fit">
                    <Edit2 className="w-4" />
                    <span>Edit</span>
                  </div>
                </PopoverContent>
              </Popover>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;

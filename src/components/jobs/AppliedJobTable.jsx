import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

import { Badge } from '../ui/badge';

const AppliedJobTable = () => {
  return (
    <div className="my-2">
      <Table>
        <TableCaption>A list of your applied jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[1, 2].map((item, index) => (
            <TableRow key={index}>
              <TableCell>29-08-2024</TableCell>
              <TableCell>Frontend Developer</TableCell>
              <TableCell>Google</TableCell>
              <TableCell>
                <Badge>Selected</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;

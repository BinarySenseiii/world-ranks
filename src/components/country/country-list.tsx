import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const CountryList = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Flag</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Population</TableHead>
          <TableHead>
            Area(Km<sup>2</sup>)
          </TableHead>

          <TableHead>Region</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>INV001</TableCell>
          <TableCell>United States</TableCell>
          <TableCell>1,439,323,776</TableCell>
          <TableCell>9,372,610</TableCell>
          <TableCell>Americas</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default CountryList;

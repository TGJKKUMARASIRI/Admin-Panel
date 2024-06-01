import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';
import { useNavigate } from 'react-router-dom';
import { fetchCompanies } from './GetCompanyList';

// const sample = [
//   { id: 0, dessert: 'Frozen yoghurt', calories: 159, fat: 6.0, carbs: 24, protein: 4.0 },
//   { id: 1, dessert: 'Ice cream sandwich', calories: 237, fat: 9.0, carbs: 37, protein: 4.3 },
//   { id: 2, dessert: 'Eclair', calories: 262, fat: 16.0, carbs: 24, protein: 6.0 },
//   { id: 3, dessert: 'Cupcake', calories: 305, fat: 3.7, carbs: 67, protein: 4.3 },
//   { id: 4, dessert: 'Gingerbread', calories: 356, fat: 16.0, carbs: 49, protein: 3.9 },
// ];

function createData(id, dessert, calories, fat, carbs, protein) {
  return { id, dessert, calories, fat, carbs, protein };
}

// Create rows data from sample
// const rows = sample.map((item) =>
//   createData(item.id, item.dessert, item.calories, item.fat, item.carbs, item.protein)
// );

const columns = [
  {
    width: 200,
    label: 'Company List',
    dataKey: 'name',
  }
];

// const rows = Array.from({ length: 200 }, (_, index) => {
//   const randomSelection = sample[Math.floor(Math.random() * sample.length)];
//   return createData(index, ...randomSelection);
// });

const VirtuosoTableComponents = {
  Scroller: React.forwardRef((props, ref) => (
        <TableContainer 
        component={Paper} 
        {...props} 
        ref={ref} 
        sx={{ 
          // Set the styles for the scroller
          overflow: 'auto', // Enable scrolling
          '&::-webkit-scrollbar': {
            width: 0, // Hide the scrollbar in webkit browsers (Chrome, Safari, etc.)
          },
          scrollbarWidth: 'none', // Hide the scrollbar in Firefox
        }}
        />
  )),
  Table: (props) => (
    <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
  ),
  TableHead,
  TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
  TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
};

function fixedHeaderContent() {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align={column.numeric || false ? 'right' : 'left'}
          style={{ width: column.width }}
          sx={{
            backgroundColor: 'background.paper',
          }}
        >
          {/* {column.label} */}
        </TableCell>
      ))}
    </TableRow>
  );
}

// function rowContent(_index, row) {
//   return (
//     <React.Fragment>
//       {columns.map((column) => (
//         <TableCell
//           key={column.dataKey}
//           align={column.numeric || false ? 'right' : 'left'}
//         >
//           {row[column.dataKey]}
//         </TableCell>
//       ))}
//     </React.Fragment>
//   );
// }

export default function CompanyListTable() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const companies = await fetchCompanies();
        setRows(companies);
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };

    fetchData();
  }, []);

  const rowContent = (_index, row) => (
    <React.Fragment>
      <TableCell key="name" align="left">
        {row.name}
      </TableCell>
    </React.Fragment>
  );

  // const rowContent = (_index, row) => (
  //   <React.Fragment>
  //     {columns.map((column) => (
  //       <TableCell
  //         key={column.dataKey}
  //         align={column.numeric || false ? 'right' : 'left'}
  //       >
  //         {row[column.dataKey]}
  //       </TableCell>
  //     ))}
  //   </React.Fragment>
  // )

  return (
    <TableContainer style={{ height: '70vh', width: '100%', boxShadow: 'none' }}>
      <TableVirtuoso
        data={rows}
        components={{
          ...VirtuosoTableComponents,
          TableRow: ({ item, ...props }) => (
            <TableRow
              hover
              {...props}
              onClick={() => navigate(`/details/${item._id}`)}
              style={{ cursor: 'pointer' }}
            />
          ),
        }}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </TableContainer>
  );
}

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

const columns = [
  {
    width: 200,
    label: 'Company List',
    dataKey: 'name',
  }
];

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

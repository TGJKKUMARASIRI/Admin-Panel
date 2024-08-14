import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { fetchCompanies } from './GetCompanyList';
import colors from '../../../colors';

const columns = [
  {
    width: 200,
    // label: 'Company List',
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
        overflow: 'auto',
        '&::-webkit-scrollbar': {
          width: 0,
        },
        scrollbarWidth: 'none',
      }}
    />
  )),
  Table: (props) => (
    <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
  ),
  TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
  TableBody: React.forwardRef((props, ref) => <tbody {...props} ref={ref} />),
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
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

export default function CompanyListTable() {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const navigate = useNavigate();

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

  const handleClickOpen = (company) => {
    setSelectedCompany(company);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateSubscription = () => {
    if (selectedCompany) {
      navigate(`/Create-Subscription/${selectedCompany._id}`);
    }
  };

  const rowContent = (_index, row) => (
    <React.Fragment>
      <TableCell key="name" align="left">
        {row.name}
      </TableCell>
    </React.Fragment>
  );

  return (
    <div>
      <TableContainer style={{ height: '70vh', width: '100%', boxShadow: 'none' }}>
        <TableVirtuoso
          data={rows}
          components={{
            ...VirtuosoTableComponents,
            TableRow: ({ item, ...props }) => (
              <TableRow
                hover
                {...props}
                onClick={() => handleClickOpen(item)}
                style={{ cursor: 'pointer' }}
              />
            ),
          }}
          fixedHeaderContent={fixedHeaderContent}
          itemContent={rowContent}
        />
      </TableContainer>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <Button
            onClick={handleCreateSubscription}
            color="primary"
            sx={{
              backgroundColor: colors.primary,
              color: colors.secondary,
              '&:hover': {
                backgroundColor: colors.hover2,
              }
            }}
          >
            Create Subscription
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
// import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
// import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/system';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListIcon from '@mui/icons-material/List';
import { useNavigate } from 'react-router-dom';


const drawerWidth = 240;

const ColoredListItem = styled(ListItem)(({ theme }) => ({
  '&.sublist': {
    paddingLeft: 15,
  }
}));

export default function Sidenave() {
  const [isCompanyDetailsOpen, setIsCompanyDetailsOpen] = React.useState(false);

  const toggleCompanyDetails = () => {
    setIsCompanyDetailsOpen(!isCompanyDetailsOpen);
  };

  const nevigate = useNavigate();

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer 
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            backgroundColor: '#00000e',
            boxSizing: 'border-box',
            color: '#dbdbef'
          },
          '& .MuiListItem-root': {
            '&:hover': {
              backgroundColor: '#29292e', // Set the hover color to a darker shade
            },
          },
          '& .MuiSvgIcon-root': {
            color: '#dbdbef', // Set the color of icons to white
          },
          '& .MuiDivider-root': {
            backgroundColor: '#dbdbef', // Set the color of the divider to white
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          <ListItem disablePadding onClick={() => { nevigate('/') }}>
            <ListItemButton>
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding onClick={toggleCompanyDetails}>
            <ListItemButton>
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary="Company Details" />
              {isCompanyDetailsOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
          {isCompanyDetailsOpen && (
            <>
              <ColoredListItem disablePadding className="sublist" onClick={() => { nevigate('/Company List') }}>
                <ListItemButton>
                  <ListItemIcon>
                    <ListIcon />
                  </ListItemIcon>
                  <ListItemText primary="Company List" />
                </ListItemButton>
              </ColoredListItem>
              <ColoredListItem disablePadding className="sublist" onClick={() => { nevigate('/Payment Details') }}>
                <ListItemButton>
                  <ListItemIcon>
                    <ListIcon />
                  </ListItemIcon>
                  <ListItemText primary="Payment Details" />
                </ListItemButton>
              </ColoredListItem>
              <ColoredListItem disablePadding className="sublist" onClick={() => { nevigate('/User Rolls') }}>
                <ListItemButton>
                  <ListItemIcon>
                    <ListIcon />
                  </ListItemIcon>
                  <ListItemText primary="User Rolls" />
                </ListItemButton>
              </ColoredListItem>
            </>
          )}
          <ListItem disablePadding onClick={() => { nevigate('/Update Manager') }}>
            <ListItemButton>
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary="Update Manager" />
            </ListItemButton>
          </ListItem>
        </List>
        <div style={{ flexGrow: 1 }} /> {/* Adds spacing to push items to the bottom */}
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Sign Out" onClick={() => { nevigate('/LogIn') }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}

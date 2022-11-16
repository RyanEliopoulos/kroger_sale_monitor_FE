import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {Outlet} from 'react-router-dom'

import {useNavigate} from 'react-router-dom'

export const CenteredTabs = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const navigate = useNavigate();

  return (
    <>
      <Box sx={{width: '100%', bgcolor: 'background.paper', marginTop: '20px'}}>
        <Tabs value={value} onChange={handleChange} centered
        >
          <Tab label="Watchlist"
               onClick={() => {
                 navigate('/app/watch_list')
               }}
          />
          <Tab label="Search Products"
               onClick={() => {
                 navigate('/app/search_products')
               }}
          />
          <Tab label="Settings"
               onClick={() => {
                 navigate('/app/settings')
               }}
          />
        </Tabs>
      </Box>
      <Outlet/>
    </>
  );
}

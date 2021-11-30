import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import StoreIcon from '@mui/icons-material/Store';
import { useRouter } from 'next/router'

const style = {
  width: 500, 
  margin: '0 auto'
};

function BottomNavigationBeers() {
  const [value, setValue] = React.useState(0);
  const router = useRouter()

  const handleChangeIndex = (event: any, newValue: any) => {
    router.push({
      pathname: '/',
      query: { food: newValue || null },
    })
    setValue(newValue);
  };

  return (
    <Box sx={style}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={handleChangeIndex}
      >
        <BottomNavigationAction label="all available beers" icon={<StoreIcon />} />
        <BottomNavigationAction label="beers that pair with pizza" value='pizza' icon={<LocalPizzaIcon />} />
        <BottomNavigationAction label="beers that pair with steak" value='steak' icon={<FastfoodIcon />} />
      </BottomNavigation>
    </Box>
  );
}

export default BottomNavigationBeers
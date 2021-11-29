import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import StoreIcon from '@mui/icons-material/Store';
import { useRouter } from 'next/router'
import axios from 'axios';


 function BottomNavigationBeers() {
  const [value, setValue] = React.useState(0);
  const router = useRouter()
  // const beersURL:string = props?.food ? `${process.env.BEERS_URL}?food=${props?.food}` : process.env.BEERS_URL as string;
  // console.log(props)

  const handleChangeIndex = (event:any, newValue:any) => {
    console.log(newValue)
    router.push({
      pathname: '/',
      query: { food: newValue||null },
    })
    setValue(newValue);
  };

  return (
    <Box sx={{ width: 500, margin: '0 auto' }}>
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

// export async function getServerSideProps(){
//   try {
//     const response = await fetch('https://api.punkapi.com/v2/beers', {
//       method: 'GET',
//     });
//     let data = await response.json();

//     console.log('data: ', data)
//     return { props: { data } }

//   } catch (err) {
//     console.log("Not Found: ", err);
//   }
//   return { props: 'ssss' }
// }

// const fetchData = async () => await axios.get('https://api.punkapi.com/v2/beers')
//   .then(res => (
//     {
    
//     props: res,
//   }))
//   .catch(() => ({
//       error: true,
//     }),
//   );

//   export const getServerSideProps = async () => {
//     const data = await fetchData();
  
//     return {
//       props: data,
//     };
//   }


  export default BottomNavigationBeers



import React, { useEffect } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Image from 'next/image';
import Box from '@material-ui/core/Box';
import InputLabel from '@mui/material/InputLabel';
import NativeSelect from '@mui/material/NativeSelect';
import FormControl from '@mui/material/FormControl';
import Cards from './Card';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { TabPanelProps } from '../styles/globals';
import { useStore, useSelector, useDispatch } from "react-redux";
import { CreateActionSetBeer } from '../actions/actions'
import { TypesBeers, TypeSotrByBeers, TypeState } from '../styles/globals';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import CardModal from './CardModal';


export default function MainShow({ food }: any) {
  const store = useStore()
  const selectorStateCurrency: any = useSelector<TypeState>(state => state.beers)

  console.log(selectorStateCurrency)
  const [open, setOpen] = React.useState<boolean>(false);
  const [index, setIndex] = React.useState<number>(0);

  const handleOpen = (index:number) => {
    setIndex(index)
    setOpen(true);
  }

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignContent: 'space-between', justifyContent: 'center', alignItems: 'flex-start' }}>

        {selectorStateCurrency.map((item: any, index: number) => {

          return (
            <Card sx={{ width: 345, height: 285, margin: 3, backgroundColor: '#bff9bb' }} key={index}>
              <CardActionArea style={{ height: 285 }} onClick={()=>handleOpen(index)}>
                <CardMedia
                  component="img"
                  height="140"
                  style={{ width: '10%', textAlign: 'center', margin: '0 auto', paddingTop: '20px' }}
                  image={item.image_url}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.abv}
                  </Typography>
                </CardContent>
              </CardActionArea>
              
            </Card >

          )
        })}
        <CardModal open={open} setOpen={setOpen} index={index}/>
      </div>
    </>
  );
}
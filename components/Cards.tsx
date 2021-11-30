import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useStore, useSelector, useDispatch } from "react-redux";
import { TypesBeers, TypeSotrByBeers, TypeState } from '../styles/globals';
import CardModal from './CardModal';

const style:any = {
  root: {
    display: 'flex', 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    alignContent: 'space-between', 
    justifyContent: 'center', 
    alignItems: 'flex-start' 
  },
  card: {
    width: 345, 
    height: 285, 
    margin: 3, 
    backgroundColor: '#bff9bb',
    boxShadow: '0px 2px 100px 0px rgb(181 149 48 / 31%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)'
  },
  cardActionArea:{
    height: 285
  },
  cardMedia:{
    width: '10%', 
    textAlign: 'center', 
    margin: '0 auto', 
    paddingTop: '20px'
  }
};

export default function MainShow() {
  const store = useStore()
  const selectorStateBeersAll: any = useSelector<TypeState>(state => state.beersAll)
  const selectorStateSort: any = useSelector<TypeState>(state => state.sort)
  const [open, setOpen] = React.useState<boolean>(false);
  const [beerItem, setBeerItem] = React.useState<TypesBeers>();

  const handleOpen = (item: TypesBeers) => {
    setBeerItem(item)
    setOpen(true);
  }

  let sortArray: Array<TypesBeers> = store.getState().beers

  if (selectorStateSort.match(/ascending/)) {
    switch (selectorStateSort) {
      case 'abv_ascending': {
        sortArray = sortArray.sort((a: TypesBeers, b: TypesBeers) => a.abv > b.abv ? 1 : -1);
        break;
      }
      case 'name_ascending': {
        sortArray = sortArray.sort((a: TypesBeers, b: TypesBeers) => a.name > b.name ? 1 : -1);
        break;
      }
      case 'ebc_ascending': {
        sortArray = sortArray.sort((a: TypesBeers, b: TypesBeers) => a.ebc > b.ebc ? 1 : -1);
        break;
      }
      case 'srm_ascending': {
        sortArray = sortArray.sort((a: TypesBeers, b: TypesBeers) => a.srm > b.srm ? 1 : -1);
        break;
      }
      case 'ph_ascending': {
        sortArray = sortArray.sort((a: TypesBeers, b: TypesBeers) => a.ph > b.ph ? 1 : -1);
        break;
      }
      case 'attenuation_level_ascending': {
        sortArray = sortArray.sort((a: TypesBeers, b: TypesBeers) => a.attenuation_level > b.attenuation_level ? 1 : -1);
        break;
      }
    }
  }
  else if (selectorStateSort.match(/descending/)) {
    switch (selectorStateSort) {
      case 'abv_descending': {
        sortArray = sortArray.sort((a: TypesBeers, b: TypesBeers) => a.abv < b.abv ? 1 : -1);
        break;
      }
      case 'name_descending': {
        sortArray = sortArray.sort((a: TypesBeers, b: TypesBeers) => a.name < b.name ? 1 : -1);
        break;
      }
      case 'ebc_descending': {
        sortArray = sortArray.sort((a: TypesBeers, b: TypesBeers) => a.ebc < b.ebc ? 1 : -1);
        break;
      }
      case 'srm_descending': {
        sortArray = sortArray.sort((a: TypesBeers, b: TypesBeers) => a.srm < b.srm ? 1 : -1);
        break;
      }
      case 'ph_descending': {
        sortArray = sortArray.sort((a: TypesBeers, b: TypesBeers) => a.ph < b.ph ? 1 : -1);
        break;
      }
      case 'attenuation_level_descending': {
        sortArray = sortArray.sort((a: TypesBeers, b: TypesBeers) => a.attenuation_level < b.attenuation_level ? 1 : -1);
        break;
      }
    }
  }
  else{
    sortArray = selectorStateBeersAll;
  }

  return (
    <>
      <div style={style.root}>
        {sortArray?.map((item: TypesBeers, index: number) => {
          return (
            <Card sx={style.card} key={index}>
              <CardActionArea style={style.cardActionArea} onClick={() => handleOpen(item)}>
                <CardMedia
                  component="img"
                  height="140"
                  style={style.cardMedia}
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
        <CardModal open={open} setOpen={setOpen} item={beerItem} />
      </div>
    </>
  );
}
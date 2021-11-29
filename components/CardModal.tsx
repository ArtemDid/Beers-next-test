import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

import Modal from '@mui/material/Modal';
import { useStore, useSelector, useDispatch } from "react-redux";
import { TypesBeers, TypeSotrByBeers, TypeState } from '../styles/globals';

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

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  index: number
};

export default function BasicModal({ open, setOpen, index }: Props) {
  const handleClose = () => {
    setClampPairing(true)
    setClampDescription(true)
    setOpen(false);
  }
  const selectorStateCurrency: any = useSelector<TypeState>(state => state.beers)
  // const store:any = useStore()
  console.log(selectorStateCurrency, index)
  const [clampPairing, setClampPairing] = React.useState<any>(true);
  const [clampDescription, setClampDescription] = React.useState<any>(true);


  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        width: 400,
        minHeight: 800,
        boxShadow: '0px 2px 100px 0px rgb(181 149 48 / 31%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)'
      },
      heading: {
        fontSize: theme.typography.pxToRem(15),
      },
      clampPairing: {
        WebkitLineClamp: clampPairing && 2,
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden'
      },
      clampDescription: {
        WebkitLineClamp: clampDescription && 2,
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden'
      },
      media: {
        height: 0,
        paddingTop: '200%',
      },
      expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
      },
      expandOpen: {
        transform: 'rotate(180deg)',
      },
      avatar: {
        backgroundColor: red[500],
      },
    }),
  );

  const classes = useStyles();

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CardMedia
            component="img"
            alt="green iguana"
            height="140"
            style={{ width: '10%', textAlign: 'center', margin: '0 auto', paddingTop: '20px' }}
            image={selectorStateCurrency[index].image_url}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {selectorStateCurrency[index].name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {selectorStateCurrency[index].abv}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {selectorStateCurrency[index].tagline}
            </Typography><br/>
            <Typography color="textSecondary" component="p">Description:</Typography>
            <Typography paragraph className={classes.clampDescription} onClick={() => setClampDescription(!clampDescription)}>
              {selectorStateCurrency[index].description}
            </Typography>
            <Typography color="textSecondary" component="p">Food Pairing:</Typography>
            <Typography paragraph className={classes.clampPairing} onClick={() => setClampPairing(!clampPairing)}>
              {selectorStateCurrency[index].food_pairing.map((item: string, index: number) => {
                return (<div key={index}>- {item} </div>)
              })}
            </Typography>
          </CardContent>
        </Box>
      </Modal>
    </div>
  );
}
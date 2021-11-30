import * as React from 'react';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import type { PropsModal } from '../styles/globals';
import Modal from '@mui/material/Modal';
import { useStore, useSelector, useDispatch } from "react-redux";
import { TypeState } from '../styles/globals';

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

export default function BasicModal({ open, setOpen, item }: PropsModal) {
  const selectorStateCurrency: any = useSelector<TypeState>(state => state.beers)
  const [clampPairing, setClampPairing] = React.useState<any>(true);
  const [clampDescription, setClampDescription] = React.useState<any>(true);

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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
      }
    }),
  );

  const classes = useStyles();

  const handleClose = () => {
    setClampPairing(true)
    setClampDescription(true)
    setOpen(false);
  }

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
            image={item?.image_url}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {item?.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item?.abv}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {item?.tagline}
            </Typography><br/>
            <Typography color="textSecondary" component="p">Description:</Typography>
            <Typography paragraph className={classes.clampDescription} onClick={() => setClampDescription(!clampDescription)}>
              {item?.description}
            </Typography>
            <Typography color="textSecondary" component="p">Food Pairing:</Typography>
            <Typography paragraph className={classes.clampPairing} onClick={() => setClampPairing(!clampPairing)}>
              {item?.food_pairing.map((item: string, index: number) => {
                return (<div key={index}>- {item} </div>)
              })}
            </Typography>
          </CardContent>
        </Box>
      </Modal>
    </div>
  );
}
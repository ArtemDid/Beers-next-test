import React, { Fragment, useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import { useStore, useSelector, useDispatch } from "react-redux";
import { CreateActionSetBeer } from '../actions/actions'
import { TypesBeers, TypeSotrByBeers, TypeState } from '../styles/globals';

export default function RecipeReviewCard(props: TypeSotrByBeers) {
  const store = useStore()
  const selectorStateCurrency = useSelector<TypeState>(state => state.beers)
  const dispatch = useDispatch();
  const beersURL:string = props?.food ? `${process.env.BEERS_URL}?food=${props?.food}` : process.env.BEERS_URL as string;

  const [expanded, setExpanded] = React.useState<Array<boolean>>([]);
  const [sortArray, setSortArray] = React.useState<Array<TypesBeers>>([]);
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


  const handleExpandClick = (index: number) => {
    expanded[index] = !expanded[index]
    setExpanded([...expanded])
  };

  async function fetchBeers() {
    try {
      const response = await fetch(beersURL, {
        method: 'GET',
      });
      let data:Array<TypesBeers> = await response.json();

      console.log('data: ', data)
      setExpanded(new Array(data.length).fill(false))
      dispatch(CreateActionSetBeer(data)); // initial store but we don't use. We use useState only for show beers

      switch (props.sort) {
        case 'abv_ascending': {
          setSortArray(data.sort((a: TypesBeers, b: TypesBeers) => a.abv > b.abv ? 1 : -1));
          return;
        }
        case 'abv_descending': {
          setSortArray(data.sort((a: TypesBeers, b: TypesBeers) => a.abv < b.abv ? 1 : -1));
          return;
        }
        case 'name_ascending': {
          setSortArray(data.sort((a: TypesBeers, b: TypesBeers) => a.name > b.name ? 1 : -1));
          return;
        }
        case 'name_descending': {
          setSortArray(data.sort((a: TypesBeers, b: TypesBeers) => a.name < b.name ? 1 : -1));
          return;
        }
        default: setSortArray(data);
      }
    } catch (err) {
      console.log("Not Found: ", err);
    }
  }

  useEffect(() => {
    fetchBeers();
  })

  return (
    <Fragment>
      {sortArray.map((item: TypesBeers, index: number) => {
        return (
          <Card className={classes.root} key={index}>
            <CardHeader
              action={
                <IconButton aria-label="settings">
                  <LocalCafeIcon />
                </IconButton>
              }
              title={item?.name}
              subheader={item?.abv}
              titleTypographyProps={{ style: { fontSize: 20 } }}
            />
            <CardMedia
              className={classes.media}
              image={item?.image_url}
              title="Paella dish"
            />

            <CardActions disableSpacing>
              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded[index],
                })}
                onClick={() => handleExpandClick(index)}
                aria-expanded={expanded[index]}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
            <Collapse in={expanded[index]} timeout="auto" unmountOnExit >
              <Typography variant="body2" color="textSecondary" component="p">
                {item?.tagline}
              </Typography>
              <CardContent>
                <Typography component="p">Description:</Typography>
                <Typography paragraph className={classes.clampDescription} onClick={() => setClampDescription(!clampDescription)}>
                  {item?.description}
                </Typography>
                <Typography component="p">Food Pairing:</Typography>
                <Typography paragraph className={classes.clampPairing} onClick={() => setClampPairing(!clampPairing)}>
                  {item?.food_pairing.map((item: string, index:number) => {
                    return(<div key={index}>- {item} </div>)
                  })}
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
        )
      })}

    </Fragment>
  );
}
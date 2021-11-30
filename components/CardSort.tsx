import React, { useEffect } from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import InputLabel from '@mui/material/InputLabel';
import NativeSelect from '@mui/material/NativeSelect';
import FormControl from '@mui/material/FormControl';
import { useStore, useSelector, useDispatch } from "react-redux";
import { CreateActionSetBeer, CreateActionSetSort } from '../actions/actions'


const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: '0 auto', 
    width:'max-content'
  },
  iputLabel: {
    paddingTop: '7px'
  },
}));

const arraySort = ['all', 'abv_ascending', 'abv_descending', 'name_ascending', 'name_descending', 'ebc_ascending', 'ebc_descending', 
'srm_ascending', 'srm_descending', 'ph_ascending', 'ph_descending', 'attenuation_level_ascending', 'attenuation_level_descending'];

export default function MainShow() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const selectChange = (event: any) => {
    dispatch(CreateActionSetSort(event.target.value));
  };

  return (
    <div className={classes.root}>
      <FormControl >
        <InputLabel variant="standard" htmlFor="uncontrolled-native" className={classes.iputLabel}>
          Sort
        </InputLabel>
        <NativeSelect
          defaultValue='all'
          onClick={(e) => selectChange(e)}
          inputProps={{
            name: 'sort',
            id: 'uncontrolled-native',
          }}
        >
          {arraySort.map((item:string, index:number)=>{
            return(<option value={item} key={index}>{item}</option>)
          })}
        </NativeSelect>
      </FormControl>
      </div>
  );
}
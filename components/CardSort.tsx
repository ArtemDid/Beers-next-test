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
          <option value='all'>all</option>
          <option value='abv_ascending'>abv_ascending</option>
          <option value='abv_descending'>abv_descending</option>
          <option value='name_ascending'>name_ascending</option>
          <option value='name_descending'>name_descending</option>
          <option value='ebc_ascending'>ebc_ascending</option>
          <option value='ebc_descending'>ebc_descending</option>
          <option value='srm_ascending'>srm_ascending</option>
          <option value='srm_descending'>srm_descending</option>
          <option value='ph_ascending'>ph_ascending</option>
          <option value='ph_descending'>ph_descending</option>
          <option value='attenuation_level_ascending'>attenuation_level_ascending</option>
          <option value='attenuation_level_descending'>attenuation_level_descending</option>
        </NativeSelect>
      </FormControl>
      </div>
  );
}
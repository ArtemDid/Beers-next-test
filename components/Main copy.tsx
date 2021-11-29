import React, { useEffect } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import InputLabel from '@mui/material/InputLabel';
import NativeSelect from '@mui/material/NativeSelect';
import FormControl from '@mui/material/FormControl';
import Card from './Card';
import { TabPanelProps } from '../styles/globals';


function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box paddingTop={3} display='flex' flexDirection='row' flexWrap='wrap' alignContent='space-between' justifyContent='space-evenly' alignItems='flex-start'>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 1000,
    textAlign: 'center',
    margin: '0 auto'
  },
}));

export default function MainShow() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState<number>(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  const [sort, setSort] = React.useState<string>('all');

  const selectChange = (event: any) => {
    setSort(event.target.value as string);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="beers that pair with pizza" {...a11yProps(0)} />
          <Tab label="beers that pair with steak" {...a11yProps(1)} />
          <Tab label="all available beers" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <FormControl >
        <InputLabel variant="standard" htmlFor="uncontrolled-native" style={{ paddingTop: '7px' }}>
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
        </NativeSelect>
      </FormControl>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Card food='pizza' sort={sort} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Card food='steak' sort={sort} />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <Card sort={sort} />
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
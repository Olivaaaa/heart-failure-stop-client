import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Paper, Button, Input } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center'
  },
  search: {
    flexGrow: 1,
    height: 42,
    padding: theme.spacing(0, 2),
    display: 'flex',
    alignItems: 'center'
  },
  searchIcon: {
    marginRight: theme.spacing(2),
    color: theme.palette.icon
  },
  searchInput: {
    flexGrow: 1,
    flexShrink: 0.5,
    width: '85%'
  },
  searchButton: {
    marginLeft: theme.spacing(3),
    flexShrink: 1,
    minWidth: 75
  }
}));

const Search = props => {
  const { onSearch, onChange, value, className, ...rest } = props;

  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Paper
        className={classes.search}
        elevation={1}
      >
        <SearchIcon className={classes.searchIcon} />
        <Input
          className={classes.searchInput}
          onChange={onChange}
          value={value}
          inputProps={{
            'aria-label': 'description',
            'text-overflow': 'ellipsis'
          }}
          disableUnderline
          placeholder= {value? value: "请输入病人ID"}
        />
      </Paper>
      <Button
        className={classes.searchButton}
        onClick={onSearch}
        size="large"
        variant="contained"
      >
        查询
      </Button>
    </div>
  );
};

Search.propTypes = {
  className: PropTypes.string,
  onSearch: PropTypes.func
};

export default Search;

import React, { useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getUsersActions, userSelector } from './userSlice';
import { Link, useHistory } from 'react-router-dom';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#3f51b5',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function Users() {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { users } = useAppSelector(userSelector)

  useEffect(() => {
    dispatch(getUsersActions())
  }, [])

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell >Email</StyledTableCell>
            <StyledTableCell >Username</StyledTableCell>
            <StyledTableCell >Phone</StyledTableCell>
            <StyledTableCell >Website</StyledTableCell>
            <StyledTableCell >Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((row) => (
            <StyledTableRow key={row.id} >
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell >{row.email}</StyledTableCell>
              <StyledTableCell >{row.username}</StyledTableCell>
              <StyledTableCell >{row.phone}</StyledTableCell>
              <StyledTableCell >{row.website}</StyledTableCell>
              <StyledTableCell >
                <Link to={`/albums/${row.id}`}>Albums</Link> &nbsp;
                <Link to={`/posts/${row.id}`}>Posts</Link>&nbsp;
                <Link to={`/todos/${row.id}`}>Todos</Link>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

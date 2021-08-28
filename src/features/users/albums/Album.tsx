

import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { albumSelector, getAlbumPhotosActions, getUsersAlbumsActions, photosSelector, selectedUserSelector } from '../userSlice';
import AlbumPhotos from '../Photos/Photo';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));


export default function Albums() {
  const classes = useStyles();
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  let params = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const albums = useAppSelector(albumSelector);
  const user = useAppSelector(selectedUserSelector);
  const photos = useAppSelector(photosSelector);

  const onAlbumSelect = (id: number) => {
    dispatch(getAlbumPhotosActions(id));
  }

  useEffect(() => {
    dispatch(getUsersAlbumsActions(parseInt(params.id)));
  }, [])

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={5}>
          <Typography variant="h6" className={classes.title}>
            Albums list ({user.name})
          </Typography>
          <div className={classes.demo}>
            <List dense={dense}>
              {albums.map(item => {
                return (
                  <ListItem onClick={() => onAlbumSelect(item.id)} button key={item.id}>
                    <ListItemIcon>
                      <FolderIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={item.title}
                      secondary={secondary ? item.title : null}
                    />
                  </ListItem>
                )
              })}
            </List>
          </div>
        </Grid>
        <Grid item xs={12} md={7}>
          <Grid container 
            direction="row"
            justifyContent="center"
            alignItems="center" spacing={6}>
            {photos.map(item => {
              return (<AlbumPhotos key={item.id} photo={item} />)
            })}
          </Grid>
        </Grid>
      </Grid>

    </div>
  );
}

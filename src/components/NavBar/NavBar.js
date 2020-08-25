import React, { useContext } from 'react';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import styled from 'styled-components';
import { AuthContext } from '@contexts/AuthContext';

const Background = styled.div`
  background: rgb(21, 36, 76);
  width: 100%;
  height: 4rem;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
`;

const Banner = styled.div`
  font-size: 40px;
`;

const UserName = styled.div`
  font-size: 16px;
`;


const NavBar = () => {
  const auth = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const onClickProfile = () => {
    alert('Profile not yet implemented');
    handleClose();
  };

  const onClickLogOut = () => {
    auth.logOut();
    handleClose();
  }

  return (
    <Background>
      <Container>
        <Banner>Recipes!</Banner>
        {auth.me && (
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <div>
                <AccountCircle />
                <UserName> {`Hello, ${auth.me.name}!`} </UserName>
              </div>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={onClickProfile}>Profile</MenuItem>
              <MenuItem onClick={onClickLogOut}>Log out</MenuItem>
            </Menu>
          </div>
        )}
      </Container>
    </Background>
  );
}

export default NavBar;

/*




const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));



export default function MenuAppBar() {


  return (
    <R className={classes.root}>

    </div>
  );
}




 */
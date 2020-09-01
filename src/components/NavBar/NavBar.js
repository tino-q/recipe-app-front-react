import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
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

const ProfileIcon = styled.div`
  color: ${({ theme }) => theme?.theme?.accentColor};
`;

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
`;

const Banner = styled.div`
  cursor: pointer;
  font-size: 40px;
  color: ${({ theme }) => theme?.theme?.accentColor};
`;

const UserName = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme?.theme?.accentColor};
`;


const NavBar = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const onClickProfile = () => {
    history.push('profile');
    handleClose();
  };

  const onClickLogOut = () => {
    auth.logOut();
    handleClose();
  }

  const onClickHome = () => {
    history.push('/recipes');
    handleClose();
  }

  return (
    <Background>
      <Container>
        <Banner onClick={onClickHome}>Recipes!</Banner>
        {auth.me && (
          <ProfileIcon data-testid='navbar-profile-icon'>
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
              <MenuItem onClick={onClickHome}>Home</MenuItem>
              <MenuItem onClick={onClickProfile}>Profile</MenuItem>
              <MenuItem onClick={onClickLogOut}>Log out</MenuItem>
            </Menu>
          </ProfileIcon>
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
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../../context/theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import LogoSVG from "../../../assets/svg/Logo";
import NavStyles from "../../../hooks/NavHooks"
import { AuthContext } from "../../../context/authContext";


const pages = ['Home', 'Properties', "About", "Contacts"];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];


function NavBar() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const { setCurrentUser } = useContext(AuthContext);
  const navStyle = NavStyles();

  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navFunc = (page) => {
    console.log(typeof page)
    if (page == "Home") {
      navigate(`/`);
      handleCloseNavMenu()
    } else {
      navigate(`/${page.toLowerCase()}`);
      handleCloseNavMenu()
    }
  }

  const Logout = () => {
    setCurrentUser(null)
    localStorage.clear()
  }


  return (
    <AppBar position="static" sx={{ backgroundColor: colors.blueAccent[500] }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, alignItems: "center" }}>
            <h3 onClick={Logout}>Logout</h3>
            <LogoSVG width={35} height={35} color={colors.grey[100]} />
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={navStyle.sxObj}
          >
            RBIV
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon style={{color: colors.grey[100]}}/>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom', horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top', horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
              PaperProps={{ sx: { backgroundColor: colors.blueAccent[500] } }}
            >
              {/* this is the hamburger menu text */}
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu} sx={{p:0}}>
                  <Button size="large" onClick={() => navFunc(page)} style={{
                    textDecoration: 'none', 
                    textalign: 'center',
                    color: colors.grey[100],
                    width: "100%",
                    }}>
                    {page}
                  </Button>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 2, alignItems: "center" }}>
            <LogoSVG width={35} height={35} color={colors.grey[100]} />
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={navStyle.sxObj2}
          >
            RBIV
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: "center" }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={()=> navFunc(page)}
                
                sx={{ my: 2, color: colors.grey[100], display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0}}>
            <Tooltip title="Open settings">
              <>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar src="/broken-image.jpg" />
                </IconButton>
                <IconButton onClick={colorMode.toggleColorMode}>
                  {theme.palette.mode === "dark" ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
                </IconButton>
              </>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top', horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top', horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              PaperProps={{ sx: { backgroundColor: colors.blueAccent[500] } }}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Link style={{ textDecoration: "none", color: colors.grey[100] }} to={"/login"}>Login</Link>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Divider, useTheme } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link } from 'react-router-dom';
import { ThemeConsumer } from 'styled-components';

export default function AppBarDropDownMenu() {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        id="basic-button"
        color="inherit"
        endIcon={<KeyboardArrowDownIcon/>}
        aria-label="open style drop down menu"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{ mr: 2, fontFamily: 'Righteous' }}
      >
        EmPLM
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem component={Link} to={`/styles`} onClick={handleClose}>Back to files</MenuItem>
        <Divider sx={{ mt: 1, mb: 1 }} />
        <MenuItem onClick={handleClose}>Create PDF</MenuItem>
        <MenuItem onClick={handleClose}>Use as template</MenuItem>
        <MenuItem onClick={handleClose}>Assigne to user</MenuItem>
      </Menu>
    </>
  );
}
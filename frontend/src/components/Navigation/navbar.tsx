import React from 'react';
import { NavLink } from 'react-router-dom';
import { List, ListItem, ListItemText} from "@material-ui/core";
import useStyles from './useStyles';
import {NavbarInterface} from '../../interfaces/navigation';

const Navbar = ({auth, mobile}:NavbarInterface) => {
    const classes = useStyles();

    const submitLogout = (): void => {
        if(typeof window !== "undefined") { 
            window.localStorage.removeItem("token");
            window.location.href = "/";
        }
    }

    return (
    <React.Fragment>
        {auth ? (
            <List component="nav" aria-labelledby="main navigation" className={!mobile ? classes.navDisplayFlex: classes.navDisplayMobile}>
                <NavLink to='/announcements' className={mobile? classes.linkTextDrawer : classes.linkText}>
                    <ListItem button>
                        <ListItemText primary="Announcements" />
                    </ListItem>
                </NavLink>
                <NavLink to='/projects' exact className={mobile? classes.linkTextDrawer : classes.linkText}>
                    <ListItem button>
                        <ListItemText primary="Projects" />
                    </ListItem>
                </NavLink>
                <NavLink to='/groupMentor' className={mobile? classes.linkTextDrawer : classes.linkText}>
                    <ListItem button>
                        <ListItemText primary="Groups" />
                    </ListItem>
                </NavLink>
                <NavLink to='/' className={mobile? classes.linkTextDrawer : classes.linkText}>
                    <ListItem 
                        button
                        onClick={() => submitLogout()}
                        >
                        <ListItemText primary="LogOut" />
                    </ListItem>
                </NavLink>
            </List>
            ) 
            : null }
    </React.Fragment>
    )
};

export default Navbar
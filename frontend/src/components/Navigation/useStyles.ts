import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    navbarDisplayFlex: {
        display: `flex`,
        justifyContent: `space-between`,
        alignItems: 'center',
        maxWidth: '100%'
    },
    navDisplayFlex: {
        display: `flex`,
        justifyContent: `space-between`
    },
    linkText: {
        textDecoration: `none`,
        textTransform: `uppercase`,
        color: `white`
    },
    list: {
        width: 250,
    },
    linkTextDrawer: {
        textDecoration: `none`,
        textTransform: `uppercase`,
        color: `black`,
    },
    navDisplayMobile: {
        display: 'block'
    }
})

export default useStyles
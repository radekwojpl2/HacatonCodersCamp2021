import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from "@material-ui/core/Avatar"
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import CardActions from '@material-ui/core/CardActions';
import AddActionForm from './addActionForm'
import DoneRounded from '@material-ui/icons/DoneRounded';
import axios from 'axios';



const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 400,
        minWidth: 300,
        margin: '10px'
    },
    expand: {
        alignContent: 'right'
    },
    content: {
        display: 'flex',
        flexDirection: 'row',
    },
    item: {
        textAlign: 'center'
    },
    item_name: {
        padding: '18px 0px 0px 5px'
    },
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    action_item: {
        marginTop: "5px"
    }
}));

const saveActrion = async (userId: string, form: any) => {
    var resut = await axios.post("https://hackathon-nest.herokuapp.com/actions",
        {
            userId: userId,
            title: form.title,
            desc: form.desc,
            date: Date.now(),
            personToNotify: form.personeToNotify,
        })
        .then(
            data => console.log(data))
        .catch(error => console.log(error))
}


function EmployeeCard(props: { role: string, name: string, actions: Array<IAction> }) {

    const classes = useStyles({});

    const { role, name, actions } = props;

    return (
        <Card className={classes.root}>
            <CardContent >
                <Typography variant="h4" component="h2">
                    {role}
                </Typography>
                <Typography className={classes.content}>
                    <Typography className={classes.item}>
                        <Avatar className={`${classes.purple} ${classes.large}`}>{name.split(" ").map(x => x.charAt(0))}</Avatar>
                    </Typography>
                    <Typography className={`${classes.item} ${classes.item_name}`}>
                        {name}
                    </Typography>
                </Typography>
                <Typography>
                    {actions.map(x => (
                        <ActionItem item={x} />
                    ))}
                </Typography>
            </CardContent>
            <CardActions>
                <AddActionForm saveAction={saveActrion} typee="ADD"></AddActionForm>
            </CardActions>
        </Card>

    )
}

export interface IAction { title: string, type: string, desc: string, date: number, personToNotify: string };

function ActionItem(props: { item: IAction }) {

    const classes = useStyles({});

    const item = props.item;
    return (
        <Card className={classes.action_item}>
            <CardContent >
                <h4>
                    Action Require: {item.type} <br />
                </h4>
                <h5>
                    {item.title}
                </h5>
                <p>
                    {item.desc}
                </p>
                <p>
                    Date: {new Date(item.date).toDateString()}
                </p>
            </CardContent>
            <CardActions>
                <IconButton><DoneRounded /></IconButton>
                <AddActionForm saveAction={() => { }} actionData={item}></AddActionForm>
            </CardActions>
        </Card>
    )
}

function SupervisiorCard() {

    const classes = useStyles({});

    const employees = [
        { role: "Manger", name: "Radoslaw Bajor", actions: [{ title: "Problem with component props", type: "NEED HELP", desc: "I need help with react", date: Date.now(), personToNotify: "radekbajor27@gmail.com" }, { title: "Problem with component props", type: "NEED HELP", desc: "I need help with react", date: Date.now(), personToNotify: "" }, { title: "Problem with component props", type: "NEED HELP", desc: "I need help with react", date: Date.now(), personToNotify: "" }] },
        // {role: "Frontend Developer", name: "Kinga Mamak", actions: [{name: "elo"}, {name: "elo"}] },
        // {role: "Backend Developer", name: "Mateusz Duda", actions: [{name: "elo"}, {name: "elo"}] },
    ]

    return (
        <div className={classes.content}>
            {employees.map(x => (<EmployeeCard role={x.role} name={x.name} actions={x.actions} />))}
        </div>
    )

}

export default SupervisiorCard;
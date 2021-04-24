import React, { useState, useEffect } from 'react';
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

const saveActrion = (userId: string, form: any) => {
    var resut = axios.post("https://hackathon-nest.herokuapp.com/actions",
        {
            userId: userId,
            title: form.title,
            desc: form.desc,
            date: Date.now(),
            personToNotify: form.personeToNotify,
        })
        .then(
            () => window.location.reload())
}

const editAction = (userId: string, form: any) => {
    var resut = axios.post(`https://hackathon-nest.herokuapp.com/actions/${form.id}`,
        {
            title: form.title,
            desc: form.desc,
            date: Date.now(),
            personToNotify: form.personeToNotify,
        })
        .then(
            () => window.location.reload())
}


function EmployeeCard(props: { role: string, name: string, userId: string, actions: Array<IAction> }) {

    const classes = useStyles({});

    const { role, name, actions, userId } = props;

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
                        <ActionItem item={x} userID={userId} />
                    ))}
                </Typography>
            </CardContent>
            <CardActions>
                <AddActionForm saveAction={saveActrion} typee="ADD" userID={userId} ></AddActionForm>
            </CardActions>
        </Card>

    )
}

export interface IAction { id: string, title: string, type: string, desc: string, date: number, personToNotify: string };

function ActionItem(props: { item: IAction, userID?: string }) {

    const classes = useStyles({});

    const deleteAction = () => {
        axios.delete(`https://hackathon-nest.herokuapp.com/actions/${item.id}`).then(() => window.location.reload())
    }

    const item = props.item;
    const userId = props.userID;
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
                <IconButton onClick={deleteAction} ><DoneRounded /></IconButton>
                <AddActionForm saveAction={editAction} actionData={item} userID={userId}></AddActionForm>
            </CardActions>
        </Card>
    )
}

export interface User {
    email: string,
    firstName: string,
    lastName: string,
    login: string,
    password: string,
    role: string,
    __v: string,
    _id: string,
}

export interface IActionResponse { id: string, userId: string, title: string, type: string, desc: string, date: number, personToNotify: string };

export interface Test extends User {
    actions: IAction[]
}

async function getUsers() {
    var users: User[] = await axios.get("https://eduplatformapi.herokuapp.com/authorization/").then(x => x.data)
    var actions: IActionResponse[] = await axios.get("https://hackathon-nest.herokuapp.com/actions").then(x => x.data)

    var result: [{}] = [{}];

    users.forEach(user => {
        result.push({
            role: user.role,
            name: `${user.firstName} ${user.lastName}`,
            userID: user._id,
            actions: actions.find(x => x.userId === user._id)
        })
    });

    return result;
}


function SupervisiorCard() {

    const [data, setData] = useState<any>([{}])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getUsers();

                setData(res);
            } catch (error) {

            }
        }
        fetchData()
    }, [])
    const classes = useStyles({});

    return (
         <div>
             {data ? <div className={classes.content}>
                {data.map((x: { role: string; name: string; actions: IAction[]; userID: string; }) => (<EmployeeCard role={x.role} name={x.name} actions={x.actions} userId={x.userID} />))}
            </div>: "loading"}
            
        </div>
    )
}

export default SupervisiorCard;
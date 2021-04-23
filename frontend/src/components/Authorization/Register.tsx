import React, { useState } from "react"
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { styleComponents } from "./authorizationStyles";
import { useDispatch, useSelector } from "react-redux"
import { IRegister, submitRegister } from "../../app/authorizationReducer"
import { RootState } from "../../app/rootReducer";

const data: IRegister = {
    firstName: "",
    lastName: "",
    eMail: "",
    login: "",
    password: "",
    confirmPassword: "",
    role: ""
}

export const RegisterBox: React.FC = () => {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [eMail, setEMail] = useState<string>("");
    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirm, setConfirm] = useState<string>("");
    const [role, setRole] = useState<string>("");
    const classes = styleComponents();
    const { error, isCreated } = useSelector((state: RootState) => state.authorization)
    const dispatch = useDispatch();

    const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        data.firstName = firstName
        data.lastName = lastName
        data.eMail = eMail
        data.login = login
        data.password = password
        data.role = role
        dispatch(submitRegister(data))
        window.location.href = "https://eduplatformcc.herokuapp.com/"
    }

    return(
        <form className={classes.formRegister} method="POST" onSubmit={submitHandler}>
            <div className={classes.formDiv}>
                <TextField
                    label="First Name"
                    className={classes.textField}
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                    required
                />
                <TextField
                    label="Last Name"
                    className={classes.textField}
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                    required
                />   
                <TextField
                    label="E-mail"
                    className={classes.textField}
                    onChange={(e) => setEMail(e.target.value)}
                    value={eMail}
                    required
                />  
                <TextField
                    label="Login"
                    className={classes.textField}
                    onChange={(e) => setLogin(e.target.value)}
                    value={login}
                    required
                />
                <TextField
                    label="Password"
                    type="password"
                    className={classes.textField}
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                /> 
                <TextField
                    label="Confirm Password"
                    type="password"
                    className={classes.textField}
                    onChange={(e) => setConfirm(e.target.value)}
                    value={confirm}
                    required
                /> 
                <TextField
                    label="Role"
                    className={classes.textField}
                    onChange={(e) => setRole(e.target.value)}
                    value={role}
                    required
                />   
                <Button
                    variant="outlined"
                    startIcon={<AccountCircleIcon />}
                    className={classes.button}
                    type="submit"
                >
                    Register
                </Button>
            </div>
        </form>
    );
}
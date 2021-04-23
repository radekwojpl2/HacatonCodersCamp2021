import React, { useState } from "react"
import { Button } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {styleComponents} from "./authorizationStyles";
import { LoginBox } from "./Login";
import { RegisterBox } from "./Register";

const ChangeForm: React.FC = () =>{
    const classes = styleComponents();
    const [isLogin, setIsLogin] = useState<boolean>(true);

    const setHandleTrue = (): void => {
        setIsLogin( prevCount => true )
    }

    const setHandleFalse = (): void => {
        setIsLogin( prevCount => false )
    }

    return(
        <div className={classes.authorizationBox}>
            <div>
                <Button
                    variant="outlined"
                    startIcon={<AccountCircleIcon />}
                    className={classes.changeFormbutton}
                    onClick={setHandleTrue}
                >
                    Log In
                </Button>
                <Button
                    variant="outlined"
                    startIcon={<AccountCircleIcon />}
                    className={classes.changeFormbutton}
                    onClick={setHandleFalse}
                >
                    Register
                </Button>
                {isLogin ? <LoginBox /> : <RegisterBox />}
            </div>
        </div>
        
    );
}

export default ChangeForm;
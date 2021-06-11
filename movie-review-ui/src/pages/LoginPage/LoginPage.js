import {makeStyles} from "@material-ui/core";
import LoginForm from "../../components/forms/LoginForm/LoginForm";

const useStyles = makeStyles((theme) => ({
    mainContainer: {
        marginTop: theme.spacing(4)
    }
}))

const LoginPage = () => {
    const classes = useStyles()

    return (
        <>
            <main className={classes.mainContainer}>
                <LoginForm/>
            </main>
        </>
    )
}

export default LoginPage
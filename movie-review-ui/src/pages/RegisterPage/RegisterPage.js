import {makeStyles} from "@material-ui/core";
import RegisterForm from "../../components/forms/RegisterForm/RegisterForm";

const useStyles = makeStyles((theme) => ({
    mainContainer: {
        marginTop: theme.spacing(4)
    }
}))

const RegisterPage = () => {
    const classes = useStyles()

    return (
        <>
            <main className={classes.mainContainer}>
                <RegisterForm/>
            </main>
        </>
    )
}

export default RegisterPage
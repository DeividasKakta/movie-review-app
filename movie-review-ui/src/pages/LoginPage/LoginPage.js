import {Grid, Typography} from "@material-ui/core";
import LoginForm from "../../components/forms/LoginForm/LoginForm";


const LoginPage = () => {


    return (
        <>
            <main>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Typography variant="h2" align="center">
                            Login
                        </Typography>
                    </Grid>
                    <LoginForm/>
                </Grid>
            </main>
        </>
    )
}

export default LoginPage
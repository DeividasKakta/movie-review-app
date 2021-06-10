import {Grid, Typography} from "@material-ui/core";
import RegisterForm from "../../components/forms/RegisterForm/RegisterForm";


const RegisterPage = () => {


    return (
        <>
            <main>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Typography variant="h2" align="center">
                            Register
                        </Typography>
                    </Grid>
                    <RegisterForm/>
                </Grid>
            </main>
        </>
    )
}

export default RegisterPage
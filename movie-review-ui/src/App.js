import Header from "./components/Header/Header";
import Content from "./components/Content/Content";
import Footer from "./components/Footer/Footer";
import {BrowserRouter as Router} from "react-router-dom";
import {Container, makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    }
}));

function App() {
    const classes = useStyles();

    return (
        <Router>
            <div className={classes.root}>
                <Header/>
                <Container maxWidth="lg">
                    <Content/>
                </Container>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;

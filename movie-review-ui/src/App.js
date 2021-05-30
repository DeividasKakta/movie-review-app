import Header from "./components/Header/Header";
import Content from "./components/Content/Content";
import Footer from "./components/Footer/Footer";
import {BrowserRouter as Router} from "react-router-dom";
import {Container, createMuiTheme, makeStyles, MuiThemeProvider} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    }
}));

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#62727b',
            main: '#37474f',
            dark: '#102027',
            contrastText: '#fff',
        },
        secondary: {
            light: '#e1ffb1',
            main: '#aed581',
            dark: '#7da453',
            contrastText: '#000',
        },
    },
})

function App() {
    const classes = useStyles();

    return (
        <Router>
            <MuiThemeProvider theme={theme}>
                <div className={classes.root}>
                    <Header/>
                    <Container maxWidth="lg">
                        <Content/>
                    </Container>
                    <Footer/>
                </div>
            </MuiThemeProvider>
        </Router>
    );
}

export default App;

import Header from "./components/Header/Header";
import Content from "./components/Content/Content";
import Footer from "./components/Footer/Footer";
import {BrowserRouter as Router} from "react-router-dom";

function App() {
    return (
        <>
            <Router>
                <Header/>
                <Content/>
                <Footer/>
            </Router>
        </>
    );
}

export default App;

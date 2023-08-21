import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import Register from './pages/Register';
import Login from './pages/Login';
import { ThemeProvider } from "@mui/material/styles";
import theme from "./assets/theme";


function App() {
  return (
    <ThemeProvider theme={theme}>
    <Header/>
    <Routes>
    <Route exact path='/' element={<Home />} />
    <Route exact path='/register' element={<Register />} />
    <Route exact path='/login' element={<Login />} />
    </Routes>
    </ThemeProvider>
  );
}

export default App;

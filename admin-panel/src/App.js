import CompanyList from './Pages/CompanyList';
import Home from './Pages/Home';
import LogIn from './Pages/LogIn';
import Payment from './Pages/Payment';
import UpdateManager from './Pages/UpdateManager';
import UserRolls from './Pages/UserRolls';
import {Route, Routes, BrowserRouter} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />}></Route>
        <Route path="/Payment Details" exact element={<Payment />}></Route>
        <Route path="/User Rolls" exact element={<UserRolls />}></Route>
        <Route path="/Update Manager" exact element={<UpdateManager />}></Route>
        <Route path="/LogIn" exact element={<LogIn />}></Route>
        <Route path="/Company List" exact element={<CompanyList />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

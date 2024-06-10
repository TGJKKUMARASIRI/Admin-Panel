import CompanyList from './Pages/CompanyList';
import CompanyDetails from './Pages/Components/CompanyList/CompanyDetails';
import EditCompany from './Pages/Components/CompanyList/EditCompany';
import UserTable from './Pages/Components/CompanyUsers/User_Details';
import Home from './Pages/Home';
import Layout from './Pages/Layout';
import LogIn from './Pages/LogIn';
import Payment from './Pages/Payment';
import UpdateManager from './Pages/UpdateManager';
import UserRolls from './Pages/UserRolls';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import {Route, Routes, BrowserRouter} from 'react-router-dom';

function App() {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" exact element={<Home />}></Route>
    //     <Route path="/Payment Details" exact element={<Payment />}></Route>
    //     <Route path="/User Rolls" exact element={<UserRolls />}></Route>
    //     <Route path="/Update Manager" exact element={<UpdateManager />}></Route>
    //     <Route path="/LogIn" exact element={<LogIn />}></Route>
    //     <Route path="/Company List" exact element={<CompanyList />}></Route>
    //     <Route path="/details/:id" element={<CompanyDetails />}></Route>
    //   </Routes>
    // </BrowserRouter>
    <Router>
      <Routes>
        <Route path="/LogIn" element={<LogIn />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/Payment Details" element={<Payment />} />
          <Route path="/User Rolls" element={<UserRolls />} />
          <Route path="/Update Manager" element={<UpdateManager />} />
          <Route path="/Company List" element={<CompanyList />} />
          <Route path="/details/:id" element={<CompanyDetails />} />
          <Route path="/edit-company/:companyId" element={<EditCompany />} />
          <Route path="/company-users/:companyId" element={<UserTable />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

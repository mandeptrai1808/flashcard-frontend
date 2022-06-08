import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeTemplate from './Templates/HomeTemplate';
import HomePage from './Pages/HomePage';
import DrawerTemplate from './Templates/DrawerTemplate';
import Desks from './Pages/Desks';
import CreateDeskBtn from './Components/CreateDeskBtn';
import ModalTemplate from './Templates/ModalTemplate';
import DetailDesk from './Pages/DetailDesk';
import EditDesk from './Pages/EditDesk';


function App() {

  return (
    <div className="App relative" >
      {/* <CreateDeskBtn/> */}
      <DrawerTemplate/>
      <ModalTemplate/>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomeTemplate component={<HomePage/>}/>}/>
          <Route path="/desks" element={<HomeTemplate component={<Desks/>}/>}/>
          <Route path="/detaildesk/:deskId" element={<HomeTemplate component={<DetailDesk/>}/>}/>
          <Route path="/editdesk/:deskId" element={<HomeTemplate component={<EditDesk/>}/>}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

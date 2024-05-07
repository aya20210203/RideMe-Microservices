import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Components/Footer/Footer";
import NavBar from "./Components/NavBar/NavBar";
import PassengerRequestRide from "./Pages/PassengerRequestRide/PassengerRequestRide";
import PassengerChoosingDriver from "./Pages/PassengerChoosingDriver/PassengerChoosingDriver";
import PassengerDuringRide from "./Pages/PassengerDuringRide/PassengerDuringRide";
import FeedBack from "./Pages/FeedBack/FeedBack";
import PassengerRideHistory from "./Pages/PassengerRideHistory/PassengerRideHistory";
import IntroPage from "./Pages/IntroPage/IntroPage";
import RegisterDriver from "./Pages/RegisterDriver/RegisterDriver";
import RegisterPassenger from "./Pages/RegisterPassenger/RegisterPassenger";
import LoginPage from "./Pages/LoginPage/LoginPage";
import NotFound from "./NotFound/NotFound";
import RegisterMainPage from "./Pages/RegisterMainPage/RegisterMainPage";
import WaitingApprove from "./Pages/WaitingApprove/WaitingApprove";
import DriverChooseRide from "./Pages/DriverChooseRide/DriverChooseRide";
import DriverCurrentRide from "./Pages/DriverCurrentRide/DriverCurrentRide";
import PickDayMonth from "./Pages/DriverCalculateIncome/PickDayMonth";
import Admin from "./Pages/Admin/AdminPage";


function App() {
  return (
    <Router>
      <div className="App">
      <ToastContainer />
        <NavBar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <IntroPage />
            </Route>
            <Route path="/registermainpage">
              <RegisterMainPage />
            </Route>
            <Route path="/registerdriver">
              <RegisterDriver />
            </Route>
            <Route path="/registerpassenger">
              <RegisterPassenger />
            </Route>
            <Route path="/loginpage">
              <LoginPage />
            </Route>
            <Route path="/passengerridehistory">
              <PassengerRideHistory />
            </Route>
            <Route path="/passengerrequestride">
              <PassengerRequestRide />
            </Route>
            <Route path="/passengerchoosingdriver">
              <PassengerChoosingDriver />
            </Route>
            <Route path="/passengerduringride">
              <PassengerDuringRide />
            </Route>
            <Route path="/feedback">
              <FeedBack />
            </Route>
            <Route path="/waitingapprove">
              <WaitingApprove />
            </Route>
            <Route path="/driverchooseride">
              <DriverChooseRide />
            </Route>
            <Route path="/drivercurrentride">
              <DriverCurrentRide />
            </Route>
            <Route path="/pickdaymonth">
              <PickDayMonth />
            </Route>
            <Route path="/adminpage">
              <Admin />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

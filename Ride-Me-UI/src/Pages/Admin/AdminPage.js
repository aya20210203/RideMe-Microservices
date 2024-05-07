import ManageNewPassengers from "./ManageNewPassengers";
import ManageNewDrivers from "./ManageNewDrivers";
import ManageExistingDrivers from "./ManageExistingDrivers";
import AdminShowRides from "./AdminShowRides";
import './index.css';

function Admin() {
  return (
    <div className="App">
      <ManageNewPassengers />
      <ManageNewDrivers />
      <ManageExistingDrivers />
      <AdminShowRides />

    </div>
  );
}

export default Admin;

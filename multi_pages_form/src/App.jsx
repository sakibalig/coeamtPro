import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import ProjectRegistration from "./components/ProjectRegistration/ProjectRegistration.jsx";
import ProjectMonitoring from "./components/ProjectMonitoring/ProjectMonitoring.jsx";
import Home from "./components/Home/Home.jsx";
import FundDetails from "./components/ProjectMonitoring/FundDetails/FundDetails.jsx";
import ProjectDashboard from "./components/ProjectMonitoring/ProjectDashboard/ProjectDashboard.jsx";
import ManpowerDetails from "./components/ProjectMonitoring/ManPower/ManPower.jsx";
import BillProcessing from "./components/ProjectMonitoring/BillProcessing/BillProcessing.jsx";
import UserLogin from "../login_sign_up/UserLogin.jsx";
import UserRegister from "../login_sign_up/UserRegister.jsx";
import { UserAuthContext } from "./context/AuthContext.jsx";
import ProtectedRoutesProvider from "./providers/ProtectedRoutesProvider.jsx";
import LogBook from "./components/ProjectMonitoring/LogBook/LogBook.jsx";

const App = () => {
  const methods = useForm(); // Initialize react-hook-form methods

  return (
    <div className="app-main-container">
      <div className="suvasis">
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<UserLogin />} />
            <Route path="/register" element={<UserRegister />} />
            <Route element={<ProtectedRoutesProvider />}>
              <Route path="/" element={<Home />}>
                <Route
                  path="/project-monitoring"
                  element={<ProjectMonitoring />}
                >
                  <Route path="fund-details" element={<FundDetails />} />
                  <Route
                    path="man-power-details"
                    element={<ManpowerDetails />}
                  />
                  <Route
                    path="project-dashboard"
                    element={<ProjectDashboard />}
                  />
                   <Route
                    path="logbook"
                    element={<LogBook />}
                  />
                  <Route path="bill-processing" element={<BillProcessing />} />
                </Route>
                <Route
                  path="/project-registration"
                  element={<ProjectRegistration />}
                />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;

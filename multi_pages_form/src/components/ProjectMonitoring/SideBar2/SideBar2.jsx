import React from "react";
// import "./sidebar2.css";
import { useNavigate } from "react-router-dom";
import dashboard from "../../../Assets/projectdashboard.png";
import fundetails from "../../../Assets/fundetails.png";
import billp from "../../../Assets/Assets/billproc.png";
import manp from "../../../Assets/manpower.png";
import fundu from "../../../Assets/fundutil.png";
import logb from "../../../Assets/logbook.png";
const Sidebar2 = () => {
  const navigate = useNavigate();

  const FundDetails = () => {
    navigate("/project-monitoring/fund-details");
  };
  const ProjectDashboard = () => {
    navigate("/project-monitoring/project-dashboard");
  };

  const manpower = () => {
    navigate("/project-monitoring/man-power-details");
  };

  const BillProcessing = () => {
    navigate("/project-monitoring/bill-processing");
  };

  const logbook = () => {
    navigate("/project-monitoring/logbook");
  };


  //

  return (
    <div className="sidebar2-container">
      <div className="sidebar2-title"></div>
      <ul className="sidebar2-list">
        <li className="sidebar2-item" onClick={ProjectDashboard}>
          <img src={dashboard} alt="" />
          Project Dashboard
        </li>
        <li className="sidebar2-item" onClick={FundDetails}>
          <img src={fundetails} alt="fundetails" />
          Fund Details
        </li>
        <li className="sidebar2-item" onClick={manpower}>
          <img src={manp} alt="manp-png" />
          ManPower Details
        </li>
        <li className="sidebar2-item">
          <img src={fundu} alt="manp-png" />
          Fund Utilization
        </li>
        <li className="sidebar2-item" onClick={BillProcessing}>
          <img src={billp} alt="bill-png" />
          Bill Processing
        </li>
        <li className="sidebar2-item" onClick={logbook}>
          <img
            src={logb}
            alt="manp-png"
            style={{
              width: "23px",
              height: "auto",
            }}
          />
          Log Book
        </li>
      </ul>
    </div>
  );
};

export default Sidebar2;

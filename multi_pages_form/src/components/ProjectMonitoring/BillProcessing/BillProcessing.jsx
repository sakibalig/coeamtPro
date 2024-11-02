import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BillProcessing.css";

const BillProcessing = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [fund, setFund] = useState("");
  const [fundUsedType, setFundUsedType] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  // Fetch all projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('https://ipmproject.onrender.com/api/v1/user/getAllProjects');
        setProjects(response.data.data);
        console.log(response.data.data)
      } catch (error) {
        console.error("Error fetching projects", error);
      }
    };

    fetchProjects();
  }, []);

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedProject || !fund || !fundUsedType || !description || !file) {
      setMessage("Please fill all fields and upload a file");
      return;
    }

    const formData = new FormData();
    formData.append("projectId", selectedProject);
    formData.append("fund", fund);
    formData.append("fundUsedType", fundUsedType);
    formData.append("description", description);
    formData.append("file", file);

    try {
      const response = await axios.post(
        "https://ipmproject.onrender.com/api/v1/user/addUseFund",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error submitting form", error);
      setMessage("Error processing the request");
    }
  };

  return (
    <div className="bill-processing">
      <h2>Bill Processing</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Project Title</label>
          <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
          >
            <option value="">Select Project</option>
            {/* Ensure projects is not undefined or empty */}
            {projects?.length > 0 ? (
              projects.map((project) => (
                <option key={project._id} value={project._id}>
                  {project.title}
                </option>
              ))
            ) : (
              <option value="" disabled>
                No projects available
              </option>
            )}
          </select>
        </div>

        <div className="form-group">
          <label>Fund Amount</label>
          <input
            type="number"
            value={fund}
            onChange={(e) => setFund(e.target.value)}
            placeholder="Enter fund amount"
          />
        </div>

        <div className="form-group">
          <label>Fund Used For</label>
          <select
            value={fundUsedType}
            onChange={(e) => setFundUsedType(e.target.value)}
          >
            <option value="">Select Fund Used Type</option>
            <option value="manpower">Manpower</option>
            <option value="equipment">Equipment</option>
            <option value="contingency_and_consumables">
              Contingency and Consumables
            </option>
            <option value="travel">Travel</option>
          </select>
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
          ></textarea>
        </div>

        <div className="form-group">
          <label>Upload Invoice</label>
          <input type="file" onChange={handleFileUpload} />
        </div>

        <button type="submit">Submit</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default BillProcessing;

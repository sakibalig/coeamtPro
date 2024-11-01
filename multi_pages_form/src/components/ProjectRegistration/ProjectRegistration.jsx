import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import axios from 'axios';
import ProjectInformation from '../../components/Formpages/ProjectInformation.jsx';
import PICoPI from '../../components/Formpages/PICoPI.jsx';
import Department from '../../components/Formpages/Department.jsx';
import SponsorDetail from '../../components/Formpages/SponsorDetail.jsx';
import BudgetAllocation from '../../components/Formpages/BudgetAllocation.jsx';
import UploadDocument from '../../components/Formpages/UploadDocument.jsx';
import ProjectStaffForm from '../../components/Formpages/ProjectStaffForm.jsx';
import Review from '../../components/Formpages/Review.jsx';
import Sidebar from './SideBar/Sidebar';// dekat hai
import './ProjectRegistration.css';// dekat hai
import prev from '../../Assets/prev.jpg';
import next from '../../Assets/next.png';

const ProjectRegistration = () => {
  const pages = [
    'Project Information',
    'PI/Co-PI Details',
    'Department',
    'Sponsor Details',
    'Budget Allocation',
    'Upload Document',
    'Project Staff',
    'Review'
  ];

  const [currentPage, setCurrentPage] = useState(0);

  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      projectType: 'type1',
      projectTitle: 'as',
      projectCode: 'as',
      projectInitiation: new Date().toISOString(),
      projectDuration: 12,
      projectClosing: new Date().toISOString(),
      projectCost: 100000,
      numberOfInstallments: 12,
      pi: [{ 
        role: 'Co-PI',
        department: 'dep1',
        piName: 'as',
        employeeCode: 'as'
      }],
      sponsorName: 'as',
      sponsorAddress: 'as',
      contactPersonName: 'as',
      contactPersonDesignation: 'as',
      contactPersonMobile: 'as',
      contactPersonEmail: 'as.email.com',
      budgetAllocation: [ /* budget allocation data */ ],
      documents: [{ documentType: '', documentFile: null }],
      projectStaff: [{
        name: '',
        numberOfPost: 0,
        salaryPerHead: 0,
        totalSalary: 0,
        totalAmount: 0
      }]
    }
  });

  const PageComponents = [
    ProjectInformation,
    PICoPI,
    Department,
    SponsorDetail,
    BudgetAllocation,
    UploadDocument,
    ProjectStaffForm,
    Review
  ];

  const CurrentPage = PageComponents[currentPage];

  const nextPage = () => {
    methods.trigger().then((isValid) => {
      if (isValid) {
        setCurrentPage((prev) => Math.min(prev + 1, pages.length - 1));
      }
    });
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const onSubmit = async (data) => {
    try {
      console.log("Form data:", data);
      const formData = new FormData();

      formData.append('projectData', JSON.stringify(data));

      data.documents.forEach((document) => {
        if (document.documentFile?.[0]) {
          formData.append('documents', document.documentFile[0]);
        }
      });

      for (let pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }

      const response = await axios.post('http://localhost:8000/api/v1/user/registerProject', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log("Response data:", response.data);
      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit the form. Please try again.');
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="main-box">
        <Sidebar pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <div className="main-content">
          <CurrentPage />
          <div className="navigation-buttons">
            <div onClick={prevPage} disabled={currentPage === 0}>
              <img src={prev} alt="" />
            </div>
            {currentPage === pages.length - 1 ? (
              <button type="button" onClick={methods.handleSubmit(onSubmit)} className="button button-submit">
                Submit
              </button>
            ) : (
              <div onClick={nextPage}>
                <img src={next} alt="" />
              </div>
            )}
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default ProjectRegistration;
import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import axios from 'axios';
import ProjectInformation from '/Users/sakibkhan/Desktop/projects/Backend/multi_pages_form/src/components/Formpages/ProjectInformation.jsx';
import PICoPI from '/Users/sakibkhan/Desktop/projects/Backend/multi_pages_form/src/components/Formpages/PICoPI.jsx';
import Department from '/Users/sakibkhan/Desktop/projects/Backend/multi_pages_form/src/components/Formpages/Department.jsx';
import SponsorDetail from '/Users/sakibkhan/Desktop/projects/Backend/multi_pages_form/src/components/Formpages/SponsorDetail.jsx';
import BudgetAllocation from '/Users/sakibkhan/Desktop/projects/Backend/multi_pages_form/src/components/Formpages/BudgetAllocation.jsx';
import UploadDocument from '/Users/sakibkhan/Desktop/projects/Backend/multi_pages_form/src/components/Formpages/UploadDocument.jsx';
import ProjectStaffForm from '../Formpages/ProjectStaffForm';
import Review from '/Users/sakibkhan/Desktop/projects/Backend/multi_pages_form/src/components/Formpages/Review.jsx';
import Sidebar from './SideBar/Sidebar';
import './ProjectRegistration.css';
import prev from '/Users/sakibkhan/Desktop/projects/Backend/multi_pages_form/src/Assets/prev.jpg'
import next from '/Users/sakibkhan/Desktop/projects/Backend/multi_pages_form/src/Assets/next.png'

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
      // Updated role, department, piName, and employeeCode to be part of an array
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
      budgetAllocation: [
        {
          fundType: 'Contingency',
          installments: {
            installment1: 5000,
            installment2: 3000,
            installment3: 2000,
            installment4: 1000,
            installment5: 0,
          },
          totalAmount: 11000,
        },
        {
          fundType: 'Consumables',
          installments: {
            installment1: 2000,
            installment2: 1500,
            installment3: 1000,
            installment4: 500,
            installment5: 500,
          },
          totalAmount: 5500,
        },
        {
          fundType: 'Salary expenditure',
          installments: {
            installment1: 10000,
            installment2: 9000,
            installment3: 8000,
            installment4: 7000,
            installment5: 6000,
          },
          totalAmount: 40000,
        },
        {
          fundType: 'Fellowship',
          installments: {
            installment1: 7000,
            installment2: 6000,
            installment3: 5000,
            installment4: 4000,
            installment5: 3000,
          },
          totalAmount: 25000,
        },
        {
          fundType: 'Equipment',
          installments: {
            installment1: 30000,
            installment2: 25000,
            installment3: 20000,
            installment4: 15000,
            installment5: 10000,
          },
          totalAmount: 100000,
        },
        {
          fundType: 'Travel expenses',
          installments: {
            installment1: 5000,
            installment2: 4000,
            installment3: 3000,
            installment4: 2000,
            installment5: 1000,
          },
          totalAmount: 15000,
        },
        {
          fundType: 'Foreign travel',
          installments: {
            installment1: 20000,
            installment2: 15000,
            installment3: 10000,
            installment4: 5000,
            installment5: 3000,
          },
          totalAmount: 53000,
        },
        {
          fundType: 'Administrative expenses',
          installments: {
            installment1: 1000,
            installment2: 1000,
            installment3: 1000,
            installment4: 1000,
            installment5: 1000,
          },
          totalAmount: 5000,
        },
        {
          fundType: 'Consultancy fee',
          installments: {
            installment1: 7000,
            installment2: 6000,
            installment3: 5000,
            installment4: 4000,
            installment5: 3000,
          },
          totalAmount: 25000,
        },
        {
          fundType: 'Miscellaneous expenditure',
          installments: {
            installment1: 3000,
            installment2: 2000,
            installment3: 1000,
            installment4: 500,
            installment5: 500,
          },
          totalAmount: 7000,
        },
        {
          fundType: 'Honorarium',
          installments: {
            installment1: 3000,
            installment2: 2000,
            installment3: 1000,
            installment4: 500,
            installment5: 500,
          },
          totalAmount: 7000,
        },
        {
          fundType: 'Research top-up',
          installments: {
            installment1: 3000,
            installment2: 2000,
            installment3: 1000,
            installment4: 500,
            installment5: 500,
          },
          totalAmount: 7000,
        },
        {
          fundType: 'Overhead charges',
          installments: {
            installment1: 3000,
            installment2: 2000,
            installment3: 1000,
            installment4: 500,
            installment5: 500,
          },
          totalAmount: 7000,
        }
      ],
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
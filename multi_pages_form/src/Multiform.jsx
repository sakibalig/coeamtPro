import React, { useState } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Review from './Review';
import Success from './Success';

function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    paymentMethod: '',
    cardNumber: '',
    expirationDate: '',
    cvv: ''
  });

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleChange = input => e => {
    setFormData({ ...formData, [input]: e.target.value });
  };

  switch(step) {
    case 1:
      return (
        <Step1
          nextStep={nextStep}
          handleChange={handleChange}
          formData={formData}
        />
      );
    case 2:
      return (
        <Step2
          nextStep={nextStep}
          prevStep={prevStep}
          handleChange={handleChange}
          formData={formData}
        />
      );
    case 3:
      return (
        <Step3
          nextStep={nextStep}
          prevStep={prevStep}
          handleChange={handleChange}
          formData={formData}
        />
      );
    case 4:
      return (
        <Step4
          nextStep={nextStep}
          prevStep={prevStep}
          handleChange={handleChange}
          formData={formData}
        />
      );
    case 5:
      return (
        <Review
          nextStep={nextStep}
          prevStep={prevStep}
          formData={formData}
        />
      );
    case 6:
      return <Success />;
    default:
      return <div>Invalid step</div>;
  }
}

export default MultiStepForm;

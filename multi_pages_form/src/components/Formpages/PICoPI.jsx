import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import './PICoPI.css';

const PICoPI = () => {
  const { register, formState: { errors } } = useFormContext();
  const [piCoPIList, setPiCoPIList] = useState([{ role: '', department: '', piName: '', employeeCode: '' }]);

  const handleAddPI = () => {
    setPiCoPIList([...piCoPIList, { role: '', department: '', piName: '', employeeCode: '' }]);
  };

  const handleChange = (index, field, value) => {
    const updatedList = [...piCoPIList];
    updatedList[index][field] = value;
    setPiCoPIList(updatedList);
  };

  return (
    <div className="pico-pi">
      <h2 className="pico-pi__title">PI/Co-PI Details</h2>

      {piCoPIList.map((piCoPI, index) => (
        <div className="pico-pi__row" key={index}>
          <div className="pico-pi__group">
            <label htmlFor={`role_${index}`} className="pico-pi__label">01. Role</label>
            <select
              id={`role_${index}`}
              value={piCoPI.role}
              onChange={(e) => handleChange(index, 'role', e.target.value)}
              className="pico-pi__select"
            >
              <option value="">Select Role</option>
              <option value="PI">PI</option>
              <option value="Co-PI">Co-PI</option>
              <option value="Assistant">Assistant</option> {/* New option added */}
            </select>
            {errors[`role_${index}`] && <span className="pico-pi__error">{errors[`role_${index}`].message}</span>}
          </div>

          <div className="pico-pi__group">
            <label htmlFor={`department_${index}`} className="pico-pi__label">02. Department</label>
            <select
              id={`department_${index}`}
              value={piCoPI.department}
              onChange={(e) => handleChange(index, 'department', e.target.value)}
              className="pico-pi__select"
            >
              <option value="">Select Department</option>
              <option value="dep1">dep1</option>
              <option value="dep2">dep2</option>
              <option value="dep3">dep3</option>
            </select>
            {errors[`department_${index}`] && <span className="pico-pi__error">{errors[`department_${index}`].message}</span>}
          </div>

          <div className="pico-pi__group">
            <label htmlFor={`piName_${index}`} className="pico-pi__label">03. Name of PI</label>
            <input
              id={`piName_${index}`}
              value={piCoPI.piName}
              onChange={(e) => handleChange(index, 'piName', e.target.value)}
              className="pico-pi__input"
            />
            {errors[`piName_${index}`] && <span className="pico-pi__error">{errors[`piName_${index}`].message}</span>}
          </div>

          <div className="pico-pi__group">
            <label htmlFor={`employeeCode_${index}`} className="pico-pi__label">04. Employee Code</label>
            <input
              id={`employeeCode_${index}`}
              value={piCoPI.employeeCode}
              onChange={(e) => handleChange(index, 'employeeCode', e.target.value)}
              className="pico-pi__input"
            />
            {errors[`employeeCode_${index}`] && <span className="pico-pi__error">{errors[`employeeCode_${index}`].message}</span>}
          </div>
        </div>
      ))}

      <button type="button" className="pico-pi__add-button" onClick={handleAddPI}>Add More PI/Co-PI</button>
    </div>
  );
};

export default PICoPI;
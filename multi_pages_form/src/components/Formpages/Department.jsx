import React from 'react';
import { useFormContext } from 'react-hook-form';
import './Department.css';

const Department = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="department">
      <h2 className="department__title">Department</h2>

      <div className="department__row">
        <div className="department__group">
          <label htmlFor="department" className="department__label">Department</label>
          <select
            id="department"
            {...register("department", { required: "Department is required" })}
            className="department__select"
          >
            <option value="">Select Department</option>
            <option value="dep1">dep1</option>
            <option value="dep2">dep2</option>
            <option value="dep3">dep3</option>
          </select>
          {errors.department && <span className="department__error">{errors.department.message}</span>}
        </div>
      </div>
    </div>
  );
};

export default Department;

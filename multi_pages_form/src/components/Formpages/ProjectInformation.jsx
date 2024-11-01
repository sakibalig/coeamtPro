import React from 'react';
import { useFormContext } from 'react-hook-form';
import './ProjectInformation.css';

const ProjectInformation = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="project-information">
      <h2 className="project-information__title">Project Information</h2>

      <div className="project-information__row">
        <div className="project-information__group">
          <label htmlFor="projectType" className="project-information__label">01. Project Type</label>
          <select
            id="projectType"
            {...register("projectType", { required: "Project type is required" })}
            className="project-information__select"
          >
            <option value="">Select Project Type</option>
            <option value="type1">Type 1</option>
            <option value="type2">Type 2</option>
            <option value="type3">Type 3</option>
          </select>
          {errors.projectType && <span className="project-information__error">{errors.projectType.message}</span>}
        </div>

        <div className="project-information__group">
          <label htmlFor="projectTitle" className="project-information__label">02. Title of Project</label>
          <input
            id="projectTitle"
            {...register("projectTitle", { required: "Title of project is required" })}
            className="project-information__input"
          />
          {errors.projectTitle && <span className="project-information__error">{errors.projectTitle.message}</span>}
        </div>

        <div className="project-information__group">
          <label htmlFor="projectCode" className="project-information__label">03. Project Code</label>
          <input
            id="projectCode"
            {...register("projectCode", { required: "Project code is required" })}
            className="project-information__input"
          />
          {errors.projectCode && <span className="project-information__error">{errors.projectCode.message}</span>}
        </div>
      </div>

      <div className="project-information__row">
        <div className="project-information__group">
          <label htmlFor="projectInitiation" className="project-information__label">04. Project Initiation</label>
          <input
            type="date"
            id="projectInitiation"
            {...register("projectInitiation", { required: "Project initiation date is required" })}
            className="project-information__input"
          />
          {errors.projectInitiation && <span className="project-information__error">{errors.projectInitiation.message}</span>}
        </div>

        <div className="project-information__group">
          <label htmlFor="projectDuration" className="project-information__label">05. Project Duration (months)</label>
          <input
            id="projectDuration"
            type="number"
            {...register("projectDuration", { required: "Project duration is required" })}
            className="project-information__input"
          />
          {errors.projectDuration && <span className="project-information__error">{errors.projectDuration.message}</span>}
        </div>

        <div className="project-information__group">
          <label htmlFor="projectClosing" className="project-information__label">06. Project Closing</label>
          <input
            type="date"
            id="projectClosing"
            {...register("projectClosing", { required: "Project closing date is required" })}
            className="project-information__input"
          />
          {errors.projectClosing && <span className="project-information__error">{errors.projectClosing.message}</span>}
        </div>
      </div>

      <div className="project-information__row">
        <div className="project-information__group">
          <label htmlFor="projectCost" className="project-information__label">07. Project Cost</label>
          <input
            id="projectCost"
            type="number"
            {...register("projectCost", { required: "Project cost is required" ,valueAsNumber:true})}
            className="project-information__input"
          />
          {errors.projectCost && <span className="project-information__error">{errors.projectCost.message}</span>}
        </div>

        <div className="project-information__group">
          <label htmlFor="numberOfInstallments" className="project-information__label">08. Number of Installments</label>
          <input
            id="numberOfInstallments"
            type="number"
            {...register("numberOfInstallments", { required: "Number of installments is required",valueAsNumber:true })}
            className="project-information__input"
          />
          {errors.numberOfInstallments && <span className="project-information__error">{errors.numberOfInstallments.message}</span>}
        </div>
      </div>
    </div>
  );
};

export default ProjectInformation;

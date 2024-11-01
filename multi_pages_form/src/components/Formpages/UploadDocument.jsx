import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import './UploadDocument.css';

const UploadDocument = () => {
  const { register, formState: { errors } } = useFormContext();
  const [documentFields, setDocumentFields] = useState([{ id: 1 }]);

  const addDocumentField = () => {
    setDocumentFields((prevFields) => [...prevFields, { id: prevFields.length + 1 }]);
  };

  return (
    <div className="upload-document">
      <h2 className="upload-document__title">Upload Document</h2>

      {documentFields.map((field, index) => (
        <div className="upload-document__row" key={field.id}>
          <div className="upload-document__group">
            <label htmlFor={`documents[${index}].documentType`} className="upload-document__label">Document Type</label>
            <select
              id={`documents[${index}].documentType`}
              {...register(`documents[${index}].documentType`, { required: "Document type is required" })}
              className="upload-document__select"
            >
              <option value="">Select Document Type</option>
              <option value="sponsorApproval">Sponsor Approval copy</option>
              <option value="technicalProposal">Technical proposal copy</option>
              <option value="projectCreation">Project creation form at SRIC</option>
              <option value="otherDocument">Other document</option>
            </select>
            {errors?.documents?.[index]?.documentType && <span className="upload-document__error">{errors.documents[index].documentType.message}</span>}
          </div>

          <div className="upload-document__group upload-document__file-group">
            <label htmlFor={`documents[${index}].documentFile`} className="upload-document__label">Upload File</label>
            <input
              type="file"
              id={`documents[${index}].documentFile`}
              {...register(`documents[${index}].documentFile`, { required: "File is required" })}
              className="upload-document__file"
            />
            {errors?.documents?.[index]?.documentFile && <span className="upload-document__error">{errors.documents[index].documentFile.message}</span>}
          </div>
        </div>
      ))}

      <button type="button" className="upload-document__add-button" onClick={addDocumentField}>
        Add Document
      </button>
    </div>
  );
};

export default UploadDocument;

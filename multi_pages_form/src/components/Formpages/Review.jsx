import React from 'react';
import { useFormContext } from 'react-hook-form';
import './Review.css';

const Review = () => {
  const { getValues } = useFormContext();
  const values = getValues();

  const printFormData = () => {
    const printContent = `
      <html>
      <head>
        <title>Print Form Data</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h2 { color: #333; }
          .review-item { margin: 10px 0; }
          .review-item strong { display: inline-block; width: 200px; }
          .review-nested { margin-left: 20px; }
        </style>
      </head>
      <body>
        <h2>Form Data Review</h2>
        <div class="review-details">
          ${Object.keys(values).map((key) => {
            const value = values[key];

            if (typeof value === 'object' && value !== null) {
              return `
                <div class="review-item">
                  <strong>${key.replace(/([A-Z])/g, ' $1').toUpperCase()}:</strong>
                  <div class="review-nested">
                    ${Object.keys(value).map((nestedKey) => `
                      <div>
                        <strong>${nestedKey.replace(/([A-Z])/g, ' $1').toUpperCase()}:</strong> ${value[nestedKey]?.toString()}
                      </div>
                    `).join('')}
                  </div>
                </div>
              `;
            }

            return `
              <div class="review-item">
                <strong>${key.replace(/([A-Z])/g, ' $1').toUpperCase()}:</strong> ${value?.toString()}
              </div>
            `;
          }).join('')}
        </div>
      </body>
      </html>
    `;

    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.open();
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.onload = () => {
      printWindow.print();
    };
  };

  return (
    <div className="review">
      <h2 className="review__title">Review Your Information</h2>

      <div className="review__details">
        {Object.keys(values).map((key) => {
          const value = values[key];

          if (typeof value === 'object' && value !== null) {
            return (
              <div key={key} className="review__item">
                <strong>{key.replace(/([A-Z])/g, ' $1').toUpperCase()}:</strong>
                <div className="review__nested">
                  {Object.keys(value).map((nestedKey) => (
                    <div key={nestedKey}>
                      <strong>{nestedKey.replace(/([A-Z])/g, ' $1').toUpperCase()}:</strong> {value[nestedKey]?.toString()}
                    </div>
                  ))}
                </div>
              </div>
            );
          }

          return (
            <div key={key} className="review__item">
              <strong>{key.replace(/([A-Z])/g, ' $1').toUpperCase()}:</strong> {value?.toString()}
            </div>
          );
        })}
      </div>

      <button onClick={printFormData} className="review__print-button">
        Print
      </button>
    </div>
  );
};

export default Review;

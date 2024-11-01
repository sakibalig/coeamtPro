import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import './BudgetAllocation.css';

const fundTypes = [
  'Contingency',
  'Consumables',
  'Salary expenditure',
  'Fellowship',
  'Equipment',
  'Travel expenses',
  'Foreign travel',
  'Administrative exp.',
  'Consultancy fee',
  'Misc. expenditure',
  'Honorarium',
  'Research top-up',
  'Overhead charges',
];

const BudgetAllocation = () => {
  const { register, watch, setValue } = useFormContext();
  
  // Initialize budget allocation with default fund types if not already set
  const budgetAllocation = watch('budgetAllocation') || [];

  useEffect(() => {
    if (budgetAllocation.length === 0) {
      const initialAllocation = fundTypes.map(fundType => ({
        fundType,
        installments: {
          installment1: 0,
          installment2: 0,
          installment3: 0,
          installment4: 0,
          installment5: 0,
        },
        totalAmount: 0,
      }));
      setValue('budgetAllocation', initialAllocation);
    }
  }, [budgetAllocation, setValue]);

  const handleInputChange = (index, installmentName, value) => {
    const newBudgetAllocation = [...budgetAllocation];
    newBudgetAllocation[index].installments[installmentName] = parseFloat(value) || 0;
    
    const total = Object.values(newBudgetAllocation[index].installments).reduce((acc, curr) => acc + curr, 0);
    newBudgetAllocation[index].totalAmount = total;

    setValue('budgetAllocation', newBudgetAllocation);
  };

  const grandTotal = budgetAllocation.reduce((acc, row) => {
    const totalAmount = typeof row.totalAmount === 'number' ? row.totalAmount : 0;
    return acc + totalAmount;
  }, 0);

  // Calculate 18% GST
  const gstAmount = grandTotal * 0.18;

  return (
    <div className="budget-allocation-container">
      <div className="table-responsive">
        <table className="budget-table">
          <thead>
            <tr>
              <th>Fund Type</th>
              <th>1st Installment</th>
              <th>2nd Installment</th>
              <th>3rd Installment</th>
              <th>4th Installment</th>
              <th>5th Installment</th>
              <th>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {budgetAllocation.map((row, index) => (
              <tr key={index}>
                <td>{row.fundType}</td>
                {['installment1', 'installment2', 'installment3', 'installment4', 'installment5'].map((installment) => (
                  <td key={installment}>
                    <input
                      type="number"
                      {...register(`budgetAllocation.${index}.installments.${installment}`, { valueAsNumber: true })}
                      onChange={(e) => handleInputChange(index, installment, e.target.value)}
                      value={row.installments[installment]}
                    />
                  </td>
                ))}
                <td>{(row.totalAmount || 0).toFixed(2)}</td>
              </tr>
            ))}
            <tr className="total-row">
              <td colSpan="6" className="grand-total">Grand Total:</td>
              <td className="grand-total-amount">{grandTotal.toFixed(2)}</td>
            </tr>
            <tr className="gst-row">
              <td colSpan="6" className="gst-label">GST (18%):</td>
              <td className="gst-amount">{gstAmount.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BudgetAllocation;

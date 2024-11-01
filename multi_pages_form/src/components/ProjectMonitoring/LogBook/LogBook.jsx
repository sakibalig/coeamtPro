import React, { useState } from 'react';
import './LogBook.css';

const LogBook = () => {
  // Manually defined logbook data
  const logBookData = [
    {
      date: '2024-10-01',
      description: 'Purchase of equipment',
      category: 'Equipment',
      qty: 5,
      amount: 15000.00,
      vendorName: 'ABC Suppliers',
      billNo: 'INV12345',
      referenceNo: 'REF98765',
      remark: 'Delivered on time',
    },
    {
      date: '2024-10-05',
      description: 'Office Supplies',
      category: 'Contingency',
      qty: 20,
      amount: 500.00,
      vendorName: 'XYZ Stationery',
      billNo: 'INV67890',
      referenceNo: 'REF54321',
      remark: 'Urgent order',
    },
    {
      date: '2024-10-10',
      description: 'Travel expenses',
      category: 'Travel',
      qty: 1,
      amount: 2500.00,
      vendorName: 'Travel Agency Ltd.',
      billNo: 'INV11223',
      referenceNo: 'REF99887',
      remark: 'Business trip',
    },
  ];

  return (
    <div className='logbook-container'>
      <h1>Log Book</h1>
      
      {logBookData.length > 0 && (
        <div className="table-responsive">
          <table className="logbook-table">
            <thead>
              <tr>
                <th>Sl/No</th>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Qty</th>
                <th>Amount</th>
                <th>Vendor Name</th>
                <th>Bill No</th>
                <th>Reference No</th>
                <th>Remark</th>
              </tr>
            </thead>
            <tbody>
              {logBookData.map((row, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{row.date}</td>
                  <td>{row.description}</td>
                  <td>{row.category}</td>
                  <td>{row.qty}</td>
                  <td>{row.amount.toFixed(2)}</td>
                  <td>{row.vendorName}</td>
                  <td>{row.billNo}</td>
                  <td>{row.referenceNo}</td>
                  <td>{row.remark}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LogBook;

import React from 'react';
import { useFormContext } from 'react-hook-form';
import './SponsorDetail.css';

const SponsorDetail = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="sponsor-detail">
      <h2 className="sponsor-detail__title">Sponsor Detail</h2>

      <div className="sponsor-detail__row">
        <div className="sponsor-detail__group">
          <label htmlFor="sponsorName" className="sponsor-detail__label">Sponsor Name</label>
          <input
            id="sponsorName"
            {...register("sponsorName", { required: "Sponsor name is required" })}
            className="sponsor-detail__input"
          />
          {errors.sponsorName && <span className="sponsor-detail__error">{errors.sponsorName.message}</span>}
        </div>

        <div className="sponsor-detail__group">
          <label htmlFor="sponsorAddress" className="sponsor-detail__label">Sponsor Address</label>
          <input
            id="sponsorAddress"
            {...register("sponsorAddress", { required: "Sponsor address is required" })}
            className="sponsor-detail__input"
          />
          {errors.sponsorAddress && <span className="sponsor-detail__error">{errors.sponsorAddress.message}</span>}
        </div>

        <div className="sponsor-detail__group">
          <label htmlFor="contactPersonName" className="sponsor-detail__label">Contact Person Name</label>
          <input
            id="contactPersonName"
            {...register("contactPersonName", { required: "Contact person name is required" })}
            className="sponsor-detail__input"
          />
          {errors.contactPersonName && <span className="sponsor-detail__error">{errors.contactPersonName.message}</span>}
        </div>

        <div className="sponsor-detail__group">
          <label htmlFor="contactPersonDesignation" className="sponsor-detail__label">Contact Person Designation</label>
          <input
            id="contactPersonDesignation"
            {...register("contactPersonDesignation", { required: "Contact person designation is required" })}
            className="sponsor-detail__input"
          />
          {errors.contactPersonDesignation && <span className="sponsor-detail__error">{errors.contactPersonDesignation.message}</span>}
        </div>

        <div className="sponsor-detail__group">
          <label htmlFor="contactPersonMobile" className="sponsor-detail__label">Contact Person Mobile</label>
          <input
            id="contactPersonMobile"
            {...register("contactPersonMobile", { required: "Contact person mobile is required" })}
            className="sponsor-detail__input"
            type="tel"
          />
          {errors.contactPersonMobile && <span className="sponsor-detail__error">{errors.contactPersonMobile.message}</span>}
        </div>

        <div className="sponsor-detail__group">
          <label htmlFor="contactPersonEmail" className="sponsor-detail__label">Contact Person Email</label>
          <input
            id="contactPersonEmail"
            {...register("contactPersonEmail", { required: "Contact person email is required" })}
            className="sponsor-detail__input"
            type="email"
          />
          {errors.contactPersonEmail && <span className="sponsor-detail__error">{errors.contactPersonEmail.message}</span>}
        </div>
      </div>
    </div>
  );
};

export default SponsorDetail;

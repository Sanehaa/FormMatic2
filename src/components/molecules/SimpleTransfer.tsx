'use client';
import Address from '../atoms/Address';
import NewRegisteredOwners from '../atoms/NewRegisteredOwner';
import NewLien from '../atoms/NewLienHolder';
import VehicalInformation from '../atoms/VehicleInformation';
import Seller from '../atoms/Seller';
import SaveButton from '../atoms/savebutton';
import { FormDataProvider, useFormContext } from '../../app/api/formDataContext/formDataContextProvider';
import { ScenarioProvider } from '../../context/ScenarioContext';
import './Simpletransfer.css';
import TypeContainer from '../layouts/TransactionsContainer';
import React, { useEffect, useState } from 'react';

import LegalOwnerOfRecord from '../atoms/LegalOwnerOfRecord';
import SmogExemption from '../atoms/SmogExemption';
import VehicleTransactionDetails from '../atoms/Checkboxes';
import PowerOfAttorney from '../atoms/PowerOfAttorney';
import SellerAddress from '../atoms/SellerAdrress';

interface VehicleTransactionDetailsData {
  currentLienholder?: boolean;
  isSmogExempt?: boolean;
}

interface FormContextData {
  vehicleTransactionDetails?: VehicleTransactionDetailsData;
  [key: string]: any;
}

interface SimpleTransferProps {
  formData?: any;
  onDataChange?: (data: any) => void;
}

export default function SimpleTransfer({ formData, onDataChange }: SimpleTransferProps) {
  const [formValues, setFormValues] = useState(formData || {});
  useEffect(() => {
    if (onDataChange) {
      onDataChange(formData);     }
  }, [formData]);
  useEffect(() => {
    setFormValues(formData);
  }, [formData]);

  const FormContent = () => {
    const { formData: contextFormData } = useFormContext() as { formData: FormContextData };
    const { updateField } = useFormContext();

    useEffect(() => {
      if (formValues) {
        Object.entries(formValues).forEach(([key, value]) => {
          updateField(key, value);
        });
      }
    }, [formValues]);

    const isCurrentLienholder = contextFormData?.vehicleTransactionDetails?.currentLienholder === true;
    const isSmogExempt = contextFormData?.vehicleTransactionDetails?.isSmogExempt === true;

    return (
      <div className='wholeForm'>
        <TypeContainer />
        <VehicleTransactionDetails formData={formValues} />

        <VehicalInformation formData={formValues}/>
        <Seller formData={formValues} />
        <SellerAddress formData={formValues} />
        {isCurrentLienholder && (
          <LegalOwnerOfRecord formData={formValues} />
        )}
        <NewRegisteredOwners formData={formValues} />
        <Address formData={formValues} />
        <PowerOfAttorney formData={formValues} />
         {isSmogExempt && (
          <SmogExemption formData={formValues} />
        )}
        <SaveButton 
          transactionType="Simple Transfer"
          onSuccess={() => console.log('Save completed successfully')}
        />
      </div>
    );
  };

  return (
    <FormDataProvider>
      <ScenarioProvider>
        <div className="simpleTransferWrapper">
          <FormContent />
        </div>
      </ScenarioProvider>
    </FormDataProvider>
  );
}
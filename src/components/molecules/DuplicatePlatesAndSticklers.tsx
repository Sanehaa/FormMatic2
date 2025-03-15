'use client';
import Seller from '../atoms/Seller';
import SaveButton from '../atoms/savebutton';
import { FormDataProvider, useFormContext } from '../../app/api/formDataContext/formDataContextProvider';
import { ScenarioProvider } from '../../context/ScenarioContext';
import './Simpletransfer.css';
import TypeContainer from '../layouts/TransactionsContainer';
import React, { useEffect, useState } from 'react';
import SellerAddress from '../atoms/SellerAdrress';
import LicensePlate from '../atoms/LicensePlate';
import VehicleInformation from '../atoms/VehicleInformation';
import ItemRequested from '../atoms/ItemRequested';
import TitleField from '../atoms/TitleCompany';

interface VehicleTransactionDetailsData {
  currentLienholder?: boolean;
  isMotorcycle?: boolean;
}

interface FormContextData {
  vehicleTransactionDetails?: VehicleTransactionDetailsData;
  vehicleInformation?: any;
  [key: string]: any;
}

interface DuplicatePlatesAndStickersTransferProps {
  formData?: any;
}

export default function DuplicatePlatesAndStickersTransfer({ formData }: DuplicatePlatesAndStickersTransferProps) {
  const [formValues, setFormValues] = useState(formData || {});

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
    
 
    const [isMotorcycle, setIsMotorcycle] = useState<boolean>(
      contextFormData?.vehicleTransactionDetails?.isMotorcycle || false
    );

    useEffect(() => {
      if (contextFormData?.vehicleTransactionDetails?.isMotorcycle !== undefined) {
        setIsMotorcycle(contextFormData.vehicleTransactionDetails.isMotorcycle);
      }
    }, [contextFormData?.vehicleTransactionDetails?.isMotorcycle]);

    const handleMotorcycleChange = () => {
      const newValue = !isMotorcycle;
      setIsMotorcycle(newValue);
      
 
      const currentDetails = contextFormData?.vehicleTransactionDetails || {};
      updateField('vehicleTransactionDetails', {
        ...currentDetails,
        isMotorcycle: newValue
      });
      
 
      if (!newValue) {
        const currentVehicleInfo = contextFormData.vehicleInformation || {};
        if (currentVehicleInfo.engineNumber) {
          updateField('vehicleInformation', {
            ...currentVehicleInfo,
            engineNumber: ''
          });
        }
      }
    };

    return (
      <div className='wholeForm'>
        <TypeContainer />
        
        {/* Motorcycle checkbox */}
        <div className="releaseWrapper">
          <div className="headerRow">
            <h3 className="releaseHeading">Vehicle Type</h3>
          </div>

          <div className="checkbox-container">
            <div className="checkbox-section">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={isMotorcycle}
                  onChange={handleMotorcycleChange}
                />
                Is the vehicle a Motorcycle
              </label>
            </div>
          </div>
        </div>

        <VehicleInformation 
          formData={formValues}
          isDuplicateRegistrationMode={true}
        />        
        <Seller formData={formValues} />
        <SellerAddress formData={formValues} />
        <ItemRequested formData={formValues}/>
        <TitleField formData={formData} />

        <LicensePlate formData={formData} />
        
        <SaveButton 
          transactionType="Duplicate Plates & Stickers"
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
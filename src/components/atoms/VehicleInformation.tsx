'use client';
import React, { useEffect } from 'react';
import { useFormContext } from '../../app/api/formDataContext/formDataContextProvider';
import './VehicleInformation.css';

interface VehicleInformationType {
  licensePlate?: string;
  hullId?: string;
  engineNumber?: string;  
  year?: string;
  make?: string;
  odometerDiscrepancyExplanation?: string;
  mileage?: string;
  notActualMileage?: boolean;
  exceedsMechanicalLimit?: boolean;
  vehicleUnder10001lbs?: boolean;
  isMotorcycle?: boolean;
  gvwCode?: string;
  cgwCode?: string;
  operationDate?: string;
}

interface VehicleInformationProps {
  formData?: {
    vehicleInformation?: VehicleInformationType;
    vehicleTransactionDetails?: {
      isMotorcycle?: boolean;
    };
  };   onChange?: (data: VehicleInformationType) => void;
}

const initialVehicleInformation: VehicleInformationType = {
  licensePlate: '',
  hullId: '',
  engineNumber: '',
  year: '',
  make: '',
  odometerDiscrepancyExplanation: '',
  mileage: '',
  notActualMileage: false,
  exceedsMechanicalLimit: false,
  vehicleUnder10001lbs: false,
  isMotorcycle: false,
  gvwCode: '',
  cgwCode: '',
  operationDate: ''
};

const VehicleInformation: React.FC<VehicleInformationProps> = ({ formData: propFormData, onChange }) => {
  const { formData: contextFormData, updateField } = useFormContext();

  const formData = {
    ...contextFormData,
    ...propFormData
  };

  useEffect(() => {
    if (!formData.vehicleInformation) {
      const newData = initialVehicleInformation;
      updateField('vehicleInformation', newData);       if (onChange) {
        onChange(newData);
      }
    }
  }, []);

  useEffect(() => {
    const isCurrentlyMotorcycle = formData.vehicleTransactionDetails?.isMotorcycle === true;
    const currentInfo = (formData.vehicleInformation || {}) as VehicleInformationType;
    
  
    if (!isCurrentlyMotorcycle && currentInfo.engineNumber) {
      const newInfo = {
        ...currentInfo,
        engineNumber: ''       };       updateField('vehicleInformation', newInfo);       if (onChange) {
        onChange(newInfo);
      }
    }
  }, [formData.vehicleTransactionDetails?.isMotorcycle]);

  const handleVehicleInfoChange = (field: keyof VehicleInformationType, value: string | boolean) => {
    const currentInfo = (formData.vehicleInformation || {}) as VehicleInformationType;
    let newInfo: VehicleInformationType;     if (field === 'notActualMileage' && value === true) {       newInfo = { 
        ...currentInfo, 
        [field]: value, 
        exceedsMechanicalLimit: false 
      };
    } else if (field === 'exceedsMechanicalLimit' && value === true) {       newInfo = { 
        ...currentInfo, 
        [field]: value, 
        notActualMileage: false 
      };
    } else {       newInfo = { ...currentInfo, [field]: value };
    }     updateField('vehicleInformation', newInfo);     if (onChange) {
      onChange(newInfo);
    }
  };

  const isMotorcycle = formData.vehicleTransactionDetails?.isMotorcycle === true;

  return (
    <div className="vehicleInformationWrapper">
      <div className="vehicleHeaderContainer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h3 className="vehicleInformationHeading">Vehicle Information</h3>
      </div>
      <div className="vehicleFirstGroup">
        {isMotorcycle && (
          <div className="vehicleFormItem">
            <label className="yearlabel">Motorcycle Engine Number</label>
            <input
              className="yearInput"
              type="text"
              placeholder="Motorcycle Engine Number"
              value={(formData.vehicleInformation as VehicleInformationType)?.engineNumber || ''}
              onChange={(e) => handleVehicleInfoChange('engineNumber', e.target.value)}
            />
          </div>
        )}
        <div className="vehicleFormItem">
          <label className="yearlabel">Vehicle/Hull Identification Number</label>
          <input
            className="makeInput"
            type="text"
            placeholder="Vehicle/ Hull Identification Number"
            value={(formData.vehicleInformation as VehicleInformationType)?.hullId || ''}
            onChange={(e) => handleVehicleInfoChange('hullId', e.target.value)}
          />
        </div>
        <div className="vehicleFormItem">
          <label className="yearlabel">Vehicle License Plate or Vessel CF Number</label>
          <input
            className="odometerInput"
            type="text"
            placeholder="Vehicle License Plate or Vessel CF Number"
            value={(formData.vehicleInformation as VehicleInformationType)?.licensePlate || ''}
            onChange={(e) => handleVehicleInfoChange('licensePlate', e.target.value)}
          />
        </div>
      </div>
      
      <div className="vehicleFirstGroup">
        <div className="vehicleFormItem">
          <label className="yearlabel">Year of Vehicle</label>
          <input
            className="yearInput"
            type="text"
            placeholder="Year of Vehicle"
            value={(formData.vehicleInformation as VehicleInformationType)?.year || ''}
            onChange={(e) => handleVehicleInfoChange('year', e.target.value)}
          />
        </div>
        <div className="vehicleFormItem">
          <label className="yearlabel">Make of Vehicle OR Vessel Builder</label>
          <input
            className="makeInput"
            type="text"
            placeholder="Make of Vehicle OR Vessel Builder"
            value={(formData.vehicleInformation as VehicleInformationType)?.make || ''}
            onChange={(e) => handleVehicleInfoChange('make', e.target.value)}
          />
        </div>
      </div>


<div className="mileageRow">
  <div className="mileageField">
    <label className="yearlabel">Mileage of Vehicle</label>
    <input
      className="yearInput"
      type="text"
      placeholder="Vehicle Mileage"
      value={(formData.vehicleInformation as VehicleInformationType)?.mileage || ''}
      onChange={(e) => {
        const value = e.target.value;
        const numericValue = value.replace(/[^0-9]/g, '');
        const limitedValue = numericValue.slice(0, 6);
        
        handleVehicleInfoChange('mileage', limitedValue);
      }}
      maxLength={6}
    />
  </div>
  
  <div className="mileageCheckboxes">
    <label className="checkboxLabel">
      <input
        type="checkbox"
        checked={(formData.vehicleInformation as VehicleInformationType)?.notActualMileage || false}
        onChange={(e) => handleVehicleInfoChange('notActualMileage', e.target.checked)}
        className="checkboxInput"
        disabled={(formData.vehicleInformation as VehicleInformationType)?.exceedsMechanicalLimit || false}
      />
      NOT Actual Mileage
    </label>
    
    <label className="checkboxLabel">
      <input
        type="checkbox"
        checked={(formData.vehicleInformation as VehicleInformationType)?.exceedsMechanicalLimit || false}
        onChange={(e) => handleVehicleInfoChange('exceedsMechanicalLimit', e.target.checked)}
        className="checkboxInput"
        disabled={(formData.vehicleInformation as VehicleInformationType)?.notActualMileage || false}
      />
      Mileage Exceeds Mechanical Limit
    </label>
  </div>
</div>
      {/* <div className="newRegThirdItem">
        <label className="registeredOwnerLabel">Date Vehicle Will Be or Was Operated at This Weight</label>
        <input
          className="registeredDateInput"
          type="text"
          placeholder="MM/DD/YYYY"
          value={(formData.vehicleInformation as VehicleInformationType)?.operationDate || ''}
          onChange={(e) => handleVehicleInfoChange('operationDate', e.target.value)}
        />
      </div> */}
    </div>
  );
};

export default VehicleInformation;
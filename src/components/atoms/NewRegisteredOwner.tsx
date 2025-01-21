'use client';
import React, { useRef, useState, useEffect } from 'react';
import { useFormContext } from '../../app/api/formDataContext/formDataContextProvider';
import './NewRegisteredOwner.css';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const NewRegisteredOwners: React.FC = () => {
  const { formData, updateField } = useFormContext();

  const [isRegMenuOpen, setIsRegMenuOpen] = useState(false);
  const [isHowManyMenuOpen, setIsHowManyMenuOpen] = useState(false);

  const regRef = useRef<HTMLUListElement | null>(null);
  const howManyRef = useRef<HTMLUListElement | null>(null);


  const states = [
    { name: 'Alabama', abbreviation: 'AL' },
    { name: 'Alaska', abbreviation: 'AK' },
    { name: 'Arizona', abbreviation: 'AZ' },
    { name: 'Arkansas', abbreviation: 'AR' },
    { name: 'California', abbreviation: 'CA' },
    { name: 'Colorado', abbreviation: 'CO' },
    { name: 'Connecticut', abbreviation: 'CT' },
    { name: 'Delaware', abbreviation: 'DE' },
    { name: 'Florida', abbreviation: 'FL' },
    { name: 'Georgia', abbreviation: 'GA' },
    { name: 'Hawaii', abbreviation: 'HI' },
    { name: 'Idaho', abbreviation: 'ID' },
    { name: 'Illinois', abbreviation: 'IL' },
    { name: 'Indiana', abbreviation: 'IN' },
    { name: 'Iowa', abbreviation: 'IA' },
    { name: 'Kansas', abbreviation: 'KS' },
    { name: 'Kentucky', abbreviation: 'KY' },
    { name: 'Louisiana', abbreviation: 'LA' },
    { name: 'Maine', abbreviation: 'ME' },
    { name: 'Maryland', abbreviation: 'MD' },
    { name: 'Massachusetts', abbreviation: 'MA' },
    { name: 'Michigan', abbreviation: 'MI' },
    { name: 'Minnesota', abbreviation: 'MN' },
    { name: 'Mississippi', abbreviation: 'MS' },
    { name: 'Missouri', abbreviation: 'MO' },
    { name: 'Montana', abbreviation: 'MT' },
    { name: 'Nebraska', abbreviation: 'NE' },
    { name: 'Nevada', abbreviation: 'NV' },
    { name: 'New Hampshire', abbreviation: 'NH' },
    { name: 'New Jersey', abbreviation: 'NJ' },
    { name: 'New Mexico', abbreviation: 'NM' },
    { name: 'New York', abbreviation: 'NY' },
    { name: 'North Carolina', abbreviation: 'NC' },
    { name: 'North Dakota', abbreviation: 'ND' },
    { name: 'Ohio', abbreviation: 'OH' },
    { name: 'Oklahoma', abbreviation: 'OK' },
    { name: 'Oregon', abbreviation: 'OR' },
    { name: 'Pennsylvania', abbreviation: 'PA' },
    { name: 'Rhode Island', abbreviation: 'RI' },
    { name: 'South Carolina', abbreviation: 'SC' },
    { name: 'South Dakota', abbreviation: 'SD' },
    { name: 'Tennessee', abbreviation: 'TN' },
    { name: 'Texas', abbreviation: 'TX' },
    { name: 'Utah', abbreviation: 'UT' },
    { name: 'Vermont', abbreviation: 'VT' },
    { name: 'Virginia', abbreviation: 'VA' },
    { name: 'Washington', abbreviation: 'WA' },
    { name: 'West Virginia', abbreviation: 'WV' },
    { name: 'Wisconsin', abbreviation: 'WI' },
    { name: 'Wyoming', abbreviation: 'WY' },
  ];

  const howManyOptions = ['1', '2', '3'];

  const handleClickOutsideMenus = (e: MouseEvent) => {
    const target = e.target as Element;
    if (
      regRef.current &&
      !regRef.current.contains(target) &&
      !target.closest('.regStateDropDown')
    ) {
      setIsRegMenuOpen(false);
    }
    if (
      howManyRef.current &&
      !howManyRef.current.contains(target) &&
      !target.closest('.howManyDropDown')
    ) {
      setIsHowManyMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideMenus);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideMenus);
    };
  }, []);

  return (
    <div className="new-registered-owners">
      <div className="newRegHeader">
        <h3 className="newRegHeading">New Registered Owner(s)</h3>
        <div className="howManyWrapper">
          <button
            onClick={() => setIsHowManyMenuOpen(!isHowManyMenuOpen)}
            className="howManyDropDown"
          >
            {formData.howMany || 'How Many'}
            <ChevronDownIcon
              className={`howManyIcon ${isHowManyMenuOpen ? 'rotate' : ''}`}
            />
          </button>
          {isHowManyMenuOpen && (
            <ul ref={howManyRef} className="howManyMenu">
              {howManyOptions.map((option, index) => (
                <li
                  className="howManyLists"
                  key={index}
                  onClick={() => updateField('howMany', option)}
                >
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="newRegFirstGroup">
        <div className="newRegFormItem">
          <label className="registeredOwnerLabel">First Name</label>
          <input
            className="registeredOwnerInput"
            type="text"
            placeholder="First Name"
            value={formData.firstName || ''}
            onChange={(e) => updateField('firstName', e.target.value)}
          />
        </div>
        <div className="newRegFormItem">
          <label className="registeredOwnerLabel">Middle Name</label>
          <input
            className="registeredOwnerInput"
            type="text"
            placeholder="Middle Name"
            value={formData.middleName || ''}
            onChange={(e) => updateField('middleName', e.target.value)}
          />
        </div>
        <div className="newRegFormItem">
          <label className="registeredOwnerLabel">Last Name</label>
          <input
            className="registeredOwnerInput"
            type="text"
            placeholder="Last Name"
            value={formData.lastName || ''}
            onChange={(e) => updateField('lastName', e.target.value)}
          />
        </div>
      </div>

      <div className="newRegSecondGroup">
        <div className="newRegInfo">
          <label className="registeredOwnerLabel">Driver License Number</label>
          <input
            className="registeredOwnerLicenseInput"
            type="text"
            placeholder="Driver License Number"
            value={formData.licenseNumber || ''}
            onChange={(e) => updateField('licenseNumber', e.target.value)}
          />
        </div>

        <div className="regStateWrapper">
          <label className="registeredOwnerLabel">State</label>
          <button
            onClick={() => setIsRegMenuOpen(!isRegMenuOpen)}
            className="regStateDropDown"
          >
            {formData.state || 'State'}
            <ChevronDownIcon
              className={`regIcon ${isRegMenuOpen ? 'rotate' : ''}`}
            />
          </button>
          {isRegMenuOpen && (
            <ul ref={regRef} className="regStateMenu">
              {states.map((state, index) => (
                <li
                  className="regStateLists"
                  key={index}
                  onClick={() => updateField('state', state.abbreviation)}
                >
                  {state.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="newRegThirdGroup">
        <div className="newRegThirdItem">
          <label className="registeredOwnerLabel">Phone Number</label>
          <input
            className="registeredNumberInput"
            type="text"
            placeholder="Phone Number"
            value={formData.phoneNumber || ''}
            onChange={(e) => updateField('phoneNumber', e.target.value)}
          />
        </div>
        <div className="newRegThirdItem">
          <label className="registeredOwnerLabel">Date of Purchase</label>
          <input
            className="registeredDateInput"
            type="text"
            placeholder="MM/DD/YYYY"
            value={formData.purchaseDate || ''}
            onChange={(e) => updateField('purchaseDate', e.target.value)}
          />
        </div>
        <div className="newRegThirdItem">
          <label className="registeredOwnerLabel">Purchase Price/Value</label>
          <input
            className="registeredValueInput"
            type="text"
            placeholder="Enter Amount"
            value={formData.purchaseValue || ''}
            onChange={(e) => updateField('purchaseValue', e.target.value)}
          />
        </div>
        <div className="newRegThirdItem checkboxWrapper">
          <label className="checkboxLabel">
            <input
              type="checkbox"
              className="checkboxInput"
              checked={formData.isGift || false}
              onChange={(e) => updateField('isGift', e.target.checked)}
            />{' '}
            Gift
          </label>
          <label className="checkboxLabel">
            <input
              type="checkbox"
              className="checkboxInput"
              checked={formData.isTrade || false}
              onChange={(e) => updateField('isTrade', e.target.checked)}
            />{' '}
            Trade
          </label>
        </div>
      </div>
    </div>
  );
};

export default NewRegisteredOwners;

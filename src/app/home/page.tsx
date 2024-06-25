'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import './home.css';
import { useAppContext } from '@/context';
import Link from 'next/link';
import { IClient } from '@/models/clientSchema';
import { UserAuth } from "../../context/AuthContext";
import { useRouter } from 'next/navigation';

export default function Home() {
  const { formData, setFormData, setTransactions } = useAppContext()!;
  const { user } = UserAuth();

  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

  const [addSecondRegisteredOwner, setAddSecondRegisteredOwner] = useState(false);
  const [addThirdRegisteredOwner, setAddThirdRegisteredOwner] = useState(false);
  const [searchFor, setSearchFor] = useState('');

  const handleClickAddSecondRegisteredOwner = () => {
    setAddSecondRegisteredOwner(true);
  };

  const handleClickAddThirdRegisteredOwner = () => {
    setAddThirdRegisteredOwner(true);
  };

  const handleClickRemoveSecondRegisteredOwner = () => {
    setAddSecondRegisteredOwner(false);
  };

  const handleClickRemoveThirdRegisteredOwner = () => {
    setAddThirdRegisteredOwner(false);
  };
  const handleSearch = async () => {
    try {
      const res = await fetch(`/api/get?searchFor=${searchFor}`);
      const data = await res.json();
      data.sort(
        (a: IClient, b: IClient) =>
          new Date(b.timeCreated).getTime() - new Date(a.timeCreated).getTime(),
      );
      console.log(data);
      setTransactions(data);
    } catch (error) {
      console.error('Error fetching clients:', error);
      alert('The Item You Are Looking For Was Not Found');
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch('/api/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      await response.json();
      alert('Client Saved!');
    } catch (error) {
      console.error('Error in handleSave:', error);
    }
  };

  const handleNext = async () => {
    try {
      // const response = await fetch('/api/pdfLoader', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //  body: JSON.stringify(formData),
      // });
      // const data = await response.json();
      // setPdfData(data.pdfData);
    } catch (error) {
      console.error('Error navigating to the PDF page:', error);
    }
  };


  return (
    <>
      <div className="centerContainer">
        <input
          className="inputSearch"
          placeholder="Search by First Name, Last Name, or VIN"
          value={searchFor}
          onChange={(e) => setSearchFor(e.target.value)}
        />
        <Link
          href="/transactions"
          className="buttonSearch"
          style={{ marginLeft: '5px' }}
          onClick={handleSearch}
        >
          Search
        </Link>
      </div>
      <div className="middleContainer">
        <h3 className="title">
          Registered Owner #1
          <button style={{ marginLeft: '10px' }} onClick={handleClickAddSecondRegisteredOwner}>
            Add Registered Owner
          </button>
        </h3>

        <label style={{ marginLeft: '10px' }}>First Name</label>
        <input
          className="inputData"
          value={formData.firstName1}
          onChange={(e) => setFormData({ ...formData, firstName1: e.target.value })}
        />

        <label style={{ marginLeft: '10px', marginTop: '10px' }}>Middle Name</label>
        <input
          className="inputData"
          value={formData.middleName1}
          onChange={(e) => setFormData({ ...formData, middleName1: e.target.value })}
        />

        <label style={{ marginLeft: '10px', marginTop: '10px' }}>Last Name</label>
        <input
          className="inputData"
          value={formData.lastName1}
          onChange={(e) => setFormData({ ...formData, lastName1: e.target.value })}
        />

        <label style={{ marginLeft: '10px', marginTop: '10px' }}>Driver License Number</label>
        <input
          className="inputData"
          value={formData.licenseNumber1}
          onChange={(e) => setFormData({ ...formData, licenseNumber1: e.target.value })}
        />

        {addSecondRegisteredOwner && (
          <>
            <h3 className="title">
              Registered Owner #2
              <button style={{ marginLeft: '10px' }} onClick={handleClickAddThirdRegisteredOwner}>
                Add Registered Owner
              </button>
              <button
                style={{ color: 'red', marginLeft: '10px' }}
                onClick={handleClickRemoveSecondRegisteredOwner}
              >
                Remove Registered Owner
              </button>
            </h3>

            <label style={{ marginBottom: '3px' }}>
              <input
                type="radio"
                value="AND"
                name="secondOwnershipType"
                onClick={() => setFormData({ ...formData, and1: true })}
              />
              AND
            </label>

            <label style={{ marginBottom: '5px' }}>
              <input
                type="radio"
                value="OR"
                name="secondOwnershipType"
                onClick={() => setFormData({ ...formData, or1: true })}
              />
              OR
            </label>

            <label style={{ marginLeft: '10px' }}>First Name</label>
            <input
              className="inputData"
              value={formData.firstName2}
              onChange={(e) => setFormData({ ...formData, firstName2: e.target.value })}
            />

            <label style={{ marginLeft: '10px', marginTop: '10px' }}>Middle Name</label>
            <input
              className="inputData"
              value={formData.middleName2}
              onChange={(e) => setFormData({ ...formData, middleName2: e.target.value })}
            />

            <label style={{ marginLeft: '10px', marginTop: '10px' }}>Last Name</label>
            <input
              className="inputData"
              value={formData.lastName2}
              onChange={(e) => setFormData({ ...formData, lastName2: e.target.value })}
            />

            <label style={{ marginLeft: '10px', marginTop: '10px' }}>Driver License Number</label>
            <input
              className="inputData"
              value={formData.licenseNumber2}
              onChange={(e) => setFormData({ ...formData, licenseNumber2: e.target.value })}
            />
          </>
        )}

        {addThirdRegisteredOwner && (
          <>
            <h3 className="title">
              Registered Owner #3
              <button style={{ marginLeft: '10px' }}>Add Registered Owner</button>
              <button
                style={{ color: 'red', marginLeft: '10px' }}
                onClick={handleClickRemoveThirdRegisteredOwner}
              >
                Remove Registered Owner
              </button>
            </h3>

            <label style={{ marginBottom: '3px' }}>
              <input
                type="radio"
                value="AND"
                name="thirdOwnershipType"
                onClick={() => setFormData({ ...formData, and2: true })}
              />
              AND
            </label>

            <label style={{ marginBottom: '5px' }}>
              <input
                type="radio"
                value="OR"
                name="thirdOwnershipType"
                onClick={() => setFormData({ ...formData, or2: true })}
              />
              OR
            </label>

            <label style={{ marginLeft: '10px' }}>First Name</label>
            <input
              className="inputData"
              value={formData.firstName3}
              onChange={(e) => setFormData({ ...formData, firstName3: e.target.value })}
            />

            <label style={{ marginLeft: '10px', marginTop: '10px' }}>Middle Name</label>
            <input
              className="inputData"
              value={formData.middleName3}
              onChange={(e) => setFormData({ ...formData, middleName3: e.target.value })}
            />

            <label style={{ marginLeft: '10px', marginTop: '10px' }}>Last Name</label>
            <input
              className="inputData"
              value={formData.lastName3}
              onChange={(e) => setFormData({ ...formData, lastName3: e.target.value })}
            />

            <label style={{ marginLeft: '10px', marginTop: '10px' }}>Driver License Number</label>
            <input
              className="inputData"
              value={formData.licenseNumber3}
              onChange={(e) => setFormData({ ...formData, licenseNumber3: e.target.value })}
            />
          </>
        )}

        <h3 className="title">Residence Or Business Address</h3>

        <label style={{ marginLeft: '10px' }}>Residence/Business Address</label>
        <input
          className="inputData"
          value={formData.residentualAddress}
          onChange={(e) => setFormData({ ...formData, residentualAddress: e.target.value })}
        />

        <label style={{ marginLeft: '10px', marginTop: '10px' }}>APT/SPACE/STE#</label>
        <input
          className="inputData"
          value={formData.residentualAptSpace}
          onChange={(e) => setFormData({ ...formData, residentualAptSpace: e.target.value })}
        />

        <label style={{ marginLeft: '10px', marginTop: '10px' }}>City</label>
        <input
          className="inputData"
          value={formData.residentualCity}
          onChange={(e) => setFormData({ ...formData, residentualCity: e.target.value })}
        />

        <label style={{ marginLeft: '10px', marginTop: '10px' }}>State</label>
        <input
          className="inputData"
          value={formData.residentualState}
          onChange={(e) => setFormData({ ...formData, residentualState: e.target.value })}
        />

        <label style={{ marginLeft: '10px', marginTop: '10px' }}>Zip Code</label>
        <input
          className="inputData"
          value={formData.residentualZipCode}
          onChange={(e) => setFormData({ ...formData, residentualZipCode: e.target.value })}
        />

        <h3 className="title">Mailing Address</h3>

        <label style={{ marginLeft: '10px' }}>Mailing Address</label>
        <input
          className="inputData"
          value={formData.mailingAddress}
          onChange={(e) => setFormData({ ...formData, mailingAddress: e.target.value })}
        />

        <label style={{ marginLeft: '10px', marginTop: '10px' }}>PO Box</label>
        <input
          className="inputData"
          value={formData.mailingPoBox}
          onChange={(e) => setFormData({ ...formData, mailingPoBox: e.target.value })}
        />

        <label style={{ marginLeft: '10px', marginTop: '10px' }}>City</label>
        <input
          className="inputData"
          value={formData.mailingCity}
          onChange={(e) => setFormData({ ...formData, mailingCity: e.target.value })}
        />

        <label style={{ marginLeft: '10px', marginTop: '10px' }}>State</label>
        <input
          className="inputData"
          value={formData.mailingState}
          onChange={(e) => setFormData({ ...formData, mailingState: e.target.value })}
        />

        <label style={{ marginLeft: '10px', marginTop: '10px' }}>Zip Code</label>
        <input
          className="inputData"
          value={formData.mailingZipCode}
          onChange={(e) => setFormData({ ...formData, mailingZipCode: e.target.value })}
        />

        <h3 className="title">Vehicle Information</h3>

        <label style={{ marginLeft: '10px' }}>VIN Number</label>
        <input
          className="inputData"
          value={formData.vehicleVinNumber}
          onChange={(e) => setFormData({ ...formData, vehicleVinNumber: e.target.value })}
        />

        <label style={{ marginLeft: '10px', marginTop: '10px' }}>License Plate Number</label>
        <input
          className="inputData"
          value={formData.vehicleLicensePlateNumber}
          onChange={(e) => setFormData({ ...formData, vehicleLicensePlateNumber: e.target.value })}
        />

        <label style={{ marginLeft: '10px', marginTop: '10px' }}>Make</label>
        <input
          className="inputData"
          value={formData.vehicleMake}
          onChange={(e) => setFormData({ ...formData, vehicleMake: e.target.value })}
        />

        <label style={{ marginLeft: '10px', marginTop: '10px' }}>Seller Date: Month</label>
        <input
          className="smallInputData"
          value={formData.vehicleSaleMonth}
          onChange={(e) => setFormData({ ...formData, vehicleSaleMonth: e.target.value })}
        />

        <label style={{ marginLeft: '10px', marginTop: '10px' }}>Seller Date: Day</label>
        <input
          className="smallInputData"
          value={formData.vehicleSaleDay}
          onChange={(e) => setFormData({ ...formData, vehicleSaleDay: e.target.value })}
        />

        <label style={{ marginLeft: '10px', marginTop: '10px' }}>Seller Date: Year</label>
        <input
          className="smallInputData"
          value={formData.vehicleSaleYear}
          onChange={(e) => setFormData({ ...formData, vehicleSaleYear: e.target.value })}
        />

        <label style={{ marginLeft: '10px', marginTop: '10px' }}>Purchase Price</label>
        <input
          className="smallInputData"
          value={formData.vehiclePurchasePrice}
          onChange={(e) => setFormData({ ...formData, vehiclePurchasePrice: e.target.value })}
        />
        <label style={{ marginLeft: '10px', marginTop: '10px' }}>Transaction Type</label>

        <input
          className="smallInputData"
          value={formData.transactionType}
          onChange={(e) => setFormData({ ...formData, transactionType: e.target.value })}
        />
      </div>
      <div style={{ marginTop: '15px' }}>
        <label>
          <input
            type="radio"
            value="Gift"
            name="GiftOrTrade"
            onClick={() => setFormData({ ...formData, gift: true })}
          />
          GIFT
        </label>

        <label>
          <input
            type="radio"
            value="Trade"
            name="GiftOrTrade"
            onClick={() => setFormData({ ...formData, trade: true })}
          />
          TRADE
        </label>
      </div>
      <div className="bottomContainer">
        <button className="buttonNewCustomer" onClick={handleSave}>
          Save
        </button>
        <Link href="/pdf" className="buttonNewCustomer" onClick={handleNext}>
          Next
        </Link>
      </div>
    </>
  );
}

'use client';
import React, { useState, useEffect, useDeferredValue, useRef } from 'react';
import Link from 'next/link';
import './transactions.css';
import { useAppContext } from '@/context';
import {
  TrashIcon,
  PencilSquareIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import { IClient } from '@/models/clientSchema';
import { UserAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { Scenerio, useScenarioContext } from '../../context/ScenarioContext';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';
import { styled } from '@mui/material';

export default function Transactions() {
  const { transactions, setFormData, setTransactions } = useAppContext()!;
  const { scenarios } = useScenarioContext();
  const { user, isSubscribed } = UserAuth();
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement | null>(null);
  const dateRef = useRef<HTMLInputElement | null>(null);

  const [searchFor, setSearchFor] = useState('');
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null); 
  const [isMenuOpen, setisMenuOpen] = useState(false);
  const [isDateOpen, setisDateOpen] = useState(false);
  const [selectedSubsection, setSelectedSubsection] = useState('');
  const [openSubMenus, setOpenSubMenus] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    if (!user) {
      router.push('/');
      return;
    }

    const creationTime = user.metadata?.creationTime;
    if (creationTime) {
      const userCreationDate = new Date(creationTime);
      const currentDate = new Date();
      const diffTime = Math.abs(currentDate.getTime() - userCreationDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays > 7 && !isSubscribed) {
        router.push('/signUp'); 
      }
    }
  }, [user, router, isSubscribed]);


  useEffect(() => {
    const fetchRecentTransactions = async () => {
      try {
        const res = await fetch('/api/getRecent');
        const data = await res.json();
        if (Array.isArray(data)) {
          setTransactions(data);
        } else {
          setTransactions([]);
        }
      } catch (error) {
        console.error('Error fetching recent transactions:', error);
        alert('An error occurred while fetching transactions.');
      }
    };
    fetchRecentTransactions();
  }, [setTransactions]);

  const deferredSearchFor = useDeferredValue(searchFor);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      try {
        if (deferredSearchFor.trim() === '') {
          const res = await fetch('/api/getRecent');
          const data = await res.json();
          if (Array.isArray(data)) {
            setTransactions(data);
          } else {
            setTransactions([]);
          }
        } else {
          const res = await fetch(`/api/get?searchFor=${deferredSearchFor}`);
          const data = await res.json();
          if (data.error) {
            setTransactions([]);
          } else {
            data.sort(
              (a: IClient, b: IClient) =>
                new Date(b.timeCreated).getTime() - new Date(a.timeCreated).getTime(),
            );
            setTransactions(data);
          }
        }
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [deferredSearchFor, setTransactions]);

  const handleDateChange = async (value: Dayjs | null) => {
    setSelectedDate(value);
    setSelectedSubsection('');
    if (value) {
      const startOfDay = value.startOf('day').toISOString();
      const endOfDay = value.endOf('day').toISOString();
    try {
      const res = await fetch(`/api/getByDate?start=${startOfDay}&end=${endOfDay}`);
        const data = await res.json();
        if (data.error) {
          setTransactions([]);
        } else {
          if (Array.isArray(data)) {
            data.sort(
              (a: IClient, b: IClient) =>
                new Date(b.timeCreated).getTime() - new Date(a.timeCreated).getTime(),
            );
            setTransactions(data);
          } else {
            setTransactions([]);
            console.error('Expected an array of transactions');
          }
        }
      } catch (error) {
        console.error('Error fetching transactions by date:', error);
      }
    }
  };

  const handleTransactionChange = async (subsection: string) => {
    setSelectedSubsection(subsection);
    setisMenuOpen(false);
    setSelectedDate(null);
    try {
      const response =
        subsection === 'All'
          ? await fetch('/api/getRecent')
          : await fetch(`/api/getByTransaction?transactionType=${subsection}`);
      const data = await response.json();

      if (data.error) {
        setTransactions([]);
      } else {
        if (Array.isArray(data)) {
          setTransactions(data);
        } else {
          setTransactions([]);
          console.error('Expected an array of transactions');
        }
      }
    } catch (error) {
      console.error('Error updating transaction:', error);
    }
  };

  const handleEdit = async (clientId: string) => {
    try {
      const clientToEdit = transactions.find((client) => client._id === clientId);
      if (clientToEdit) {
        setFormData(clientToEdit);
      } else {
        alert('Client not found.');
      }
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  const handleDelete = async (clientId: string) => {
    try {
      const response = await fetch(`/api/delete?clientId=${clientId}`, {
        method: 'DELETE',
      });

      await response.json();

      setTransactions(transactions.filter((client) => client._id !== clientId));
      alert('Client Deleted.');
    } catch (error) {
      console.error('Error deleting client:', error);
    }
  };

  const handleClickOutsideMenu = (e: MouseEvent) => {
    const target = e.target as Element;
    if (
      menuRef.current &&
      !menuRef.current.contains(target) &&
      !target.closest('.dropdown-toggle')
    ) {
      setisMenuOpen(false);
    }
  };

  const handleClickOutsideDate = (e: MouseEvent) => {
    const target = e.target as Element;
    if (dateRef.current && !dateRef.current.contains(target)) {
      setisDateOpen(false);
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutsideMenu);
    } else {
      document.removeEventListener('mousedown', handleClickOutsideMenu);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideMenu);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (isDateOpen) {
      document.addEventListener('mousedown', handleClickOutsideDate);
    } else {
      document.removeEventListener('mousedown', handleClickOutsideDate);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideDate);
    };
  }, [isDateOpen]);

  const toggleSubMenu = (transactionType: string) => {
    setOpenSubMenus((prev) => ({
      ...prev,
      [transactionType]: !prev[transactionType],
    }));
  };

  const StyledDatePicker = styled(DatePicker)({
    '.MuiOutlinedInput-notchedOutline': {
      display: 'none',
    },
    '.MuiInputBase-root': {
      border: 'none',
      borderRadius: '0px',
      marginRight: '10px',
      borderBottom: '1px solid black',
      minWidth: '200px',
    },
    '.MuiInputBase-input': {
      border: 'none',
      borderRadius: '0px',
    },
    '.MuiPaper-root': {
      transform: 'translateX(-200px)',
    },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="container">
        <div className="transactionSearchContainer">
          <div className="dateContainer">
            <StyledDatePicker
              label={selectedDate ? selectedDate.format('MMMM DD, YYYY') : 'Select A Date'}
              value={selectedDate}
              onChange={handleDateChange}
              views={['day', 'month', 'year']}
              showDaysOutsideCurrentMonth
              slotProps={{
                textField: { size: 'small' },
                layout: { className: 'custom-datepicker' },
              }}
            />
          </div>
          <div className="custom-dropdown" ref={menuRef}>
            <button onClick={() => setisMenuOpen(!isMenuOpen)} className="dropdown-toggle">
              {selectedSubsection.length > 18
                ? `${selectedSubsection.substring(0, 18)}...`
                : selectedSubsection || 'Transaction type'}
              <ChevronDownIcon className={`transactionIcon ${isMenuOpen ? 'rotate' : ''}`} />
            </button>
            {isMenuOpen && (
              <ul className="transactionMenu">
                <li
                  className="selectableTransactions"
                  onClick={() => handleTransactionChange('All')}
                  style={{ display: 'flex' }}
                >
                  <div className="checkboxWrapper">
                    {selectedSubsection === 'All' ? (
                      <div className="activeCheckbox" />
                    ) : (
                      <div className="emptyCheckbox" />
                    )}
                    <span className="all">All</span>
                  </div>
                </li>
                {scenarios.map((scenerio: Scenerio, index: number) => (
                  <li key={index}>
                    <div className="dropdown-label">
                      {scenerio.transactionType}
                      <button
                        onClick={() => toggleSubMenu(scenerio.transactionType)}
                        className="submenu-toggle"
                      >
                        <ChevronDownIcon
                          className={`transactionIcon ${openSubMenus[scenerio.transactionType] ? 'rotate' : ''}`}
                        />
                      </button>
                    </div>
                    <ul
                      className={`selectableTransactions ${openSubMenus[scenerio.transactionType] ? '' : 'hidden'}`}
                    >
                      {scenerio.subsections.map((subsection, subIndex) => (
                        <li key={subIndex} onClick={() => handleTransactionChange(subsection)}>
                          <div className="checkboxWrapper">
                            {selectedSubsection === subsection ? (
                              <div className="activeCheckbox" />
                            ) : (
                              <div className="emptyCheckbox" />
                            )}
                            {subsection}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="search-input-wrapper">
            <MagnifyingGlassIcon className="searchIcon" />
            <input
              className="transactionSearch"
              placeholder="Search By Name or Vin"
              onChange={(e) => {
                  setSearchFor(e.target.value);
                  setSelectedSubsection('');
                  setSelectedDate(null);
                }}            />
          </div>
        </div>
        {transactions.length === 0 ? (
          <p className="noTransactionsMessage">No Transactions Found</p>
        ) : (
          <table className="transactionsTable">
            <thead>
              <tr>
                <th className="transactionDateTitle">Date</th>
                <th className="transactionFirst">First Name</th>
                <th className="transactionLast">Last Name</th>
                <th className="transactionVin">Vehicle Vin </th>
                <th className="transactionTypeHeading">Transaction Type </th>
                <th className="transactionEdit"></th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((client) => {
                return (
                  <tr className="transaction" key={client._id}>
                    <td>{new Date(client.timeCreated).toLocaleString()}</td>
                    <td>{client.firstName1}</td>
                    <td>{client.lastName1}</td>
                    <td>{client.vehicleVinNumber}</td>
                    <td>{client.transactionType}</td>
                    <td>
                      <Link
                        href="/updateClient"
                        className="editanddelete-button"
                        onClick={() => handleEdit(client._id)}
                      >
                        <PencilSquareIcon className="editIcon" />
                      </Link>
                      <button className="editanddelete-button">
                        <TrashIcon className="trashIcon" onClick={() => handleDelete(client._id)} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </LocalizationProvider>
  );
}

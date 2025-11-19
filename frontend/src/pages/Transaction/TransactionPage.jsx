import React from 'react'
import TransactionList from "../../components/TransactionList";
import TransactionForm from '../../components/TransactionForm';

const TransactionPage = () => {

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <TransactionForm/>
        <TransactionList/>
      </div>
    </>
  );
}

export default TransactionPage

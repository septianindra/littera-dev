import React from 'react'
import CustomerList from './pages/customers/CustomerList'
import CustomerTable from './pages/customers/CustomerTable'
import ParticipantList from './pages/participant/ParticipantList'

function FakeApp() {
  return (
    <div className="container-fluid p-4">
      <ParticipantList />
    </div>
  )
}

export default FakeApp

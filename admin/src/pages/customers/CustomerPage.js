import React, { useState } from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import ParticipantForm from '../participant/ParticipantForm'
import ParticipantTable from '../participant/ParticipantTable'
import CustomerForm from './CustomerForm'
import CustomerTable from './CustomerTable'
import EditCustomerForm from './EditCustomerForm'

function CustomerPage() {
  const [url, setUrl] = useState(window.location.href)
  const lastSegement = url.substr(url.lastIndexOf('/') + 1)

  return (
    <div className="container-fluid">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <Link
            onClick={() => {
              setUrl('customer')
            }}
            className={
              lastSegement === 'customer' ? 'nav-link active' : 'nav-link'
            }
            aria-current="page"
            to="/customer/customer"
          >
            Customer
          </Link>
        </li>
        <li className="nav-item">
          <Link
            onClick={() => {
              setUrl('participant')
            }}
            class={
              lastSegement === 'participant' ? 'nav-link active' : 'nav-link '
            }
            to="/customer/participant"
          >
            Participant
          </Link>
        </li>
      </ul>
      <hr />
      <Switch>
        <Route exact path="/customer">
          <CustomerTable />
        </Route>
        <Route path="/customer/customer">
          <CustomerTable />
        </Route>
        <Route path="/customer/participant">
          <ParticipantTable />
        </Route>
        <Route path="/customer/new-customer">
          <CustomerForm />
        </Route>
        <Route path="/customer/new-participant">
          <ParticipantForm />
        </Route>
        <Route path="/customer/edit-customer/:id">
          <EditCustomerForm />
        </Route>
      </Switch>
    </div>
  )
}

export default CustomerPage

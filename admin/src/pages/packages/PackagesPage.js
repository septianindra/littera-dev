import React, { useState } from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import ItemsTable from '../items/ItemsTable'
import PackagesForm from './PackagesForm'
import PackagesTable from './PackagesTable'
import ItemsForm from './../items/ItemsForm'

function PackagesPage() {
  const [url, setUrl] = useState('package')
  return (
    <div className="container-fluid">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <Link
            onClick={() => {
              setUrl('package')
            }}
            className={url === 'package' ? 'nav-link active' : 'nav-link'}
            aria-current="page"
            to="/qbank/package"
          >
            Package
          </Link>
        </li>
        <li className="nav-item">
          <Link
            onClick={() => {
              setUrl('items')
            }}
            class={url === 'items' ? 'nav-link active' : 'nav-link '}
            to="/qbank/items"
          >
            Items
          </Link>
        </li>
      </ul>
      <hr />
      <Switch>
        <Route exact path="/qbank">
          <PackagesTable />
        </Route>
        <Route path="/qbank/package">
          <PackagesTable />
        </Route>
        <Route path="/qbank/items">
          <ItemsTable />
        </Route>
        <Route path="/qbank/new-package">
          <PackagesForm />
        </Route>
        <Route path="/qbank/new-items">
          <ItemsForm />
        </Route>
      </Switch>
    </div>
  )
}

export default PackagesPage

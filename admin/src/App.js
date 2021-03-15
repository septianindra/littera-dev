import React from 'react'
import './App.css'
import Littera from '../src/assets/img/littera.png'
import Logo from '../src/assets/img/icon.png'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import {
  BsCalendar,
  BsClipboard,
  BsEye,
  BsFolder,
  BsGrid1X2,
  BsPeople,
  BsPerson,
  BsPlay,
  BsPlus,
} from 'react-icons/bs'
import CustomerPage from './pages/customers/CustomerPage'
import PackagesPage from './pages/packages/PackagesPage'

const body = document.getElementsByTagName('body')[0]

const collapseSidebar = () => {
  body.classList.toggle('sidebar-expand')
}

window.onclick = function (event) {
  openCloseDropdown(event)
}

function closeAllDropdown() {
  var dropdowns = document.getElementsByClassName('dropdown-expand')
  for (var i = 0; i < dropdowns.length; i++) {
    dropdowns[i].classList.remove('dropdown-expand')
  }
}

function openCloseDropdown(event) {
  if (!event.target.matches('.dropdown-toggle')) {
    closeAllDropdown()
  } else {
    var toggle = event.target.dataset.toggle
    var content = document.getElementById(toggle)
    if (content.classList.contains('dropdown-expand')) {
      closeAllDropdown()
    } else {
      closeAllDropdown()
      content.classList.add('dropdown-expand')
    }
  }
}

const sidebarWidth = document.getElementById('kolorbapak')
console.log(if(sidebarWidth){})

function App() {
  return (
    <React.Fragment>
      <Router>
        <div className="sidebar" id="kolorbapak">
          <div className="sidebar-logo">
            <img src={Littera} className="logo-custom" alt="Littera" />
          </div>
          <div className="sidebar-logo-mini">
            <img src={Logo} className="logo-custom" alt="Littera" />
          </div>
          <div className="d-flex justify-content-center mt-5">
            <button type="button" class="btn btn-primary w-75">
              <div className="d-flex justify-content-between">
                <div>New customer</div>
                <div>
                  <BsPlus />
                </div>
              </div>
            </button>
          </div>
          <ul className="sidebar-nav">
            <li className="sidebar-nav-item">
              <Link to="/dashboard" className="sidebar-nav-link">
                <div>
                  <i className="fas fa-tachometer-alt">
                    <BsGrid1X2 />
                  </i>
                </div>
                <span>Dashboard</span>
              </Link>
            </li>
            <li className="sidebar-nav-item">
              <Link to="/exam" className="sidebar-nav-link">
                <div>
                  <i className="fab fa-accusoft">
                    <BsCalendar />
                  </i>
                </div>
                <span>Exam</span>
              </Link>
            </li>
            <li className="sidebar-nav-item">
              <Link to="/customer" className="sidebar-nav-link">
                <div>
                  <i className="fas fa-tasks">
                    <BsPeople />
                  </i>
                </div>
                <span>Customer</span>
              </Link>
            </li>
            <li className="sidebar-nav-item">
              <Link to="/qbank" className="sidebar-nav-link">
                <div>
                  <i>
                    <BsFolder />
                  </i>
                </div>
                <span>Question Bank</span>
              </Link>
            </li>
            <li className="sidebar-nav-item">
              <Link to="report" className="sidebar-nav-link">
                <div>
                  <i>
                    <BsClipboard />
                  </i>
                </div>
                <span>Report</span>
              </Link>
            </li>
          </ul>
          <div className="d-flex justify-content-center px-4 mt-3">
            <div className="card mt-4 w-100">
              <div className="card-body btn bg-primary text-center rounded-3 text-white">
                <Link to="/proctoring">
                  <div className="">
                    <BsEye size="60" color="white" />
                  </div>
                </Link>
                <span>Proctoring Window</span>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- end sidebar --> */}
        {/* <!-- main content --> */}
        <div className="wrapper">
          <nav class="navbar navbar-light bg-light">
            <div class="container-fluid">
              <div class="navbar-brand" onClick={() => collapseSidebar()}>
                <BsPlay /> <span>Welcome, Septian</span>
              </div>
              <div className="d-flex">
                <div class="btn-group dropstart ">
                  <button
                    type="button "
                    class="btn btn-secondary rounded-3"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <BsPerson />
                  </button>
                  <ul class="dropdown-menu">
                    <li>
                      <Link class="dropdown-item">Profile</Link>
                    </li>
                    <li>
                      <Link class="dropdown-item">Logout</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </nav>

          {/* content */}
          <div className="container-fluid p-4">
            <Switch>
              <Route path="/customer">
                <CustomerPage />
              </Route>
              <Route path="/qbank">
                <PackagesPage />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </React.Fragment>
  )
}

export default App

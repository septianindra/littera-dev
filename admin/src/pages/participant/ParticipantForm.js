import React from 'react'
import Logo from '../../assets/img/icon.png'

function ParticipantForm() {
  return (
    <div className="card">
      <div className="card-body">
        {/* New Customer Form */}
        <form className="row">
          <div className="col-6">
            <label for="inputEmail4" className="form-label">
              Company Name
            </label>
            <select class="form-select" aria-label="Default select example">
              <option selected>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <div className="col-6">
            <label for="inputPassword4" className="form-label">
              Participant Name
            </label>
            <input
              type="password"
              className="form-control"
              id="inputPassword4"
            />
          </div>
          <div className="col-6">
            <label for="inputAddress" className="form-label">
              NIK
            </label>
            <input type="text" className="form-control" id="inputAddress" />
          </div>
          <div className="col-6">
            <label for="inputAddress" className="form-label">
              DOB
            </label>
            <input
              type="date"
              className="form-control"
              id="inputAddress"
              placeholder="1234 Main St"
            />
          </div>
          <div className="col-12">
            <label for="inputAddress" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="inputAddress"
              placeholder="1234 Main St"
            />
          </div>
          <div className="col-4 mt-4">
            <div class="card mt-2" style={{ width: '100%' }}>
              <div className="d-flex justify-content-center">
                <img
                  src={Logo}
                  style={{ width: '140px' }}
                  class="card-img-top mt-3"
                  alt="..."
                />
              </div>

              <div class="card-body">
                <div class="input-group mb-3">
                  <input
                    type="file"
                    class="form-control"
                    id="inputGroupFile01"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-4 mt-4">
            <div className="d-flex align-items-end h-100">
              <div>
                <label for="inputCity" className="form-label">
                  User Name
                </label>
                <input type="text" className="form-control" id="inputCity" />
                <label for="inputCity" className="form-label">
                  Password
                </label>
                <input type="text" className="form-control" id="inputCity" />
              </div>
            </div>
          </div>

          <div className="col-12 mt-4">
            <button type="submit" className="btn btn-primary float-end">
              Submit
            </button>
          </div>
        </form>
        {/* New Customer Form */}
        {/* Table Customer */}

        {/* Table Customer */}
      </div>
    </div>
  )
}

export default ParticipantForm

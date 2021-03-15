import React from 'react'

function CustomerForm() {
  return (
    <>
      <h4>Create New Customer</h4>
      <div className="card">
        <div className="card-body">
          {/* New Customer Form */}
          <form className="row">
            <div className="col-6">
              <label for="inputEmail4" className="form-label">
                Name
              </label>
              <input type="email" className="form-control" id="inputEmail4" />
            </div>
            <div className="col-6">
              <label for="inputPassword4" className="form-label">
                PIC Name
              </label>
              <input
                type="password"
                className="form-control"
                id="inputPassword4"
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
            <div className="col-6">
              <label for="inputAddress2" className="form-label">
                Phone
              </label>
              <input
                type="text"
                className="form-control"
                id="inputAddress2"
                placeholder="Apartment, studio, or floor"
              />
            </div>
            <div className="col-6">
              <label for="inputCity" className="form-label">
                Email
              </label>
              <input type="text" className="form-control" id="inputCity" />
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
    </>
  )
}

export default CustomerForm

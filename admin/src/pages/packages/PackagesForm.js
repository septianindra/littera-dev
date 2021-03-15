import React from 'react'

function PackagesForm() {
  return (
    <>
      <h4>Create New Package</h4>
      <div className="card" style={{ width: '380px' }}>
        <div className="card-body">
          {/* New Package Form */}
          <form className="row">
            <div className="col-12">
              <label for="inputEmail4" className="form-label">
                Section
              </label>
              <input type="email" className="form-control" id="inputEmail4" />
            </div>
            <div className="col-12">
              <label for="inputPassword4" className="form-label">
                Name
              </label>
              <input
                type="password"
                className="form-control"
                id="inputPassword4"
              />
            </div>
            <div className="col-12 mt-4">
              <button type="submit" className="btn btn-primary float-end">
                Submit
              </button>
            </div>
          </form>
          {/* New Package Form */}
        </div>
      </div>
    </>
  )
}

export default PackagesForm

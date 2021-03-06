import { unwrapResult } from '@reduxjs/toolkit'
import React, { useEffect, useState } from 'react'

import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import { uuid } from 'uuidv4'
import { createNewCustomer, fetchCustomers } from './customerSlice'

function CustomerForm() {
  const dispatch = useDispatch()
  const customers = useSelector((state) => state.customers.customerList)
  const customerStatus = useSelector(
    (state) => state.customers.customerListStatus,
  )
  const [generateId, setGenerateId] = useState(uuid())

  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  useEffect(() => {
    if (customerStatus === 'idle') {
      dispatch(fetchCustomers())
    }
  }, [customerStatus, dispatch])

  const canSave = addRequestStatus === 'idle'

  const { register, handleSubmit, watch, errors } = useForm()

  const onSubmit = async (data) => {
    if (canSave)
      try {
        setAddRequestStatus('pending')
        const resultAction = await dispatch(createNewCustomer(data))
        unwrapResult(resultAction)
      } catch (e) {
        console.log(e)
      } finally {
        setAddRequestStatus('idle')
      }
  }

  return (
    <>
      <h4>Create New Customer</h4>
      <div className="card">
        <div className="card-body">
          {/* New Customer Form */}
          <form className="row" onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              className="form-control"
              name="id"
              ref={register}
              value={generateId}
              hidden
            />
            <div className="col-6">
              <label for="name" className="form-label">
                Name
              </label>
              <input
                onChange={() => {
                  setGenerateId(uuid())
                }}
                type="text"
                className="form-control"
                id="name"
                name="name"
                ref={register}
              />
            </div>
            <div className="col-6">
              <label for="pic_name" className="form-label">
                PIC Name
              </label>
              <input
                type="text"
                className="form-control"
                id="pic_name"
                name="pic_name"
                ref={register}
              />
            </div>
            <div className="col-12">
              <label for="address" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                ref={register}
              />
            </div>
            <div className="col-6">
              <label for="phone" className="form-label">
                Phone
              </label>
              <input
                type="text"
                className="form-control"
                id="phone"
                name="phone"
                ref={register}
              />
            </div>
            <div className="col-6">
              <label for="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                ref={register}
              />
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

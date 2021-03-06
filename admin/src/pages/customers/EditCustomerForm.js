import { unwrapResult } from '@reduxjs/toolkit'
import React, { useEffect, useState } from 'react'

import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useHistory, useParams } from 'react-router'

import { fetchCustomerById, updateCustomer } from './customerSlice'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function EditCustomerForm() {
  let { id } = useParams()
  const dispatch = useDispatch()
  // const history = useHistory()
  const customer = useSelector((state) => state.customers.customerById)
  const customerByIdStatus = useSelector(
    (state) => state.customers.customerByIdStatus,
  )

  const MySwal = withReactContent(Swal)

  const [companyName, setCompanyName] = useState('')
  const [address, setAddress] = useState('')
  const [picName, setPicName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    if (customer) {
      setCompanyName(customer.name)
      setAddress(customer.address)
      setPicName(customer.pic_name)
      setPhone(customer.phone)
      setEmail(customer.email)
    }
  }, [customer])

  useEffect(() => {
    if (customerByIdStatus === 'idle') {
      dispatch(fetchCustomerById(id))
    }
  }, [customerByIdStatus, dispatch, id])

  const onCompanyNameChanged = (e) => {
    setCompanyName(e.target.value)
  }
  const onAddressChanged = (e) => setAddress(e.target.value)
  const onPicNameChanged = (e) => setPicName(e.target.value)
  const onPhoneChanged = (e) => setPhone(e.target.value)
  const onEmailChanged = (e) => setEmail(e.target.value)

  const { register, handleSubmit } = useForm()

  const onSubmit = async (data) => {
    data.id = id
    MySwal.fire({
      title: 'Do you want to save the changes?',
      showCancelButton: true,
      confirmButtonText: `Save`,
      denyButtonText: `Don't save`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const resultAction = await dispatch(updateCustomer(data))
          unwrapResult(resultAction)
        } catch (err) {
          if (err) {
            MySwal.fire('Error!', '', 'error')
          }
        } finally {
        }
      }
    })
    // console.log(data)
  }

  return (
    <>
      <h4>Edit Customer</h4>
      <div className="card">
        <div className="card-body">
          <form className="row" onSubmit={handleSubmit(onSubmit)}>
            <div className="col-6">
              <label for="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={companyName}
                onChange={onCompanyNameChanged}
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
                value={picName}
                onChange={onPicNameChanged}
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
                value={address}
                onChange={onAddressChanged}
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
                value={phone}
                onChange={onPhoneChanged}
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
                value={email}
                onChange={onEmailChanged}
                ref={register}
              />
            </div>

            <div className="col-12 mt-4">
              <button type="submit" className="btn btn-primary float-end">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default EditCustomerForm

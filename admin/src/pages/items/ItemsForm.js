import React, { useEffect, useState } from 'react'
import { BsPlus, BsXSquare } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import EditorComponent from '../../component/EditorComponent'
import { fetchPackage } from '../packages/packagesSlice'

function ItemsForm() {
  const dispatch = useDispatch()
  const packages = useSelector((state) => state.packages.packageList)
  const packageStatus = useSelector((state) => state.packages.packageListStatus)

  useEffect(() => {
    if (packageStatus === 'idle') {
      dispatch(fetchPackage())
    }
  }, [packageStatus, dispatch])

  const [state, setState] = useState([1])
  const [quantity, setQuantity] = useState('')
  const str = 'abcde'
  const option = (label) => {
    return (
      <div className="col-12" id={`option-${label}`}>
        <label for="inputEmail4" className="form-label w-100">
          <div className="d-flex justify-content-between">
            <div>Option {str[label - 1]}</div>
            <div
              onClick={() => {
                const el = document.getElementById(`option-${label}`)
                el.remove()
                setState(delete state[label])
              }}
            >
              <BsXSquare />
            </div>
          </div>
        </label>
        <EditorComponent />
        <input
          type="email"
          className="d-none form-control"
          id={`option-${label}`}
        />
      </div>
    )
  }

  const answer = (label) => {
    return (
      <option value={str[label - 1]} id={`answer-${label}`}>
        {str[label - 1]}
      </option>
    )
  }

  const packageOpt = (id, name) => {
    return (
      <option value={id} name={id}>
        {name}
      </option>
    )
  }

  const getAnimalsContent = (animals) => {
    let content = []
    for (let i = 0; i < animals; i++) {
      content.push(
        <option value={i + 1} name={i + 1}>
          {i + 1}
        </option>,
      )
    }
    return content
  }

  function handleClick(e) {
    e.preventDefault()
    let result = packages.find((data) => data.id == e.target.value)
    setQuantity(result.quantities)
  }

  return (
    <>
      <h4>Create New Items</h4>
      <div className="card">
        <div className="card-body">
          {/* New Customer Form */}
          <form className="row">
            <div className="col-2">
              <label for="inputEmail4" className="form-label">
                Package
              </label>
              <select
                onChange={handleClick}
                class="form-select"
                aria-label="Default select example"
              >
                <option selected>select package</option>
                {packages.map((data) => packageOpt(data.id, data.name))}
              </select>
            </div>
            <div className="col-2">
              <label for="inputEmail4" className="form-label">
                No
              </label>
              <select class="form-select" aria-label="Default select example">
                <option selected>select package</option>
                {getAnimalsContent(quantity)}
              </select>
            </div>
            <div className="col-12">
              <label for="inputEmail4" className="form-label">
                Question
              </label>
              <EditorComponent className="form-control" />
            </div>
            {state.map((data) => option(data))}
            <div className="col-12 ">
              <div
                className={state.length < 5 ? 'btn float-right' : 'd-none'}
                onClick={() => {
                  setState(state.concat(state.length + 1))
                }}
              >
                <BsPlus />
              </div>
            </div>
            <div className="col-12">
              <label for="inputEmail4" className="form-label">
                Answer
              </label>
              <select class="form-select" aria-label="Default select example">
                <option selected>Open this select menu</option>
                {state.map((data) => answer(data))}
              </select>
            </div>

            <div className="col-12 mt-4">
              <button type="submit" className="btn btn-primary float-end">
                Submit
              </button>
            </div>
          </form>
          {/* New Customer Form */}
        </div>
      </div>
    </>
  )
}

export default ItemsForm

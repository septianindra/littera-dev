import { unwrapResult } from '@reduxjs/toolkit'
import React, { useEffect } from 'react'
import { BsPen, BsTrash } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { useTable, usePagination, useSortBy } from 'react-table'
import { v4 } from 'uuid'
import { Link } from 'react-router-dom'

import {
  clearItemByIdData,
  clearItemByIdStatus,
  clearItemDeleteStatus,
  deleteItem,
  fetchItem,
} from './ItemsSlice'

function ItemsTable() {
  const dispatch = useDispatch()
  const items = useSelector((state) => state.items.itemList)
  const itemStatus = useSelector((state) => state.items.itemListStatus)
  const itemDeleteStatus = useSelector((state) => state.items.itemDeteleStatus)
  const itemByIdStatus = useSelector((state) => state.items.itemByIdStatus)

  useEffect(() => {
    if (itemStatus === 'idle') {
      dispatch(fetchItem())
    }
  }, [itemStatus, dispatch])

  useEffect(() => {
    if (itemByIdStatus === 'succeeded') {
      dispatch(clearItemByIdData())
      dispatch(clearItemByIdStatus())
    }
  }, [itemByIdStatus, dispatch])

  const onDeleteItemClicked = async (id) => {
    if (itemDeleteStatus === 'idle')
      try {
        const resultAction = await dispatch(deleteItem(id))
        unwrapResult(resultAction)
      } catch (err) {
        console.error('Failed to save !')
      } finally {
        dispatch(clearItemDeleteStatus())
      }
  }

  const data = React.useMemo(() => items, [items])

  const EditItem = (value) => (
    <div className="text-center">
      <div className="btn">
        <Link to={`/edit-item/${value.value}`}>
          <BsPen />
        </Link>
      </div>
    </div>
  )

  const DeteleItem = (value) => (
    <div className="text-center">
      <button onClick={() => onDeleteItemClicked(value.value)} className="btn ">
        <BsTrash />
      </button>
    </div>
  )

  const columns = React.useMemo(
    () => [
      {
        Header: 'Question',
        accessor: 'question',
      },
      {
        Header: 'Company Name',
        accessor: 'option_a',
      },
      {
        Header: 'Address',
        accessor: 'option_b',
      },
      {
        Header: 'PIC Name',
        accessor: 'option_c',
      },
      {
        Header: 'Phone',
        accessor: 'option_d',
      },
      {
        Header: 'Email',
        accessor: 'option_e',
      },
      {
        id: 'editdata',
        Header: (
          <div className="text-center">
            <BsPen />
          </div>
        ),
        accessor: 'id',
        Cell: EditItem,
      },
      {
        id: 'deletedata',
        Header: (
          <div className="text-center">
            <BsTrash />
          </div>
        ),
        accessor: 'id',
        Cell: DeteleItem,
      },
    ],
    [],
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useSortBy,
    usePagination,
  )
  return (
    <>
      <div className="d-flex justify-content-end">
        <Link
          to="/qbank/new-items"
          type="button"
          class="btn btn-primary active my-3"
        >
          New item
        </Link>
      </div>

      <div className="card mt-3">
        <div className="card-body">
          <div className="question-title">Question</div>
          <div className="question">
            Air, tanah, dan vegetasi di kawasan sungai merupakan komponen sumber
            daya alam yang dapat diperbaharui lewat pengelolaan kawasan sungai.{' '}
          </div>
          <ul className="options">
            <li className="option">
              <div class="option-label-wrap">
                <label className="option-label">A</label>
              </div>
              <input
                className="option-input"
                type="text"
                value="bebas"
                disabled
              />
            </li>
            <li className="option">
              <div class="option-label-wrap">
                <label className="option-label">B</label>
              </div>
              <input
                className="option-input"
                type="text"
                value="tidak bebas"
                disabled
              />
            </li>
          </ul>
        </div>
      </div>

      <div className="row">
        <div className="col-6">
          <nav aria-label="Page navigation example">
            <ul class="pagination">
              <li
                class="page-item"
                className="page-item"
                onClick={() => gotoPage(0)}
                disabled={!canPreviousPage}
              >
                <div class="page-link">{'<<'}</div>
              </li>
              <li
                class="page-item"
                className="page-item"
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                <div class="page-link">{'<'}</div>
              </li>
              <li
                class="page-item"
                className="page-item"
                onClick={() => nextPage()}
                disabled={!canNextPage}
              >
                <div class="page-link">{'>'}</div>
              </li>
              <li
                class="page-item"
                className="page-item"
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
              >
                <div class="page-link">{'>>'}</div>
              </li>
            </ul>
          </nav>
        </div>
        <div className="col-6">
          <span className="float-end">
            Items {pageIndex + 1} of {pageOptions.length}
          </span>
        </div>
      </div>
    </>
  )
}

export default ItemsTable

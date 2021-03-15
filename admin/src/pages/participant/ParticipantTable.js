import { unwrapResult } from '@reduxjs/toolkit'
import React, { useEffect } from 'react'
import { BsPen, BsTrash } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { useTable, usePagination, useSortBy } from 'react-table'
import { v4 } from 'uuid'
import { Link } from 'react-router-dom'
import {
  clearParticipantByIdData,
  clearParticipantByIdStatus,
  clearParticipantDeleteStatus,
  deleteParticipant,
  fetchParticipant,
} from './participantSlice'

function ParticipantTable() {
  const dispatch = useDispatch()
  const participant = useSelector((state) => state.participant.participantList)
  const participantStatus = useSelector(
    (state) => state.participant.participantListStatus,
  )
  const participantDeleteStatus = useSelector(
    (state) => state.participant.participantDeleteStatus,
  )
  const participantByIdStatus = useSelector(
    (state) => state.participant.participantByIdStatus,
  )

  useEffect(() => {
    if (participantStatus === 'idle') {
      dispatch(fetchParticipant())
    }
  }, [participantStatus, dispatch])

  useEffect(() => {
    if (participantByIdStatus === 'succeeded') {
      dispatch(clearParticipantByIdData())
      dispatch(clearParticipantByIdStatus())
    }
  }, [participantByIdStatus, dispatch])

  const onDeleteParticipantClicked = async (id) => {
    if (participantDeleteStatus === 'idle')
      try {
        const resultAction = await dispatch(deleteParticipant(id))
        unwrapResult(resultAction)
      } catch (err) {
        console.error('Failed to save !')
      } finally {
        dispatch(clearParticipantDeleteStatus())
      }
  }

  const data = React.useMemo(() => participant, [participant])

  const EditParticipant = (value) => (
    <div className="text-center">
      <div className="btn">
        <Link to={`/edit-participant/${value.value}`}>
          <BsPen />
        </Link>
      </div>
    </div>
  )

  const DeleteParticipant = (value) => (
    <div className="text-center">
      <button
        onClick={() => onDeleteParticipantClicked(value.value)}
        className="btn "
      >
        <BsTrash />
      </button>
    </div>
  )

  const columns = React.useMemo(
    () => [
      {
        Header: 'Participant Name',
        accessor: 'name',
      },
      {
        Header: 'NIK',
        accessor: 'nik',
      },
      {
        Header: 'Birth',
        accessor: 'dob',
      },
      {
        Header: 'Phone',
        accessor: 'phone',
      },
      {
        Header: 'Address',
        accessor: 'address',
      },
      {
        Header: 'Username',
        accessor: 'username',
      },
      {
        Header: 'Password',
        accessor: 'password',
      },
      {
        id: 'editdata',
        Header: (
          <div className="text-center">
            <BsPen />
          </div>
        ),
        accessor: 'id',
        Cell: EditParticipant,
      },
      {
        id: 'deletedata',
        Header: (
          <div className="text-center">
            <BsTrash />
          </div>
        ),
        accessor: 'id',
        Cell: DeleteParticipant,
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
          to="/customer/new-participant"
          type="button"
          class="btn btn-primary active my-3"
        >
          New participant
        </Link>
      </div>
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-start">
            <select
              className="form-select "
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value))
              }}
              style={{ width: '120px' }}
            >
              {[5, 10, 15].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>

          <table
            className="table mt-3 table-bordered table-hover"
            {...getTableProps()}
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr key={v4} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      key={v4}
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      {column.render('Header')}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? '🔽'
                            : '🔼'
                          : ''}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row, i) => {
                prepareRow(row)
                return (
                  <tr key={v4} {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td key={v4} {...cell.getCellProps()}>
                          {cell.render('Cell')}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>

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
                Page {pageIndex + 1} of {pageOptions.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ParticipantTable

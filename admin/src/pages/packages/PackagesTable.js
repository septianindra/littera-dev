import { unwrapResult } from '@reduxjs/toolkit'
import React, { useEffect } from 'react'
import { BsPen, BsTrash } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { useTable, usePagination, useSortBy } from 'react-table'
import { v4 } from 'uuid'
import { Link } from 'react-router-dom'
import {
  clearPackageByIdData,
  clearPackageByIdStatus,
  clearPackageDeleteStatus,
  deletePackage,
  fetchPackage,
} from './packagesSlice'

function PackagesTable() {
  const dispatch = useDispatch()
  const packages = useSelector((state) => state.packages.packageList)
  const packageStatus = useSelector((state) => state.packages.packageListStatus)
  const packageDeleteStatus = useSelector(
    (state) => state.packages.packageDeleteStatus,
  )
  const packageByIdStatus = useSelector(
    (state) => state.packages.packageByIdStatus,
  )

  useEffect(() => {
    if (packageStatus === 'idle') {
      dispatch(fetchPackage())
    }
  }, [packageStatus, dispatch])

  useEffect(() => {
    if (packageByIdStatus === 'succeeded') {
      dispatch(clearPackageByIdData())
      dispatch(clearPackageByIdStatus())
    }
  }, [packageByIdStatus, dispatch])

  const onDeletePackageClicked = async (id) => {
    if (packageDeleteStatus === 'idle')
      try {
        const resultAction = await dispatch(deletePackage(id))
        unwrapResult(resultAction)
      } catch (err) {
        console.error('Failed to save !')
      } finally {
        dispatch(clearPackageDeleteStatus())
      }
  }

  const data = React.useMemo(() => packages, [packages])

  const EditPackage = (value) => (
    <div className="text-center">
      <div className="btn">
        <Link to={`/edit-package/${value.value}`}>
          <BsPen />
        </Link>
      </div>
    </div>
  )

  const DeletePackage = (value) => (
    <div className="text-center">
      <button
        onClick={() => onDeletePackageClicked(value.value)}
        className="btn "
      >
        <BsTrash />
      </button>
    </div>
  )

  const columns = React.useMemo(
    () => [
      {
        Header: 'Id',
        accessor: 'id',
      },
      {
        Header: 'Section',
        accessor: 'number',
      },
      {
        Header: 'Section Name',
        accessor: 'name',
      },
      {
        id: 'editdata',
        Header: (
          <div className="text-center">
            <BsPen />
          </div>
        ),
        accessor: 'id',
        Cell: EditPackage,
      },
      {
        id: 'deletedata',
        Header: (
          <div className="text-center">
            <BsTrash />
          </div>
        ),
        accessor: 'id',
        Cell: DeletePackage,
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
          to="/qbank/new-package"
          type="button"
          class="btn btn-primary active my-3"
        >
          New package
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

export default PackagesTable

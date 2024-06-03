import React from 'react'
import { getAllUsers } from '../../reduxstore/Users/UserSync'
import { nextPage, prevPage } from "../../reduxstore/Users/UserSlice"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import Flag from 'react-world-flags';
import { cilCheckCircle, cilWarning } from '@coreui/icons';
import {
  CButton,
  CCardImage,
  CCardLink,
  CCardText,
  CCardTitle,
  CCarousel,
  CCarouselItem,
  CImage,
  CListGroup,
  CListGroupItem
} from '@coreui/react'

import {
  CAvatar,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPeople } from '@coreui/icons'
import WidgetsDropdown from '../widgets/WidgetsDropdown'

function AllUser() {

  const dispatch = useDispatch()
  const { page, totalPage, users } = useSelector((state) => state?.users)

  const handleNext = () => {
    if (page < totalPage) {
      dispatch(nextPage());
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      dispatch(prevPage());
    }
  };

  useEffect(() => {
    dispatch(getAllUsers({ page }))
  }, [page, dispatch])

  return (
    <>
      {/* <WidgetsDropdown className="mb-4" /> */}
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader className='d-flex justify-content-between align-items-center'>
              <h1>All Users</h1>
              <div className='d-flex gap-2'>
                <CButton
                  className='cursor'
                  onClick={handlePrev}
                  color="secondary"
                  disabled={page <= 1}>
                  Prev
                </CButton>
                <CButton
                  className='cursor'
                  onClick={handleNext}
                  color="dark"
                  disabled={page >= totalPage}>
                  Next
                </CButton>
              </div>
            </CCardHeader>
            <CCardBody>
              <br />
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead className="text-nowrap">
                  <CTableRow>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      <CIcon icon={cilPeople} />
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">User</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      Country
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Email</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      Verification
                    </CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {users?.map((item, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell className="text-center">
                        <CAvatar size="md" src={item.profileImage || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} status={item.isActive === 1 ? "success" : "secondary"} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.name || "unknown"}</div>
                        <div className="small text-body-secondary text-nowrap">
                          <span>{item.isActive === 1 ? 'online' : 'offline'}</span> | Registered:{' '}
                          {new Date(item.createdAt).toLocaleString().split(",").slice(1)}
                        </div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <Flag code={item.country || "PK"} alt={item.country || "PK"} style={{ width: '32px', height: '20px' }} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="">
                          <p className="text-body-secondary">{item.email}</p>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CIcon size="xl" icon={item.verified === 1 ? cilCheckCircle : cilWarning} />
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default AllUser

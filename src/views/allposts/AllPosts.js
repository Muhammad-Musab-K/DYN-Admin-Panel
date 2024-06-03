import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CContainer,
    CCollapse,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CCarousel,
    CCarouselItem,
    CImage,
    CCardHeader,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { getAllPosts } from "../../reduxstore/Posts/PostSync"
import { useDispatch, useSelector } from 'react-redux'
import { nextPage, prevPage } from '../../reduxstore/Posts/PostSlice'
import { PostState } from '../../reduxstore/Posts/PostSlice'


function AllPosts() {

    const [open, setOpen] = useState([]);

    const toggle = (index) => {
        setOpen(open.includes(index) ? open.filter(i => i !== index) : [...open, index]);
    };

    const dispatch = useDispatch()
    const { pageP, totalPageP } = useSelector(state => state.posts)

    const handleNext = () => {
        dispatch(nextPage());
    };

    const handlePrev = () => {
        dispatch(prevPage());
    };

    useEffect(() => {
        dispatch(getAllPosts({ pageP }))
    }, [pageP])

    const PostsData = useSelector(PostState)

    return (
        <>
            <CCard className="mb-4">
                <CCardBody>
                    <CCardHeader className='d-flex justify-content-between align-items-center'>
                        <h1>All Posts</h1>
                        <div className='d-flex gap-2'>
                            <CButton
                                className='cursor'
                                onClick={handlePrev}
                                color="secondary"
                                disabled={pageP <= 1}>
                                Prev
                            </CButton>
                            <CButton
                                className='cursor'
                                onClick={handleNext}
                                color="dark"
                                disabled={pageP >= totalPageP}>
                                Next
                            </CButton>
                        </div>
                    </CCardHeader>
                    <CRow>
                        <CCol>
                            <CTable striped>
                                <CTableHead>
                                    <CTableRow>
                                        <CTableHeaderCell>#</CTableHeaderCell>
                                        <CTableHeaderCell>Post</CTableHeaderCell>
                                        <CTableHeaderCell>Details</CTableHeaderCell>
                                        <CTableHeaderCell></CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {PostsData?.map((item, index) => (
                                        <React.Fragment key={item.id}>
                                            <CTableRow>
                                                <CTableHeaderCell>{item.id}</CTableHeaderCell>
                                                <CTableDataCell>{item.description}</CTableDataCell>
                                                <CTableDataCell>
                                                    <CButton color="primary" onClick={() => toggle(index)}>
                                                        {open.includes(index) ? '-' : '+'}
                                                    </CButton>
                                                </CTableDataCell>
                                            </CTableRow>
                                            <CTableRow>
                                                <CTableDataCell colSpan="4">
                                                    <CCollapse visible={open.includes(index)}>
                                                        <CCard>
                                                            <CCardBody>
                                                                <CRow>
                                                                    <CCol md="6">
                                                                        {item.multiMedia.length > 0 ? (
                                                                            <CCarousel
                                                                                className="custom-carousel d-flex justify-content-center"
                                                                                controls>
                                                                                {item?.multiMedia.map((media, mediaIndex) => (
                                                                                    <CCarouselItem
                                                                                        key={media.id}>
                                                                                        <CImage
                                                                                            className='d-block w-10 custom-image'
                                                                                            src={media.media.mediaLink} alt={`media-${mediaIndex}`} />

                                                                                    </CCarouselItem>
                                                                                ))}
                                                                            </CCarousel>
                                                                        ) : (
                                                                            <p>No media available</p>
                                                                        )}
                                                                    </CCol>
                                                                    <CCol md="6">
                                                                        <h5>Post Details</h5>
                                                                        <p><strong>User:</strong> {item.user.name} ({item.user.username})</p>
                                                                        <p><strong>Likes:</strong> {item.likesCount}</p>
                                                                        <p><strong>Created at:</strong> {new Date(item.createdAt).toLocaleString()}</p>
                                                                        <p>{item.description}</p>
                                                                    </CCol>
                                                                </CRow>
                                                            </CCardBody>
                                                        </CCard>
                                                    </CCollapse>
                                                </CTableDataCell>
                                            </CTableRow>
                                        </React.Fragment>
                                    ))}
                                </CTableBody>
                            </CTable>
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>
        </>
    )
}

export default AllPosts

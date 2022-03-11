import React from 'react'
import { Spinner } from 'react-bootstrap';

const Loading = () => {
    return (
        <Spinner animation="border" role="status" className='spin-cont'>
            <span className="visually-hidden spin"></span>
        </Spinner>
    )
}

export default Loading

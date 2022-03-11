import React from 'react'
import './MainStyle.css'

const MainScreen = ({ title, children }) => {
    return (
        <div className='mainback'>
            <div>
                
                <div className='page'>
                    {title && (
                        <>
                            <h1 className='heading'>{ title }</h1>
                            <div className="line"></div>
                        </>
                    )}
                    {children}
                </div>
            </div>
            
        </div>
    )
}

export default MainScreen

import React, { useState } from 'react'

export const FAQ = ({currElem,onToggle,isActive}) => {
   
        
    return (
        <li>
            <div className="accordion-grid">
                <p>{currElem.question}</p>
                <button onClick={onToggle} className={isActive ? 'active-btn': ''}>{isActive ? 'Close' : 'Show'}</button>
            </div>
            <p>{ isActive && currElem.answer}</p>
        </li>
    )
}

import React, { useEffect, useState } from 'react'
import  faq  from '../api/faq.json'
import { FAQ } from './FAQ'

export const Accordian = () => {
    const [data, setData] = useState([])
    const [activeId,setActiveId] = useState(false)

    useEffect(() => {
        setData(faq)
    })

    const handleButton = (id) => {
        setActiveId((prevId)=>(prevId === id ? false : id) )
    }
    return (
        <>
            <h1>The Accordion</h1>
            <ul className='section-accordion'>
                {data.map((currElem) => <FAQ key={currElem.id} onToggle={()=>handleButton(currElem.id)} currElem={currElem} isActive={activeId === currElem.id} />) }
            </ul>
        </>
    )
}

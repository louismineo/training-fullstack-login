import { useAppSelector, useAppDispatch } from "../store/hooks";
import { useEffect, useState } from "react";
import { uiActions } from "../store/uiSlice";
import { current } from "@reduxjs/toolkit";


const invisibleButtonStyle = 
{
    backgroundColor : 'transparent',
    border:'none',
    color: 'blue',
    padding: '0!important',
    display: 'inline',
    opacity : '1.0'
}

const disabledButtonStyle = 
{
    color:'gray',
    cursor:'not-allowed',
    opacity:'0.6'
}

const useHover = ()=> //underlines when hovering
{
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    return {isHovered, handleMouseEnter, handleMouseLeave}
}


export const Footer = () =>
{
    //get the slice data
    
    const pageNumber:number = useAppSelector((state)=> state.ui.curentPageNumber);
    const totalRecordCount:number = useAppSelector((state)=> state.employees.employeesCount);;
    const startRecordNumber:number = totalRecordCount===0?0:(((pageNumber-1)*10)+1) ;
    const endRecordNumber:number = ((startRecordNumber + 9)> totalRecordCount )? totalRecordCount : startRecordNumber + 9;

    const firstpage = useAppSelector((state)=> state.ui.minPageNumber);
    const lastpage = useAppSelector((state)=> state.ui.maxPageNumber);

    const isDesktop:boolean = useAppSelector((state)=> state.ui.isDesktop)
    //dispatch action
    const dispatch = useAppDispatch();
    function goPreviousPage()
    {
        dispatch(uiActions.previousPage())
    }

    function goNextPage()
    {
        dispatch(uiActions.nextPage())
    }


    const prevButtonHover = useHover();
    const nextButtonHover = useHover();

    const prevPageDisable: boolean = (pageNumber <= firstpage);
    const nextPageDisable: boolean = (pageNumber >= lastpage);

    return (
        <div style={{height:'5%', display: 'flex',flexDirection:'row',color: 'black',justifyContent : isDesktop? 'space-between' : 'center', marginLeft : isDesktop? '5%' : '0%', marginRight : isDesktop?'5%':'0%'}}>
            {isDesktop? <div style={{width:'20%'}} >Showing <strong>{startRecordNumber} - {endRecordNumber}</strong> out of <strong>{totalRecordCount}</strong> entries</div>: <></>}
            <div style={{display:'flex', justifyContent:'space-between', width:'auto'}}>
                <button style = 
                    {
                    !prevPageDisable? 
                        {...invisibleButtonStyle, cursor:'pointer',textDecoration: prevButtonHover.isHovered?'underline':''}
                    :
                        {...invisibleButtonStyle, ...disabledButtonStyle}
                    }
                     
                    onMouseEnter={prevButtonHover.handleMouseEnter} 
                    onMouseLeave={prevButtonHover.handleMouseLeave} 
                    onClick={goPreviousPage} >
                    <strong>Previous</strong>
                </button>

                <button style = {{...invisibleButtonStyle ,cursor:'default'}} ><strong>{pageNumber}</strong></button>
                
                <button style = {
                    !nextPageDisable? 
                        {...invisibleButtonStyle, cursor:'pointer',textDecoration: nextButtonHover.isHovered?'underline':''}
                    :
                        {...invisibleButtonStyle, ...disabledButtonStyle}
                    } onMouseEnter={nextButtonHover.handleMouseEnter} onMouseLeave={nextButtonHover.handleMouseLeave}  onClick={goNextPage}><strong>Next</strong></button>
            </div>
        </div>
    )
}
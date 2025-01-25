import React, { useEffect, useState } from 'react'
import arrowRight2 from './../../assets/images/icon/arrow-right.png'
import arrowLeft from './../../assets/images/icon/arrow-left.png'
import { FilterTestimonialsByPage } from '../../redux/actions/TestimonialsAction';
import { FilterTestimonialsService } from '../../redux/service/testimonialsServices';
import { connect, useDispatch, useSelector } from 'react-redux';
import PaginationButtonItems from './PaginationButtonItems';


export  function Pagination(props) {
    const dispatch  = useDispatch();
    const prev_button_state = props.current_page === 1 && "btn-disabled";
    const next_button_state = props.current_page === props.totalPage && "btn-disabled";
    const HandleChangePage =  (value) =>   dispatch(FilterTestimonialsByPage(value)) ;
    const HandleClickNext =  () =>   dispatch(FilterTestimonialsByPage(props.current_page + 1)) ;
    const HandleClickPrev =  () =>   dispatch(FilterTestimonialsByPage(props.current_page - 1)) ;


    //show all buttons if total page is < 10
    let showall_buttons = [];
    if (props.total_page <= 10) {
        for (let index = 1; index < props.total_page; index++) {
            showall_buttons.push(index);
        }
    }
    const showall_buttons_state  =  props.total_page <= 10 ? showall_buttons  : false;
   

    //show  buttons with breakpoint if total page is > 10
    let buttons_breakpoint_part1 = [];
    let buttons_breakpoint_part2 = [];  

    
    if (props.total_page > 10) {
        //part1 
        for (let index = 1; index <=3; index++) {
             //if current page is between  3 and 8 
            if (props.current_page >3 && props.current_page <= 8) {
                buttons_breakpoint_part1.push(props.current_page-(index-1));
            } else {
                buttons_breakpoint_part1.push(index);
            }
        }
        if (props.current_page> 3 && buttons_breakpoint_part1[0] === props.current_page) {
            buttons_breakpoint_part1.reverse();
        }
        
        
        //part2
        for (let index = 1; index < 3; index++) {
            buttons_breakpoint_part2.push(props.total_page-index);
            buttons_breakpoint_part2.reverse();
        }
        buttons_breakpoint_part2.push(props.total_page);
    }
    
    //if current page is between  3 and 8 
    const twoNextPage = (props.current_page >= 3 && props.current_page <= 8 && props.total_page > 10) ? [props.current_page+1, props.current_page+2] : false;
    
    //second breakpoint
    const secondBreakpoint = (props.current_page >= 9 && props.current_page < props.total_page-2) ? [ '...',props.current_page-1, props.current_page,  props.current_page+1, props.current_page+2] : false;

 //
  return (
       <tr>
            <th className='lg:w-40 xl:w-40 py-0'>
                <button className={"join-item btn btn-outline "+prev_button_state} onClick={() => HandleClickPrev()}> <img src={arrowLeft}  width={15} height={15}  /> 
                Previous
                </button>
            </th>
            <th >
               
            </th>
            <th className='lg:w-50'>
                <div className="join">
                {
                    showall_buttons_state && showall_buttons_state.map((index, key) => {
                        return <PaginationButtonItems index={index} />
                    })
                }

                {
                    !showall_buttons_state && buttons_breakpoint_part1.map((index, key) => {
                        return <PaginationButtonItems index={index} />
                    })
                }
                {
                    twoNextPage && twoNextPage.map((index, key) => {
                        return<PaginationButtonItems index={index} />
                    })
                }
                {
                    secondBreakpoint && secondBreakpoint.map((index, key) => {
                        return<PaginationButtonItems index={index} />
                    })
                }
                {!showall_buttons_state && <button   className="join-item btn mx-2 border-2 btn-desabled ">...</button>}
                {
                    !showall_buttons_state && buttons_breakpoint_part2.map((index, key) => {
                        return <PaginationButtonItems index={index} />
                    })
                }
                </div>
            </th>
           
            <th className='flex justify-end'>
                <button  className={"join-item btn btn-outline "+next_button_state} onClick={() => HandleClickNext()}>Next <img src={arrowRight2}  width={15} height={15}  /></button>
            </th>
        </tr>
  )
}
function mapStateToProps(state) {

    const { testimonials } = state
    return { 
        current_page: testimonials.current_page ,
        total_page: testimonials.totalPage 
    }
}

export default connect(mapStateToProps)(Pagination)
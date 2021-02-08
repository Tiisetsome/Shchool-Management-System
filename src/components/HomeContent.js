import React from 'react'
import styled from 'styled-components'
import {HiOutlineRefresh} from 'react-icons/hi'

const HomeContent = () => {

    // Icons styles
    const style = {
        color: "rgb(38, 218, 203)",
    }

    return (
        <HomeContentStyles>
            <div className='calender'>
                <div className='header'>
                    <p>Event Calender</p>
                    <HiOutlineRefresh style={style} />
                </div>
            </div>
            <div className = 'notices'>
                <div className='header'>
                    <p>Notice Board</p>
                    <HiOutlineRefresh style={style} />
                </div>
                <div className="notices-wrapper">
                    <div className="notice">
                        <p>27 January 2021</p>
                        <p>James Mohale <span>2min ago</span></p>
                        <p>To all the Grade 12 learners. Please take notice that on friday is the last day to submit all the outstanding assesments.</p>
                    </div>
                    <div className="notice">
                        <p>15 February 2020</p>
                        <p>Elizabeth Legoabe <span>2min ago</span></p>
                        <p>Due to sport competition taking place on the coming wednseday, all class activities will be put on hold for the remainder of that day.</p>
                    </div>
                </div>
            </div>
        </HomeContentStyles>
    )
}

const HomeContentStyles = styled.section`
    display: grid;
    grid-template-columns: 1.8fr 1fr;
    gap: 1rem;
    margin-bottom: 3rem;

    p{
        margin-bottom: 0rem;
    }

    .calender{
        height: 20rem;
        background-color: #fff;
    }

    .header{
        padding: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid rgb(220, 220, 220);
        color: black;

        p{
            font-weight: 600;
            color: black !important;
        }
    }

    .notices {
        background-color: #fff;
        height: 20rem;
        overflow-y: scroll;

        .notices-wrapper{
            padding: 1rem;

            .notice{
                margin-bottom: 1rem;

                p:first-child{
                    margin-bottom: .5rem;
                }

                p:nth-child(even){
                    color: rgb(241, 55, 157);
                    font-weight: 600;
                    margin-bottom: .5rem;

                    span{
                        margin-left: .5rem;
                        font-weight: 400 !important;
                        font-size: .7rem !important;
                    }
                }
            }
        }
    }
`;

export default HomeContent

import React from 'react'
import styled from 'styled-components'

const Spinner = () => {
    return (
        <SpinnerStyles>
         <h3>Fetching Data</h3>
         <p>Please wait...</p>
         <div className="lds-ellipsis">
             <div></div>
             <div></div>
             <div></div>
             <div></div>
         </div>
        </SpinnerStyles>
    )
}

const SpinnerStyles = styled.section`
    background: #fff;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 16rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    p, h3{
        margin-bottom: 1rem;
        font-family: Montserrat-Medium;
        font-size: 1.3rem;
    }

    p{
        font-size: .8rem;
    }

    .lds-ellipsis {
        display: inline-block;
        position: relative;
        width: 80px;
        height: 20px;
    }
    .lds-ellipsis div {
        position: absolute;
        top: 5px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: rgb(233, 140, 0);
        animation-timing-function: cubic-bezier(0, 1, 1, 0);
    }
    .lds-ellipsis div:nth-child(1) {
        left: 8px;
        animation: lds-ellipsis1 0.6s infinite;
    }
    .lds-ellipsis div:nth-child(2) {
        left: 8px;
        animation: lds-ellipsis2 0.6s infinite;
    }
    .lds-ellipsis div:nth-child(3) {
        left: 32px;
        animation: lds-ellipsis2 0.6s infinite;
    }
    .lds-ellipsis div:nth-child(4) {
        left: 56px;
        animation: lds-ellipsis3 0.6s infinite;
    }
    @keyframes lds-ellipsis1 {
        0% {
        transform: scale(0);
        }
        100% {
        transform: scale(1);
        }
    }
    @keyframes lds-ellipsis3 {
        0% {
        transform: scale(1);
        }
        100% {
        transform: scale(0);
        }
    }
    @keyframes lds-ellipsis2 {
        0% {
        transform: translate(0, 0);
        }
        100% {
        transform: translate(24px, 0);
        }
    }
  

`

export default Spinner

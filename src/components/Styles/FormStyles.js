import styled from 'styled-components'

export const FormStyles = styled.section`
    background: #fff;
    font-family: Montserrat-Medium;
    position: relative;

    .header{
        padding: 2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid rgb(220, 220, 220);
        color: black;

        p{
            font-weight: 600;
            color: black !important;
            margin-bottom: 0rem;
        }
    }

    form{
        margin: 2rem 2rem;
        padding-bottom: 8rem;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
        position: relative;

        div{

            label{
                display: block;
                margin-bottom: 1rem;
                font-size: .8rem;
                color: rgb(233, 140, 0);
            }

            input, select{
                width: 100%;
                padding: .8rem;
                background-color: #F0F0F0;
                border: none;
                font-family: Montserrat-Medium;
                color: grey;
            }


            textarea{
                width: 100%;
                height: 10rem;
                padding: 1rem;
                background-color: #F0F0F0;
                color: grey;
                border: none;
                font-family: Montserrat-Medium;
            }
        }

        button{
            width: 12rem;
            padding: 1rem;
            bottom: 3rem;
            left: 0;
            border: none;
            border-radius: 5px;
            position: absolute;
            font-weight: 600;
            font-family: Montserrat-Medium;
            color: #fff;
            background: rgb(9, 95, 95);
            cursor: pointer;
        }
    }

    .notice{
        top: .5rem;
        right: 2rem;
        width: 15rem;
        border-left: rgb(40, 206, 123) 5px solid;
        border-radius: 5px;
        padding: 1rem;
        position: fixed;
        font-size: .7rem;
        z-index: 100;
        background: rgb(208, 238, 223);
    }
`
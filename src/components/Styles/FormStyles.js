import styled from 'styled-components'

export const FormStyles = styled.section`
    background: #fff;
    font-family: Montserrat-Medium;
    position: relative;
 
    .p-header{
        padding: 4rem 0rem 2rem 0rem;
        margin-bottom: 0rem;
    }

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

    .error{
        padding: .5rem;
        margin: 2rem 2rem 0rem 2rem;
        font-size: 0.8rem;
        font-weight: 600;
        text-align: center;
        color: #fff;
        background-color: rgb(180, 4, 4);
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

            .checkboxes{
                display: flex;
                align-items: center;
                width: 100%;
                margin-bottom: .5rem;

                input{
                    width: unset;
                }
                
                label{
                    display: inline;
                    margin-top: 0rem;
                    margin-left: 1rem;
                    margin-bottom: 0rem;
                    font-size: .65rem;
                    color: gray;
                }
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

    @media screen and (max-width: 500px){

        .header{
            padding: 1rem;
        }
        
        form{
            grid-template-columns: 1fr;
            margin: 3rem 1rem 1rem 1rem;

            div{
                label{
                    font-size: .75rem;
                }
    
                input, select, textarea{
                    padding: .6rem;
                    font-size: .7rem;
                }
            }

            button{
                width: 100%;
                padding: .75rem;
                font-size: .8rem !important;
                font-family: Montserrat-Regular;
            }
        }
    }
`
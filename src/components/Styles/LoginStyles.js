import styled from 'styled-components'

export const LoginStyles = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: #fff;
    align-items: center;
    padding: 5rem 0rem 3rem 0rem;
    position: relative;

    &:before{
        content: "";
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: black;
        opacity: 0.9;
        position: ${(props) => (props.backdrop === true? 'absolute' : 'none')};
    }
    
    .container{
        width: 80%;
        margin: auto;
        display: grid;
        grid-template-columns: 1fr 1fr;
        align-items: center;
        gap: 3rem;

        form{

            .error{
                width: 80%;
                padding: .5rem;
                margin-bottom: 1rem;
                font-size: 0.8rem;
                font-weight: 600;
                text-align: center;
                color: #fff;
                background-color: rgb(180, 4, 4);
            }

             div{
                 width: 80%;

                 label {
                     display: block;
                     margin-bottom: 1rem;
                     font-family: Montserrat-Medium;
                     font-size: .8rem;
                     color: grey;
                 }

                 input{
                     width: 100%;
                     background: none;
                     padding: .5rem;
                     margin-bottom: 1rem;
                     border: 2px rgb(22, 122, 109) solid;
                     border-radius: 5px;
                 }

                 button{
                     width: 100%;
                     padding: .8rem;
                     margin-top: .5rem;
                     background-color: rgb(22, 122, 109);
                     border-radius: 5px;
                     border: none;
                     color: #fff;
                     font-family: Montserrat-Medium;
                     cursor: pointer;
                     outline: none;
                 }

                 button:hover{
                     background-color: rgb(15, 228, 217);
                 }

                 li{
                    margin-top: 1rem;
                    color: rgb(22, 122, 109);
                    font-family: Montserrat-Medium;
                    font-size: .8rem;
                }
            }

            div:last-child{
                display: flex;
                justify-content: space-between;
            }

        }

        .visuals{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            img{
                max-width: 20rem;
                margin-bottom: 2rem;
            }

            p, h3{
                font-family: Montserrat-Medium;
                font-weight: 600;
                color: rgb(61, 61, 61);
            }
            
            p{
                margin-bottom: 1rem;
            }

            h3{
                text-transform: uppercase;
                font-size: 1.5rem;
                color: rgb(233, 140, 0);
                font-weight: 600;
            }
        }
    }

    .signup-form{
        top: 50%;
        left: 50%;
        width: 50%;
        height: 30rem;
        transform: translate(-50%, -50%);
        background: #fff;
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;

        form{
            width: 50%;
            position: relative;

            div{

                label {
                    display: block;
                    margin-bottom: 1rem;
                    font-family: Montserrat-Medium;
                    font-size: .8rem;
                    color: grey;
                }

                input{
                    width: 100%;
                    background: none;
                    padding: .5rem;
                    margin-bottom: 1rem;
                    border: 2px rgb(22, 122, 109) solid;
                    border-radius: 5px;
                }

                button{
                    width: 100%;
                    padding: .8rem;
                    margin-top: .5rem;
                    background-color: rgb(22, 122, 109);
                    border-radius: 5px;
                    border: none;
                    color: #fff;
                    font-family: Montserrat-Medium;
                    cursor: pointer;
                    outline: none;
                }
            }
        }
    }

    footer p{
        color: rgb(22, 122, 109);
        margin-bottom: 0rem;
        margin-top: 4rem;
        font-size: .8rem;
        font-family: Montserrat-Medium;
    }

   @media screen and (max-width: 500px){
       .container{
           grid-template-columns: 1fr;
           grid-template-areas:
                "img"
                "form";
           gap: 2rem;

           .visuals{
                grid-area: img;

               img{
                    max-width: 15rem;
                }
                
                p{
                    margin-bottom: .7rem;
                    font-size: .8rem;
                }

                h3{
                    font-size: 1rem;
                    text-align: center;
                    margin-bottom: 0rem;
                }
           }

           form{
               grid-area: form;

               .error{
                font-weight: 400;
                }

                div{
                    width: 100%;

                    label {
                        font-size: .75rem;
                    }

                    input{
                        padding: .4rem;
                    }

                    button{
                        padding: .5rem;
                    }

                    li{
                        font-size: .75rem;
                    }
                }
           }
       }

       .signup-form{
            width: 90%;
            margin: auto;

            form{
                width: 90%;

                div{
                    width: 100%;

                    label {
                        font-size: .75rem;
                    }

                    input{
                        padding: .4rem;
                    }

                    button{
                        padding: .5rem;
                    }

                    li{
                        font-size: .75rem;
                    }
                }
            }
        }

       
        footer p{
            width: 80%;
            margin: 3rem auto 0rem auto;
            font-size: .7rem;
            text-align: center;
        }
   }

`;
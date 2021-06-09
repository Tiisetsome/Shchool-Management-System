import styled from 'styled-components'

export const TestNoticesStyles = styled.div`
    background: #fff;
    margin-bottom: 2rem;

    .p-header{
        background: #F0F0F0;
        padding-bottom: 2rem;
        margin-bottom: 0rem;
    }

    .header{
        padding: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    
        color: black;

        p{
            font-weight: 600;
            color: black !important;
            margin: 0rem;
            padding-top: 0rem;
        }
    }

    .test-notices-wrapper {

        .test-notice:nth-child(odd){
            background: #f5f5f5;
        }
        
        .test-notice{
            margin-bottom: 1rem;
            border-left: 5px #26DACB solid;
            border-radius: 5px 0px 0px 5px;

            p{
                margin: 1rem;
            }

            p:first-child{
                font-weight: 500;
                padding-top: 1rem;
                margin-top: 0rem;
            }

            p:nth-child(2){
                font-weight: 600;
                font-size: 1rem;
                color: #26DACB;
                margin-bottom: 0rem;
            }

            p:last-child{
                padding-bottom: 1rem;
                font-weight: 500;
            }
        }

        .event-notice:nth-child(odd){
            p:nth-child(2){
                color: rgb(233, 140, 0);
            }
        }

        .empty-data{
            padding: 8rem;
            text-align: center;
            font-weight: 600;
            font-size: 1.5rem;
            color: grey;
        }
    }

    @media screen and (max-width: 500px){

        .header p{
            font-weight: 550;
        }

        .test-notices-wrapper {
            .test-notice{
                p{
                    margin: 1rem;
                }
    
                p:first-child{
                    font-size: .7rem;
                }
    
                p:nth-child(2){
                    font-size: .85rem;
                    font-weight: 550;
                }
    
                p:last-child{
                    font-size: .7rem;
                }
            }
        }
    }
`
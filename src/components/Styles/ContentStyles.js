import styled from 'styled-components'

export const ContentStyles = styled.main`
        width: calc(100% - 2rem);
        display: grid;
        grid-template-columns: 20% 1fr;
        grid-gap: 2rem;
        position: relative;

        .menu{
            display: none;
        }

        p{
            color: grey;
            font-size: .8rem;

            span{
                color: rgb(233, 140, 0);
            }

        }

        .p-header {
            padding-top: 3.5rem;
        }

        @media screen and (max-width: 500px){
            grid-template-columns: 1fr;
            margin: auto;

            .menu{
                display: block;
                position: absolute;
                top: -2.8rem;
                right: 0rem;
                z-index: 2000;
            }
        }
    `;
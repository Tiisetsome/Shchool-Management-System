import styled from 'styled-components'

export const ContentStyles = styled.main`
        width: calc(100% - 2rem);
        display: grid;
        grid-template-columns: 20% 1fr;
        grid-gap: 2rem;
        position: relative;

        p{
        color: grey;
        font-size: .8rem;

        span{
            color: rgb(233, 140, 0);
        }

        }

        .p-header {
        padding-top: 3.5rem;
    }`;
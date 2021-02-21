import styled from 'styled-components'

export const NavigationStyles = styled.nav`
    padding: 1.5rem;
    display: flex;
    background-color: ${(props)=> (props.isAuth === true? '#fff' : 'rgb(15, 228, 217)')};
    justify-content: space-between;
    align-items: center;
    color: ${(props)=> (props.isAuth === true? 'black' : '#fff')};

    h3{
        margin-bottom: 0rem;
    }

    ul{
        width: 10rem;
        display: flex;
        justify-content: space-between;
        align-items: center;

        li{
            font-family: Montserrat-Medium;
            font-size: .7rem;
            cursor: pointer;
        }
    }
`;
import styled from 'styled-components'

export const NavigationStyles = styled.nav`
    padding: 1.5rem;
    display: flex;
    background-color: ${(props)=> (props.isAuth === true || props.tcAuth === true || props.sdnAuth === true ? '#fff' : 'rgb(15, 228, 217)')};
    justify-content: space-between;
    align-items: center;
    color: ${(props)=> (props.isAuth === true || props.tcAuth === true || props.sdnAuth === true ? 'black' : '#fff')};

    h3{
        margin-bottom: 0rem;
    }
    
    ul{
        width: 12rem;
        display: ${(props)=> (props.isAuth === true || props.sdnAuth === true || props.tcAuth === true ? 'flex' : 'none')};
        justify-content: space-between;
        align-items: center;

        li{
            font-family: Montserrat-Medium;
            font-size: .7rem;
            cursor: pointer;
        }
    }

    @media screen and (max-width: 500px){
        h3{
            font-size: .9rem;
        }

        ul{
          display: none;
        }
    }
`;
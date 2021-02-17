import styled from 'styled-components'

export const TopSummaryStyles = styled.section`
        display: grid;
        grid-template-columns: ${(props) => (props.grades? 'repeat(5, 1fr)' : 'repeat(4, 1fr)')};
        grid-gap: 1rem;
        margin-bottom: 1rem;

        .cartegory-wrapper{
            height: 8rem;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 2rem;
            background-color: #fff;

            p{
                margin-bottom: 0rem;
                font-size: 1.1rem;
                font-weight: 600;
                font-family: Montserrat-Medium;
                color: black;
            }

            .line{
                width: 1px;
                height: 2rem;
                background-color: rgb(220, 220, 220);
            }

            .cartegory{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                p{
                    font-size: .8rem;
                    font-weight: 500;
                }

                img{
                    margin-bottom: .6rem;
                    max-width: 1.5rem;
                }
            }
        }
`;
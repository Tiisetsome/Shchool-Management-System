import styled from 'styled-components'

export const TableStyles = styled.section`
    
background-color: #fff;
position: relative;

p{
    margin-bottom: 0rem;
}

.header{
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgb(220, 220, 220);
    color: black;

    p{
        font-weight: 600;
        color: black !important;
    }
}

.teachers-table{
    border-collapse: collapse;
    font-size: .7rem;
    width: 100%;
    font-family: Montserrat-Regular;
    margin-bottom: 2rem;

    thead tr{
        text-align: left;
        border-bottom: 1px solid rgb(220, 220, 220);
        
        th{
            padding: 1.2rem 1rem;
            font-weight: 600;
            margin-right: 2rem;
        }
    }

    tbody tr{


        td{
            padding: 1.2rem 1rem;
            margin-right: 2rem;

            div{
                width: 2rem;
                height: 2rem;
                background: pink;
                border-radius: 100%;
            }

        }

        td:last-child{
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 6rem;
            margin-top: calc(1.2rem / 2);
            position: relative;
        }

        .promote-btn{
            padding: 0.3rem 1.4rem;
            border-radius: 5rem;
            font-size: .6rem;
            background-color: rgb(9, 95, 95);
            color: #fff;
            cursor: pointer;
        }

        .promote-btn:hover{
            background-color: rgb(38, 218, 203);
        }
    }

    tbody tr:nth-child(even){
        background-color: rgb(240, 240, 240);
        
        td:nth-child(even) div{
            background: rgb(158, 191, 252);
        }
    }
}

.confirm{
    width: 50%;
    padding: 2rem 0rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 200;

    p{
        margin-bottom: .5rem;
        text-align: center;
    }

    .buttons{
        display: flex;
        gap: .5rem;

        div{
            padding: .4rem;
            margin-top: .5rem;
            border-radius: 5px;
            font-size: .7rem;
            font-weight: 600;
            color: #fff;
            background-color: rgb(177, 2, 2);
            cursor: pointer;
        }

        div:hover{
            background-color: rgb(220, 2, 2);
        }

        div:first-child{
            background-color: rgb(9, 95, 95);
        }

        div:first-child:hover{
            background-color: rgb(38, 218, 203);
        }
    }
}

.backdrop{
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: black;
    opacity: 0.8;
    position: absolute;
    z-index: 100;
}

@media screen and (max-width: 500px){
    width: 100%;
    margin: auto;

    .header p{
        font-weight: 550;
    }

    .teachers-table{

        thead tr{
            th:first-child,
            th:nth-child(5),
            th:nth-child(6),
            th:nth-child(7),
            th:nth-child(8){
                display: none;
            }

            th{
                padding: 1.2rem .7rem;
            }
        }

        tbody tr{

            td{
                margin-right: 0rem;
                padding: .5rem .7rem;
            }

            td:last-child{
                width: 5rem;
            }

            td:first-child,
            td:nth-child(5),
            td:nth-child(6),
            td:nth-child(7),
            td:nth-child(8){
                display:none;
            }
        }
    }
}

`;
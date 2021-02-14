import styled from 'styled-components'

const Search = ({width, text, onChangeHandler, onSubmitHandler, personId}) => {

    //Form styles
    const styles = {
        width: "6rem",
        backgroundImage : "linear-gradient(rgb(245, 71, 115), rgb(153, 8, 44))"
    }

    return (
        <SearchStyles>
            <input style={width? {width: "6rem"} : null} type="text" placeholder={text} onChange={(e) => onChangeHandler(e)} value={personId} required/>
            <button style={width? styles : null} type="submit" onClick = {(e) => onSubmitHandler(e)}>Search</button>
        </SearchStyles>
    )
}

const SearchStyles = styled.form`
    display: flex;
    gap: 1rem;

    input, button{
        width: 8rem;
        padding: .4rem;
        border-radius: 1rem;
        border: none;
        background-color: rgb(240, 240, 240);
        font-size: .7rem;
    }

    input{
    padding-left: 1rem
    }

    button{
        background-color: rgb(9, 95, 95);
        color: #fff;
        cursor: pointer;
        font-size: .7rem;
    }

    button:hover{
        background-color: rgb(38, 218, 203);
    }
`;

export default Search

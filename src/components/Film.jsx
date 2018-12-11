import React from 'react';
import "./styles";

export const Film = (props, func) => {
    const {film} = props;
    return (
        <React.Fragment>
            <td><img src={'https://png.icons8.com/nolan/2x/movie-projector.png'} className="img"/></td>
            <td>{film.name}</td>
            <td>{film.typeDto.name}</td>
            <td>{film.genreDto.name}</td>
            <td>{film.releasedate}</td>
            <td>{film.rate}</td>
        </React.Fragment>
    );
}
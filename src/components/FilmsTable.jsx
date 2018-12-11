import React from 'react';
import { Col, Table, Row } from "react-bootstrap";
import { Film } from './Film';

export const FilmsTable = (props) => {
    const {films} = props;
    const {handleModalStateOpened} = props;
    const filmsItems = films.map((film) =>  
        <tr key={film.id} id={film.id} className="clickable" onClick={handleModalStateOpened}><Film film = {film}/></tr>
    )

    return(
        <Row>
            <Col xs={12}>
                <Table responsive>
                    <thead>
                        <tr>
                            <th className="th"></th>
                            <th className="th">Title</th>
                            <th className="th">Type</th>
                            <th className="th">Genre</th>
                            <th className="th">Release Date</th>
                            <th className="th">Rate</th>
                        </tr>
                    </thead>
                    <tbody className="antable">
                    {filmsItems}
                    </tbody>
                </Table>
            </Col>
        </Row>
    )  
}
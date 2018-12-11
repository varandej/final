import React from 'react';
import { Col, FormGroup, FormControl, Button, Row, InputGroup, Modal, Well } from "react-bootstrap";
import axios from 'axios';
import { FilmsTable } from './FilmsTable'
import "./styles";
import Select from 'react-select';

export class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: "",
            genre: "",
            year: "",
            name: "",
            isOpened: false,
            id: null,
            arr: [],
            filteredArr: [],
            film: [],
            filmGenre: [],
            filmType: [],
            filmReview: []
        }
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleGenreChange = this.handleGenreChange.bind(this);
        this.handleYearChange = this.handleYearChange.bind(this);
        this.handleSearchBarInputChange = this.handleSearchBarInputChange.bind(this);
        this.handleSearchButtonClick = this.handleSearchButtonClick.bind(this);
        this.handleModalStateOpened = this.handleModalStateOpened.bind(this);
        this.handleModalStateClosed = this.handleModalStateClosed.bind(this);
    }

    handleTypeChange(selectedObject) {
        const arr = this.state.arr;
        const filtered = arr.filter((item) =>
            item.typeDto.name.indexOf(selectedObject.value) !== -1
        );
        this.setState({
            type: selectedObject,
            filteredArr: filtered
        });
    }

    handleGenreChange(selectedObject) {
        const arr = this.state.arr;
        const filtered = arr.filter((film) =>
            film.genreDto.name.indexOf(selectedObject.value) !== -1
        );
        this.setState({
            genre: selectedObject,
            filteredArr: filtered
        });
    }

    handleYearChange(selectedObject) {
        const arr = this.state.arr;
        const filtered = arr.filter((film) =>
            film.releasedate.indexOf(selectedObject.value) !== -1
        );
        this.setState({
            year: selectedObject,
            filteredArr: filtered
        })
    }

    handleSearchBarInputChange(event) {
        this.setState({
            name: event.target.value
        })
    }

    handleSearchButtonClick() {
        const { name } = this.state;
        const url = 'http://localhost:8282/webapp/movie/view?name=' + name + '&fromyear=&toyear=&fromrate=&torate='
        axios
        .get(url)
        .then((response) =>
            this.setState({
                arr: response.data,
                filteredArr: response.data
            })
        )
        .catch((error) => {
            alert("Ошибка! Не волнуйтесь шибко! " + error.message);
        });
    }

    handleModalStateOpened(event) {
        const url = 'http://localhost:8282/webapp/movie/' + event.currentTarget.id;
        axios
        .get(url)
        .then((response) =>
            this.setState({
                film: response.data,
                filmGenre: response.data.genre,
                filmType: response.data.type,
                filmReview: response.data.reviewList
            })
        )
        .catch((error) => {
            alert("Ошибка! Не волнуйтесь шибко! " + error.message);
        });
        this.setState({
            isOpened: true,
            id: event.currentTarget.id
        });
    }

    handleModalStateClosed(){
        this.setState({
            isOpened: false,
            film: [],
            filmGenre: [],
            filmType: [],
            filmReview: []
        })
    }

    render() {
        var reviewList = this.state.filmReview;
        var modal = this.state.isOpened && (
            <div className="static-modal" >
            <Modal.Dialog className="bg">
              <Modal.Header>
                <Modal.Title>{this.state.film.name}</Modal.Title>
              </Modal.Header>
              <Modal.Body style={{height:"355px"}}>
                <div>
                    <Well className="wellTitle">
                        Release Date: {this.state.film.releasedate}
                    </Well>
                    <Well className="wellTitle">
                        Rate: {this.state.film.rate}
                    </Well>
                    <Well className="wellTitle">
                        Annotation: {this.state.film.description}
                    </Well>
                    <Well className="wellTitle">
                        Genre: {this.state.filmGenre.name}
                    </Well>
                    <Well className="wellTitle">
                        Type: {this.state.filmType.name}
                    </Well>
                </div>  
                    {reviewList.map((review) =>
                        <Well className="revWell" key={review.text}>
                            <p className="pTF">
                                Autor: {review.author} | Date: {review.creationdate}
                            </p>
                            <p className="pText">
                                {review.text}
                            </p>
                            <p className="pTF">
                                Rate: {review.userrate}
                            </p>
                        </Well>
                    )}
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.handleModalStateClosed} bsStyle="primary">X</Button>
              </Modal.Footer>
            </Modal.Dialog>
          </div>
        );
        return (
            <div className="animated">
                <Row>
                    <Col xs={3}>
                        <Select
                            name="type"
                            value={this.state.type}
                            onChange={this.handleTypeChange}
                            clearable={false}
                            options={[
                                { value: "", label: "all" },
                                { value: "full", label: "full" },
                                { value: "short", label: "short" },
                                { value: "serial", label: "serial" }
                            ]}
                        />
                    </Col>
                    <Col xs={3}>
                        <Select
                            name="genre"
                            value={this.state.genre}
                            onChange={this.handleGenreChange}
                            clearable={false}
                            options={[
                                { value: "", label: "all" },
                                { value: "thriller", label: "thriller" },
                                { value: "horror", label: "horror" },
                                { value: "detective", label: "detective" }
                            ]}
                        />
                    </Col>
                    <Col xs={3}>
                        <Select
                            name="year"
                            value={this.state.year}
                            onChange={this.handleYearChange}
                            clearable={false}
                            options={[
                                { value: "", label: "all" },
                                { value: '2007', label: '2007' },
                                { value: '2005', label: '2005' },
                                { value: '1982', label: '1982' },
                                { value: '1980', label: '1980' }
                            ]}
                        />
                    </Col>
                    <Col xs={3}>
                        <FormGroup>
                            <InputGroup>
                                <FormControl type="text" onChange={this.handleSearchBarInputChange} className="itemGroup" />
                                <InputGroup.Button>
                                    <Button onClick={this.handleSearchButtonClick} className="itemGroup">Search</Button>
                                </InputGroup.Button>
                            </InputGroup>
                        </FormGroup>
                    </Col>
                </Row>
                <FilmsTable films={this.state.filteredArr} handleModalStateOpened={this.handleModalStateOpened} />
                {modal}
            </div>
        )
    }
}
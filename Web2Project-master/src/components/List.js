import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import Button from "react-bootstrap/Button";
import CloseButton from 'react-bootstrap/CloseButton';
import { Col, Row } from "react-bootstrap";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

function List(props) {
  const listID = props.listID;

  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  let cardIds = [];
  let list_name = props.list_name;

  function addCard(id) {
    const cardName = prompt("Input card name");
    const url = `http://localhost:8080/api/new/card/${cardName}/${id}`;
    axios.post(url).then(() => {
      console.log("Card successfully added.");
      refresh();
    })
  };

  function editCard(id) {
    const cardName = prompt("Input a new name for the card");
    let url = `http://localhost:8080/api/editCard/${id}/${cardName}`;
    axios.put(url).then(() => {
      console.log("Card successfully modified.");
      //setHeading(id);
      refresh();
    })
  }


  const deleteCard = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/card/delete/${id}`);
      console.log("Card successfully deleted.");
      refresh()
    } catch (error) {
      alert(error);
    }
  };

  function editList(id) {
    const listName = prompt("Input a new name for the list");
    let url = `http://localhost:8080/api/editList/${id}/${listName}`;
    axios.put(url).then(() => {
      console.log("List successfully modified.");
      //setHeading(id);
      refresh();
    })
  }

  const deleteList = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/list/delete/${id}`);
      console.log("List successfully deleted.");
      refresh()
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    cardIds = [];
    const url = `http://localhost:8080/api/get/cards/${listID}`;
    setLoading(true);
    axios.get(url).then((response) => {
      setCardData(response.data);
    }).catch((err) => {
      setError(err);
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  function refresh() {
    window.location.reload(true);
  }

  return (
    <Col sm='auto'>
      <div className="card listItem" key={listID}>
        <div className="card-header"><h1><span id="listHeading">{list_name}</span><a onClick={() => editList(listID)} title="Rename list">&emsp;<AiOutlineEdit /></a></h1></div>
        <ul className="list-group list-group-flush">
          {cardData.map((card, index) => {
            cardIds.push(card.cardID);
            return (
              <li className="list-group-item d-flex justify-content-between align-items-center cardItem"
                index={index} key={card.cardID}>
                <h4>{card.card_name}</h4>
                <a onClick={() => editCard(card.cardID)} title="Rename card">&emsp;<AiOutlineEdit /></a>
                <a onClick={() => deleteCard(card.cardID)} title="Delete card">&emsp;<AiOutlineDelete /></a>
              </li>
            );
          })}
        </ul>
        <div className="card-footer" style={{ marginTop: "auto" }}>
          <Button className="cardAdd" variant="outline-primary" size="small" onClick={() => { addCard(listID) }}>Add Card</Button>
          <Button className="listRemove" style={{ visibility: (cardIds.length < 1) ? "visible" : "hidden" }}  variant="outline-danger" size="small" onClick={() => { deleteList(listID) }}>Delete List</Button>
        </div>
      </div>
    </Col>
  );
};
export default List;

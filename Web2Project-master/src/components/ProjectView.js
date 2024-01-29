import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";
import Button from "react-bootstrap/Button";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import List from "./List";
const ProjectView = () => {
  const { projectID } = useParams();
  const [listData, setListData] = useState([]);
  //const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  let listIdt = [];

  function addList(projectID) {
    const listName = prompt("Input list name");
    const url = `http://localhost:8080/api/new/list/${listName}/${projectID}`;
    axios.post(url).then(() => {
      console.log("Project successfully added.");
      refresh();
    })
  };

  function refresh() {
    window.location.reload(true);
  }

  const deleteProject = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/project/delete/${id}`);
      console.log("Project successfully deleted.");
      navigate('/projects');
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    listIdt = [];
    const url = `http://localhost:8080/api/get/lists/${projectID}`;
    setLoading(true);
    axios.get(url).then((response) => {
      setListData(response.data);
    }).catch((err) => {
      setError(err);
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  return (
    <div id="projectview">
      <Row>
        {listData.map((list, index) => {
          listIdt.push(list.listID);
          return (
            <List key={list.projectID} listID={list.listID} list_name={list.list_name}/>
          );
        })}
      </Row>
      <br /><br />
      <h2 style={{ display: (listIdt.length < 1) ? "block" : "none" }} >Begin by adding a list</h2>
      <Button className={"listAdd"} variant="primary" size="small" onClick={() => addList(projectID)}>New List</Button>
      <Button variant={(listIdt.length < 1) ? "outline-danger" : "disabled"}
        title={(listIdt.length < 1) ? "This cannot be undone!" : "Project is not empty"}
        className={"projectRemove"} onClick={() => deleteProject(projectID)} value={"deleteButton"}>
        Delete Project</Button>
    </div>
  );
};
export default ProjectView;

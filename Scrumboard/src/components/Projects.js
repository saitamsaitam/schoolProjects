import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Table } from "react-bootstrap";
import "../style/listStyles.css";
import "../style/projectStyles.css";
import { Link } from "react-router-dom";

const Projects = () => {
  const [data, setData] = useState([]);

  const [currentUserID, setCurrentUserID] = useState(null);

  let currentUserName = localStorage.getItem("username");

  const addProject = () => {
    const projectName = prompt("Input project name");
    const url = `http://localhost:8080/api/new/project/${projectName}/${currentUserID}`;
    axios.post(url).then((res) => {
      console.log(res);
      const obj = {
        projectID: res.data.insertId,
        project_name: projectName,
        userID: currentUserID,
      };
      setData([...data, obj]);
      console.log("Project successfully added.");
    });
  };

  // const deleteProject = async (id) => {
  //     try {
  //         await axios.delete(`http://localhost:8080/api/project/delete/${id}`);
  //         console.log("Project successfully deleted.");
  //     } catch (error) {
  //         alert(error);
  //     }
  // };

  useEffect(() => {
    currentUserName = localStorage.getItem("username");
    if (currentUserName != null) {
      let url = `http://localhost:8080/api/getUserID/${currentUserName}`;
      axios
        .get(url)
        .then((response) => {
          setCurrentUserID(response.data[0].userID); //tää ei toimi mulla en tiiä miks t.julia
          //const curUserID = response.data[0].userID;
          url = `http://localhost:8080/api/get/project/${currentUserID}`;
          axios
            .get(url)
            .then((res) => {
              setData(res.data);
              console.log(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [`http://localhost:8080/api/get/project/${currentUserID}`]);

  return (
    <>
      <div className="container">
        <div>
          <h1>All Projects</h1>
        </div>

        <Table className="table" striped bordered hover>
          <thead className="thead" variant="dark">
            <tr className="trHead">
              <th>#ID</th>
              <th>Project Name</th>
              <th>User ID</th>
            </tr>
          </thead>
          <tbody>
            {data.map((project, index) => {
              return (
                <tr className="projectItem" key={project.projectID}>
                  <td>{project.projectID}</td>
                  <td>
                    <Link
                      to={`/projectview/${project.projectID}/${project.project_name}`}
                    >
                      {" "}
                      {project.project_name}{" "}
                    </Link>
                  </td>
                  <td>{project.userID}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>

        <Button onClick={addProject} variant="primary">
          Add new Project
        </Button>
      </div>
    </>
  );
};
export default Projects;

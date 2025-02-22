import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { Table } from "react-bootstrap";
import axios from "axios";
import { URL_USERS } from "./Path";
import { Link } from "react-router-dom";

import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom";
import ChartComponent from "./Task/TaskDashboard";
const Content = () => {
  const [tasks, setTasks] = useState([]);
  const [jarayon, setJarayon] = useState([]);
  const [tugadi, setTugadi] = useState([]);
  const [tuxtadi, setTuxtadi] = useState([]);
  const [boshlanmadi, setBoshlanmadi] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [openjarayon, setOpenjarayon] = useState(false);
  const [opentugadi, setOpentugadi] = useState(false);
  const [opentuxtadi, setOpentuxtadi] = useState(false);
  const [openboshlanmadi, setOpenboshlanmadi] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  const toggleList = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    axios
      .get(`${URL_USERS}` + "tasks/", {
        "Content-Type": "application/json",
      })
      .then((res) => {
        setTasks(res.data);
        const filteredData = res.data.filter(
          (post) => post.status === "Jarayonda"
        );
        const tug = res.data.filter((i) => i.status === "Tugatildi");
        const tux = res.data.filter((i) => i.status === "Toxtatildi");
        const bosh = res.data.filter((i) => i.status === "Boshlanmadi");
        setJarayon(filteredData);
        setTugadi(tug);
        setTuxtadi(tux);
        setBoshlanmadi(bosh);
        // const formattedDate = res.data.created_at.toISOString().split("T")[0]; // YYYY-MM-DD format
        // setCurrentDate(formattedDate);
      });
  }, []);
  // const sana = tasks.created_at.toISOString().split("T")[0]

  return (
    <Container>
      <Row>
        <Col>
          <Link onClick={toggleList} className="btn ">
            <Card>
              <Card.Body className="tasktotal">
                <Card.Title>Jami topshiriqlar</Card.Title>

                <Card.Text>{tasks.length} </Card.Text>

                {/* <Card.Link href="#">Another Link</Card.Link> */}
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col>
          <Link className="btn" onClick={() => setOpenjarayon(!openjarayon)}>
            <Card>
              <Card.Body className="jarayon">
                <Card.Title>Jarayondagi</Card.Title>

                <Card.Text> {jarayon.length} dona </Card.Text>
                {/* <Card.Link href="#">Card Link</Card.Link> */}
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col>
          <Link className="btn" onClick={() => setOpentugadi(!opentugadi)}>
            <Card>
              <Card.Body className="tugadi">
                <Card.Title>Tugatilgan </Card.Title>

                <Card.Text>{tugadi.length} </Card.Text>
                {/* <Card.Link href="#">Card Link</Card.Link> */}
                {/* <Card.Link href="#">Another Link</Card.Link> */}
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col>
          <Link className="btn" onClick={() => setOpentuxtadi(!opentuxtadi)}>
            <Card>
              <Card.Body className="tuxtadi">
                <Card.Title>Toxtatilgan</Card.Title>
                {/* <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle> */}
                <Card.Text>{tuxtadi.length} </Card.Text>
                {/* <Card.Link href="#">Card Link</Card.Link> */}
                {/* <Card.Link href="#">Another Link</Card.Link> */}
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col>
          <Link className="btn">
            <Card>
              <Card.Body
                className="boshlanmadi"
                onClick={() => setOpenboshlanmadi(!openboshlanmadi)}
              >
                <Card.Title>Boshlanmagan </Card.Title>
                {/* <Card.Subtitle className="mb-2 text-muted">
                Card Subtitle
              </Card.Subtitle> */}
                <Card.Text>{boshlanmadi.length} </Card.Text>
                {/* <Card.Link href="#">Card Link</Card.Link> */}
                {/* <Card.Link href="#">Another Link</Card.Link> */}
              </Card.Body>
            </Card>
          </Link>
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          {" "}
          <Card>
            <Card.Body>
              <Table striped bordered hover>
                {isOpen && (
                  <thead>
                    <tr>
                      <th>Turi</th>
                      <th>Asos</th>
                      <th>Buyruq</th>
                      {/* <th>Sana</th> */}
                      <th>Mazmuni</th>
                      <th>Tahrirlash</th>
                    </tr>
                  </thead>
                )}
                {isOpen &&
                  tasks.map((task, i) => (
                    <tbody>
                      <tr>
                        {/* <td>{task.id}</td> */}
                        <td>{task.turi}</td>
                        <td>{task.asos}</td>
                        <td>{task.buyruq}</td>
                        {/* <td>{currentDate}</td> */}
                        <td>{task.mazmuni}</td>
                        {/* <td>{task.xodim_soni}</td>
                                    <td>{task.status}</td>
                                    <td>{task.izoh}</td>
                                    <td>{task.link}</td>
                                    <td>{task.link_kimda}</td> */}
                        {/* <td>
                                      <Link
                                        to={`/tasks/${task.id}`}
                                        className="btn btn-outline-primary"
                                      >
                                        Read
                                      </Link>
                                    </td> */}
                        <td>
                          <Link
                            to={`/tasku/${task.id}`}
                            className="btn btn-outline-success"
                          >
                            Tahrirlash
                          </Link>
                        </td>
                      </tr>
                    </tbody>
                  ))}

                {openjarayon && (
                  <thead>
                    <tr>
                      <th>Turi</th>
                      <th>Asos</th>
                      <th>Buyruq</th>
                      <th>Mazmuni</th>
                      <th>Tahrirlash</th>
                    </tr>
                  </thead>
                )}

                {openjarayon &&
                  jarayon.map((item, i) => (
                    <tbody>
                      <tr>
                        <td>{item.turi}</td>
                        <td>{item.asos}</td>
                        <td>{item.buyruq}</td>
                        <td>{item.mazmuni}</td>
                        <td>
                          <Link
                            to={`/tasku/${item.id}`}
                            className="btn btn-outline-success"
                          >
                            Tahrirlash
                          </Link>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                {openboshlanmadi && (
                  <thead>
                    <tr>
                      <th>Turi</th>
                      <th>Asos</th>
                      <th>Buyruq</th>
                      <th>Mazmuni</th>
                      <th>Tahrirlash</th>
                    </tr>
                  </thead>
                )}
                {openboshlanmadi &&
                  boshlanmadi.map((item, i) => (
                    <tbody>
                      <tr>
                        <td>{item.turi}</td>
                        <td>{item.asos}</td>
                        <td>{item.buyruq}</td>
                        <td>{item.mazmuni}</td>
                        <td>
                          <Link
                            to={`/tasku/${item.id}`}
                            className="btn btn-outline-success"
                          >
                            Tahrirlash
                          </Link>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                {opentugadi && (
                  <thead>
                    <tr>
                      <th>Turi</th>
                      <th>Asos</th>
                      <th>Buyruq</th>
                      <th>Mazmuni</th>
                      <th>Tahrirlash</th>
                    </tr>
                  </thead>
                )}
                {opentugadi &&
                  tugadi.map((item, i) => (
                    <tbody>
                      <tr>
                        <td>{item.turi}</td>
                        <td>{item.asos}</td>
                        <td>{item.buyruq}</td>
                        <td>{item.mazmuni}</td>
                        <td>
                          <Link
                            to={`/tasku/${item.id}`}
                            className="btn btn-outline-success"
                          >
                            Tahrirlash
                          </Link>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                {opentuxtadi && (
                  <thead>
                    <tr>
                      <th>Turi</th>
                      <th>Asos</th>
                      <th>Buyruq</th>
                      <th>Mazmuni</th>
                      <th>Tahrirlash</th>
                    </tr>
                  </thead>
                )}
                {opentuxtadi &&
                  tuxtadi.map((item, i) => (
                    <tbody>
                      <tr>
                        <td>{item.turi}</td>
                        <td>{item.asos}</td>
                        <td>{item.buyruq}</td>
                        <td>{item.mazmuni}</td>
                        <td>
                          <Link
                            to={`/tasku/${item.id}`}
                            className="btn btn-outline-success"
                          >
                            Tahrirlash
                          </Link>
                        </td>
                      </tr>
                    </tbody>
                  ))}
              </Table>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          {" "}
          <Card>
            <Card.Body>This is some text within a card body.</Card.Body>

          </Card>
          <ChartComponent />
        </Col>
      </Row>
    </Container>
  );
};

export default Content;

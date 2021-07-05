import {
  Typography,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  NativeSelect,
  Table,
  TableCell,
  TableBody,
  TableContainer,
  TableRow,
  TableHead,
  Switch,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import * as Components from "./Components";
import "./styles.css";
import moment from "moment";
import { db } from "./firebase";

function App() {
  const [signIn, toggle] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [showDone, setShowDone] = useState(false);
  const [showActive, setShowActive] = useState(false);

  const [allData, setAllData] = useState([]);

  // const [inputWhere, setInputWhere] = useState("");

  const [data, setData] = useState({
    category: "",
    title: "",
    date: "",
    location: "",
    status: "",
  });
  // let dateVar = moment().format("L");

  useEffect(() => {
    db.collection("tasks")
      .get()
      .then((snapshot) => {
        const listData = [];
        setAllData([]);
        // console.log(snapshot.docs);
        snapshot.docs.forEach((doc) => {
          let arrListData = doc.data();
          // console.log(listData.task);
          listData.push(arrListData.task);
        });
        setAllData(listData);
        console.log(listData);
      });
  }, []);

  const addTask = (e) => {
    e.preventDefault();
    db.collection("tasks")
      .add({
        task: data,
      })
      .then((doc) => {
        // console.log(doc);
        setTasks([
          ...tasks,
          {
            id: doc.id,
            task: data,
          },
        ]);
        setData("");
      });
  };

  return (
    <Components.Container>
      <Components.SignUpContainer signingIn={signIn}>
        <Components.Form onSubmit={(e) => addTask(e)}>
          {/* <div className="form"> */}
          <Components.Title>new Task</Components.Title>

          <FormControl>
            <InputLabel htmlFor="select-category"></InputLabel>
            <NativeSelect
              id="select-category"
              value={data.category}
              // onChange={(e) => setCatagory(e.target.value)}
              onChange={(e) => setData({ ...data, category: e.target.value })}
            >
              <option aria-label="None" value="" />
              <option value={`All things`}>All things</option>
              <option value={`Bussiness`}>Bussiness</option>
              <option value={`personal`}>personal</option>
              <option value={`Summary`}>Summary</option>
              <option value={`family`}>family</option>
              <option value={`Work`}>Work</option>
            </NativeSelect>
          </FormControl>

          <Components.Input
            type="text"
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
            placeholder="what i have to do? "
          />
          <Components.Input
            value={data.location}
            type="text"
            // onChange={(e) => {
            //   setInputWhere(e.target.value);
            // }}
            onChange={(e) => setData({ ...data, location: e.target.value })}
            placeholder="where? "
          />
          <Components.Input
            value={data.date}
            type="date"
            // onChange={(e) => setInputDate(e.target.value)}
            onChange={(e) => setData({ ...data, date: e.target.value })}
          />
          <Switch
            value={data.status}
            onChange={(e) => setData({ ...data, status: e.target.checked })}
            name="checkedA"
            inputProps={{ "aria-label": "secondary checkbox" }}
          />

          <Components.Button type="submit">Add Tasks</Components.Button>
          {/* </div> */}
        </Components.Form>
      </Components.SignUpContainer>
      <Components.SignInContainer signingIn={signIn}>
        <div>
          <Components.Title>My Tasks</Components.Title>

          <div className="flexBtns">
            <Components.Button onClick={() => setShowAll(true)}>
              All
            </Components.Button>
            <Components.Button onClick={() => setShowDone(true)}>
              Done
            </Components.Button>
            <Components.Button
              onClick={() => {
                setShowActive(true);
                setShowAll(false);
              }}
            >
              active
            </Components.Button>
          </div>
          <div>
            {showAll === true && (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow button>
                      <TableCell align="left">Title</TableCell>
                      <TableCell align="left">category</TableCell>
                      <TableCell align="left">Location</TableCell>
                      <TableCell align="left">Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {allData.map((row) => (
                      <TableRow key={row}>
                        <TableCell align="left">{row.title}</TableCell>
                        <TableCell align="left">{row.category}</TableCell>
                        <TableCell align="center">{row.location}</TableCell>
                        <TableCell align="center">{row.date}</TableCell>
                        <TableCell align="center">{row.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}

            {
              showActive === true && (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow button>
                        <TableCell align="left">Title</TableCell>
                        <TableCell align="left">category</TableCell>
                        <TableCell align="left">Location</TableCell>
                        <TableCell align="left">Date</TableCell>{" "}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {allData.map((row) => {
                        if (row.status === true) {
                          return (
                            <TableRow key={row}>
                              <TableCell align="left">{row.title}</TableCell>
                              <TableCell align="left">{row.category}</TableCell>
                              <TableCell align="center">
                                {row.location}
                              </TableCell>
                              <TableCell align="center">{row.date}</TableCell>
                              <TableCell align="center">{row.status}</TableCell>
                            </TableRow>
                          );
                        }
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              )
              // if(row.status==="active"){
              //   return
              // }
            }
          </div>
        </div>
      </Components.SignInContainer>
      <Components.OverlayContainer signingIn={signIn}>
        <Components.Overlay signingIn={signIn}>
          <Components.LeftOverlayPanel signingIn={signIn}>
            <Components.Title>Summary</Components.Title>
            <Typography>All things</Typography>
            <Typography>Bussiness</Typography>

            <Typography>personal</Typography>

            <Typography>family</Typography>
            <Typography>Work</Typography>

            <Components.GhostButton onClick={() => toggle(true)}>
              view task
            </Components.GhostButton>
          </Components.LeftOverlayPanel>
          <Components.RightOverlayPanel signingIn={signIn}>
            <Components.Title>Hi!</Components.Title>
            <Components.Paragraph>
              Noting do yet? things about it and lets starts!
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(false)}>
              Add Tasks
            </Components.GhostButton>
          </Components.RightOverlayPanel>
        </Components.Overlay>
      </Components.OverlayContainer>
    </Components.Container>
  );
}

export default App;

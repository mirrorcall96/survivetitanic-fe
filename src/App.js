import decair from "./decair.png";
import "./App.css";
import { useState } from "react";
import axios from "axios";
import { isMobile } from "react-device-detect";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

function App() {
  const [boat, setBoat] = useState(true);
  const [result, setResult] = useState(false);
  const [boatClass, setBoatClass] = useState("boatwave");
  const [inputs, setInputs] = useState({
    Age: 20,
    Sex: "female",
    Sibsp: 0,
    Parch: 0,
    Embarked: "S",
    Name: "Miss",
    Fare: 26.55,
    Pclass: 1,
  });
  const sinkBoat = (result) => {
    setBoatClass("boatfall");
    setTimeout(() => {
      setResult(result);
      setBoat(false);
      setTimeout(() => {
        setBoat(true);
        setBoatClass("boatwave");
      }, 5000);
    }, 6000);
  };
  const submit = async () => {
    try {
      const response = await axios.post(
        "https://seahorse-app-u4lde.ondigitalocean.app/",
        inputs
      );
      sinkBoat(response.data);
    } catch (e) {
      alert("error");
    }
  };

  return (
    <div className="App">
      <form
        style={{
          position: "absolute",
          top: "0",
          ...(!isMobile
            ? {
                left: "50%",
                transform: "translate(-50%, 0)",
                padding: "10px",
                borderRadius: "10px",
              }
            : {}),

          zIndex: "20",
          backgroundColor: "#f5f5f5",
        }}
      >
        <h3>Your Ticket</h3>
        <label>
          Title:
          <select
            name="Name"
            value={inputs.Name}
            onChange={(e) => setInputs({ ...inputs, Name: e.target.value })}
          >
            <option value={"Mr"}>Mr</option>
            <option value={"Mrs"}>Mrs</option>
            <option value={"Miss"}>Miss</option>
            <option value={"Master"}>Master</option>
          </select>
        </label>
        <label>
          Name:
          <input type="text" defaultValue={"Lara"} name="Name" />
        </label>
        <br />
        <label>
          Age:
          <input
            type="number"
            name="Age"
            value={inputs.Age}
            onChange={(e) =>
              setInputs({ ...inputs, Age: parseInt(e.target.value) })
            }
          />
        </label>
        <label>
          Sex:
          <select
            name="Sex"
            value={inputs.Sex}
            onChange={(e) => setInputs({ ...inputs, Sex: e.target.value })}
          >
            <option>male</option>
            <option>female</option>
          </select>
        </label>
        <br />

        <label>
          Family:
          <input
            type="number"
            name="Sibsp"
            value={inputs.Sibsp}
            onChange={(e) =>
              setInputs({ ...inputs, Sibsp: parseInt(e.target.value) })
            }
          />
        </label>
        <label>
          Destination:
          <select
            name="Embarked"
            value={inputs.Embarked}
            onChange={(e) => setInputs({ ...inputs, Embarked: e.target.value })}
          >
            <option value={"S"}>Southampton</option>
            <option value={"C"}>Cherbourg</option>
            <option value={"Q"}>Queenstown</option>
          </select>
        </label>
        <br />
        <label>
          Fare:
          <input
            type="number"
            name="Fare"
            value={inputs.Fare}
            onChange={(e) =>
              setInputs({ ...inputs, Fare: parseInt(e.target.value) })
            }
          />
        </label>
        <label>
          Class:
          <select
            name="Pclass"
            value={inputs.Pclass}
            onChange={(e) =>
              setInputs({ ...inputs, Pclass: parseInt(e.target.value) })
            }
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
          </select>
        </label>
        <br />

        <button type="button" onClick={submit}>
          Buy
        </button>
      </form>
      <header className="App-header">
        <p>Would i survive titanic?</p>
        <div className="animation-wrapper">
          <div className="water">
            <ul className="waves">
              <li
                className="wave-one"
                style={{
                  backgroundImage:
                    "url('https://i.postimg.cc/7LtCC11Y/wave1.png')",
                }}
              ></li>
              <li
                className="wave-two"
                style={{
                  backgroundImage:
                    "url('https://i.postimg.cc/P5hv05rh/wave2.png')",
                }}
              ></li>
              <li
                className="wave-three"
                style={{
                  backgroundImage:
                    "url('https://i.postimg.cc/63Dyc91k/wave3.png')",
                }}
              ></li>
              <li
                className="wave-four"
                style={{
                  backgroundImage:
                    "url('https://i.postimg.cc/1tg8DgM0/wave4.png')",
                }}
              ></li>
            </ul>
          </div>
          {boat && (
            <div
              className={"boat " + boatClass}
              style={{
                backgroundImage:
                  "url('https://cdn.pixabay.com/photo/2021/03/04/16/32/ship-6068668__340.png')",
              }}
            ></div>
          )}
          {!isMobile && (
            <>
              <div
                className="cloud"
                style={{
                  backgroundImage:
                    "url('https://i.postimg.cc/VNkrLZCV/cloud-md.png')",
                }}
              ></div>
              <div
                className="cloud2"
                style={{
                  backgroundImage:
                    "url('https://i.postimg.cc/VNkrLZCV/cloud-md.png')",
                }}
              ></div>
            </>
          )}
        </div>
        <img
          style={{
            position: "absolute",
            bottom: "0",
            zIndex: "20",
            minWidth: "100px",
            height: "10%",
          }}
          src={decair}
          className="App-logo"
          alt="logo"
        />
      </header>
      <div>
        <Modal open={result} onClose={() => setResult(null)} center>
          {result && (
            <center>
              <h1>{result}</h1>
              <img
                alt="result"
                src={
                  result === "Survived"
                    ? "https://www.history.com/.image/t_share/MTc2NTQ1ODM1NDQwNDgyMDU4/sinking-of-the-titanic-gettyimages-542907919-1.jpg"
                    : "https://static.vecteezy.com/system/resources/previews/001/193/401/original/death-symbol-png.png"
                }
                width={result === "Survived" && !isMobile ? 600 : 200}
                height={result === "Survived" && !isMobile ? 300 : 200}
              />
            </center>
          )}
        </Modal>
      </div>
    </div>
  );
}

export default App;

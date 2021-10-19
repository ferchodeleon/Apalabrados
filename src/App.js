import "./App.css";
import React, { useEffect, useState } from "react";
import { InputForm } from "./components/InputForm";
import { db } from "./firebase-config";

const App = () => {
  const [inputs, setInputs] = useState([]);
  const [inputCharacters, setInputCharacters] = useState([]);
  const [inputTexts, setInputTexts] = useState([]);

  const getInputNumbers = async () => {
    db.collection("numbers").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setInputs(docs);
    });
  };

  const getInputCharacters = async () => {
    db.collection("characters").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setInputCharacters(docs);
    });
  };

  const getInputTexts = async () => {
    db.collection("text").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setInputTexts(docs);
    });
  };

  useEffect(() => {
    getInputNumbers();
    getInputCharacters();
    getInputTexts();
  }, []);

  const findSpecialChart = (str) => {
    var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç,.:;'/'?][{}=+",
      to = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
      mapping = {};

    for (var q = 0, w = from.length; q < w; q++) {
      mapping[from.charAt(q)] = to.charAt(q);
    }

    var ret = [];
    for (var i = 0, j = str.length; i < j; i++) {
      var c = str.charAt(i);
      if (mapping.hasOwnProperty(str.charAt(i))) ret.push(mapping[c]);
      else ret.push(c);
    }
    return ret.join("");
  };

  const findChart = (str) => {
    var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç,.:;'/'?][{}=+",
      to = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
      mapping = {};

    for (var q = 0, w = from.length; q < w; q++) {
      mapping[from.charAt(q)] = to.charAt(q);
    }

    var ret = [];
    var char = [];
    for (var i = 0, j = str.length; i < j; i++) {
      var c = str.charAt(i);
      if (mapping.hasOwnProperty(str.charAt(i))) char.push(c);
      // ret.push(mapping[c]);
      else ret.push(c);
    }
    return char.join("");
  };

  const addTask = async (inputObject) => {
    var input = inputObject.input;
    var firstInput = input.charAt(0);
    var lastChar = input[input.length - 1];
    var specialChar = findSpecialChart(input);
    var number = parseInt(input);
    var objectInput = {
      text: input,
      firstCharInput: firstInput,
      lastCharInput: lastChar,
    };
    var tableCharacter = {
      character: findChart(input),
    };
    var numbers = {
      number: number,
    };

    // eslint-disable-next-line eqeqeq
    if (number == input) {
      await db.collection("numbers").doc().set(numbers);
    } else if (specialChar === input) {
      await db.collection("text").doc().set(objectInput);
    } else {
      await db.collection("characters").doc().set(tableCharacter);
    }
  };

  return (
    <div className="container p-4">
      <div className="row">
        <InputForm addTask={addTask} />
      </div>
      <div className="row">
        <div className="col-md-4">
          <h2>Numbers</h2>
          {inputs.map((input) => (
            <div key={input.id} className="card mb-1">
              <div className="card-body">
                <h4>Number: {input.number}</h4>
              </div>
            </div>
          ))}
        </div>
        <div className="col-md-4">
          <h2>Characters</h2>
          {inputCharacters.map((input) => (
            <div key={input.id} className="card mb-1">
              <div className="card-body">
                <h4>Special character {input.character}</h4>
              </div>
            </div>
          ))}
        </div>
        <div className="col-md-4">
          <h2>Texts</h2>
          {inputTexts.map((input) => (
            <div key={input.id} className="card mb-1">
              <div className="card-body">
                <h5>Text: {input.text}</h5>
                <p>First character: {input.firstCharInput}</p>
                <p>Last character: {input.lastCharInput}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;

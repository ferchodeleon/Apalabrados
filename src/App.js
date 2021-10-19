import "./App.css";
import { LinkForm } from "./components/InputForm";
import { db } from "./firebase-config";

const App = () => {
  const findSpecialChart = (str) => {
    var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç",
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
    var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç",
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
    var objectInput = {
      input: input,
      firstCharInput: firstInput,
      lastCharInput: lastChar,
    };
    var a = findSpecialChart(input);
    console.log("findChar", findChart(input));
    console.log("findSpecialChar: ", input == a);
    // await db.collection("inputs").doc().set(objectInput);
    console.log("Objeto: ", objectInput);
    console.log("Primer caracter", firstInput);
    console.log("Ultimo caracter", lastChar);
    console.log("New input added");
  };

  return (
    <div className="container p-4">
      <div className="row">
        <LinkForm addTask={addTask} />
      </div>
      <div>
        <p>El texto es:</p>
        <p></p>
      </div>
    </div>
  );
};

export default App;

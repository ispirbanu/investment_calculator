import { useState } from "react";
import classes from "./UserInput.module.css";

//programdaki default değerler
const initialUserInput = {
  "current-savings": 10000,
  "yearly-contribution": 1200,
  "expected-return": 7,
  duration: 10,
};

const UserInput = (props) => {
  const [userInput, setUserInput] = useState(initialUserInput);
  const submitHandler = (event) => {
    event.preventDefault(); // sayfanın yeniden yüklenmesine engel olmak için yani Js kodu çalışmaya devam eder.

    // ResultTable da verilerin gösterilmesi için öncesinde hesaplanması gerek.
    // App.js içerisindeki calculateHandler fonk için işyeyici ayarlaması yapılır.
    // App.js içerisinde <UserInput onCalculate={calculateHandler}></UserInput> olarak ayarlanır.
    props.onCalculate(userInput);
  };

  //Değerleri varsayılan olarak ayarlanan değerlere sıfırlama
  const resetHandler = () => {
    setUserInput(initialUserInput);
  };

  //Kullanıcı tarafından girilen değerlerle güncelleme işlemi
  const inputChangeHandler = (input, value) => {
    // Değr güncellendiğinde son değeri almak için kullanılan yöntemdir. (spread operator)
    setUserInput((prevInput) => {
      return {
        ...prevInput,
        [input]: +value, //dinamik olarak input özelliğini ayarlanması (input olarak belirtilen aslında
        // "current-savings","yearly-contribution","expected-return", duration özellikleridir)
      };
    });
  };

  return (
    //form ekranı..
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes["input-group"]}>
        <p>
          <label htmlFor="current-savings">Current Savings ($)</label>
          <input
            onChange={(event) =>
              inputChangeHandler("current-savings", event.target.value)
            }
            value={userInput["current-savings"]}
            type="number"
            id="current-savings"
          />
        </p>
        <p>
          <label htmlFor="yearly-contribution">Yearly Savings ($)</label>
          <input
            onChange={(event) =>
              inputChangeHandler("yearly-contribution", event.target.value)
            }
            value={userInput["yearly-contribution"]}
            type="number"
            id="yearly-contribution"
          />
        </p>
      </div>
      <div className={classes["input-group"]}>
        <p>
          <label htmlFor="expected-return">
            Expected Interest (%, per year)
          </label>
          <input
            onChange={(event) =>
              inputChangeHandler("expected-return", event.target.value)
            }
            value={userInput["expected-return"]}
            type="number"
            id="expected-return"
          />
        </p>
        <p>
          <label htmlFor="duration">Investment Duration (years)</label>
          <input
            onChange={(event) =>
              inputChangeHandler("duration", event.target.value)
            }
            value={userInput["duration"]}
            type="number"
            id="duration"
          />
        </p>
      </div>
      <p className={classes.actions}>
        <button
          onClick={resetHandler}
          type="reset"
          className={classes.buttonAlt}
        >
          Reset
        </button>
        {/* submit butonu */}
        <button type="submit" className={classes.button}>
          Calculate
        </button>
      </p>
    </form>
  );
};
export default UserInput;

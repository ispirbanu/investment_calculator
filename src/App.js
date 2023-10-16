import { useState } from "react";
import Header from "./components/Header/Header";
import ResulsTable from "./components/ResultsTable/ResultsTable";
import UserInput from "./components/UserInput/UserInput";

function App() {
  const [userInput, setUserInput] = useState(null);

  const calculateHandler = (userInput) => {
    setUserInput(userInput);
  };

  // App içerisinde hesaplama kodu eklenirse kodu her zaman yeniden çalıştırıyor olacağız.
  // her kullanıcı girdisi alındığında bileşen işlevi tekrar yürütecek ve böylece giriş durumuna bağlı olarak türetilmiş yol olacak.

  const yearlyData = []; // yıllık sonuçlar

  // kullanıcı girişi boş değilse bu hesaplamaları yapmak için if bloğu kullanıldı.
  if (userInput) {
    let currentSavings = +userInput["current-savings"];
    const yearlyContribution = +userInput["yearly-contribution"];
    const expectedReturn = +userInput["expected-return"] / 100;
    const duration = +userInput["duration"];

    // Aşağıdaki kod yıllık sonuçları (toplam tasarruf, faiz vb.) hesaplar.
    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;
      yearlyData.push({
        year: i + 1,
        yearlyInterest: yearlyInterest,
        savingsEndOfYear: currentSavings,
        yearlyContribution: yearlyContribution,
      });
    }
  }

  // setResults(yearlyData); // sonuçları state olarak saklamak
  return (
    <div>
      <Header></Header>

      <UserInput onCalculate={calculateHandler}></UserInput>

      {/* Todo: Show below table conditionally (only once result data is available) */}
      {/* Show fallback text if no data is available */}
      <ResulsTable></ResulsTable>
    </div>
  );
}

export default App;

import classes from "./ResultsTable.module.css";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const ResulsTable = (props) => {
  return (
    // hesaplancak tablo değerleri
    <table className={classes.result}>
      <thead>
        <tr>
          <th>Year</th>
          <th>Total Savings</th>
          <th>Interest (Year)</th>
          <th>Total Interest</th>
          <th>Invested Capital</th>
        </tr>
      </thead>
      <tbody>
        {props.data.map((yearData) => (
          // her veri için benzersiz bir anahtar olmalı balşangıçta geçiçi olarak yearData.year kullanıldı.
          <tr key={yearData.year}>
            <td>{yearData.year}</td>
            <td>{formatter.format(yearData.savingsEndOfYear)}</td>
            <td>{formatter.format(yearData.yearlyInterest)}</td>
            {/* aşağıdaki kod bloğu toplam faiz hesabı için çalışır.
            yıl sonundaki tasarruflar, eski ilk yatırım (props.initialInvetment), yıllık katkı ve yıl verileri kullanılır. 
            eski ilk yatırım verisi kullanıcıdan gelecek current-savings verisidir. Bu da ayrıca app.js içerisinden alınır.*/}
            <td>
              {formatter.format(
                yearData.savingsEndOfYear -
                  props.initialInvetment -
                  yearData.yearlyContribution * yearData.year
              )}
            </td>
            {/* aşağıdaki kod bloğu toplam yatırım yapılan sermayeyi hesaplar. */}
            <td>
              {formatter.format(
                props.initialInvetment +
                  yearData.yearlyContribution * yearData.year
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default ResulsTable;

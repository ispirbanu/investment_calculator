# Investment-Calculator

Bu uygulamayla gireceğimiz bazı veriler üzerinden bir yatırım hesaplaması yapılıyor.

Varsayılan bazı değerler ayarlanıyor ve bunu sıfırlama ve hesaplama seçenekleri mevcut. Bu veriler istenilen şekilde güncellenebilir.

Uygulamanın arayüzü; 

![image](https://github.com/ispirbanu/investment_calculator/assets/45195137/3f675417-feb6-423d-9136-016163bc2053)


Mavcut tasarruflar, her yıl eklenen miktar, beklenen yıllık faiz, yatırım süresi gibi değerler girildikten sonra bize tablo olarak hesaplama sonuçlarını yıldan yıla gösterecek bir uygulamadır.

![image](https://github.com/ispirbanu/investment_calculator/assets/45195137/1dfa14ed-bf6c-4df5-a74d-e5eade4c162b)


Uygulama boyunca yapılan bazı olaylar ve notlar aşağıdadır. Bu uygulama udemy üzerinde **[Maximilian Schwarzmüller](https://www.udemy.com/user/maximilian-schwarzmuller/)** oluşturduğu bir eğitim üzerindendir. 

### Componentleri oluşturmak

Bu uygulamada da ilk olarak yapılan programı parçalara ayırarak componentler oluşturmak.

Başlık, tablo ve form gibi büyük bileşenleri componentlere ayıralım.

### Event Handler

hesaplanan verileri State üzeride tutmak;

```jsx
function App() {
  const [results, setResults] = useState(null);
  const calculateHandler = (userInput) => {
    const yearlyData = []; // yıllık sonuçlar

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
    setResults(yearlyData); // sonuçları state olarak saklamak 
  };
```

Diğer yöntem ise state üzerinde tutmaz.

App içerisine eklenirse kodu her zaman yeniden çalıştırıyor olacağız.
Her kullanıcı girdisi alındığında bileşen işlevi tekrar yürütecek ve böylece giriş durumuna bağlı olarak türetilmiş yol olacak.

```jsx
function App() {
  const [userInput, setUserInput] = useState(null);

  const calculateHandler = (userInput) => {
    setUserInput(userInput);
  };

  // App içerisine eklenirse kodu her zaman yeniden çalıştırıyor olacağız.
  // her kullanıcı girdisi alındığında bileşen işlevi tekrar yürütecek ve böylece giriş durumuna bağlı olarak türetilmiş yol olacak.
  const yearlyData = []; // yıllık sonuçlar
	

// if kullanılma nedeni, kullanıcı girişinin doğru olup olmadığı kontrol edildikten sonra bu işleme geçmesi için
//kullanıcı girişi boş değilse bu hesaplamalar yapılır.
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
```

### Verileri hesaplama

Bütün verilerin sonucunda hesaplanan yearlyData verisini ResyltsTable componentine iletiriz.

```jsx
{/* giriş varsa veya yoksa ekranda gösterilecek durumlardır.
hesaplanacak olan değerler yearlydata results table componentine gönderilir.*/}
      {!userInput && <p> No investment calculated yet.</p>}
      {userInput && (
        <ResulsTable
          data={yearlyData}
          initialInvetment={userInput["current-savings"]}
        ></ResulsTable>
      )}
```

```jsx
//ResultsTable
const ResulsTable = (props) => {
  return (
    <table className="result">
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
          <tr>
            <td>{yearData.year}</td>
            <td>{yearData.savingsEndOfYear}</td>
            <td>{yearData.yearlyInterest}</td>
            {/* aşağıdaki kod bloğu toplam faiz hesabı için çalışır.
            yıl sonundaki tasarruflar, eski ilk yatırım (props.initialInvetment), yıllık katkı ve yıl verileri kullanılır. 
            eski ilk yatırım verisi kullanıcıdan gelecek current-savings verisidir. Bu da ayrıca app.js içerisinden alınır.*/}
            <td>
              {yearData.savingsEndOfYear -
                props.initialInvetment -
                yearData.yearlyContribution * yearData.year}
            </td>
            {/* aşağıdaki kod bloğu toplam yatırım yapılan sermayeyi hesaplar. */}
            <td>
              {props.initialInvetment +
                yearData.yearlyContribution * yearData.year}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default ResulsTable;
```

Varsayılan verileri ile hesaplama sonucu tablo;

![image](https://github.com/ispirbanu/investment_calculator/assets/45195137/1c80d29d-e807-4d88-b3af-2bf6aef143d4)


### Verileri biçimlendirmek

yerleşik bir JS özelliği kullanılabilir.

Intl.NumberFormat yapıcısı Js içerisindeki nesnedir. Bu yapı sayıları biçimlendirmeye yarar. Bazı biçimlendirme formatları vardır ve bunlardan biri de para birimi ‘currency’dir.

```jsx
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
```

Bu özellik daha sonra yearData verilerinde kullanılır.

ÖR;

```jsx
<td>{formatter.format(yearData.savingsEndOfYear)}</td>
<td>{formatter.format(yearData.yearlyInterest)}</td>
{/* aşağıdaki kod bloğu toplam faiz hesabı için çalışır.
yıl sonundaki tasarruflar, eski ilk yatırım (props.initialInvetment), yıllık katkı ve yıl verileri kullanılır. 
eski ilk yatırım verisi kullanıcıdan gelecek current-savings verisidir. Bu da ayrıca app.js içerisinden alınır.*/}
<td>
{formatter.format(yearData.savingsEndOfYear -
props.initialInvetment -
yearData.yearlyContribution * yearData.year)}
</td>
```

Bu düzenleme sonrasında veriler daha güzel bir düzene sahip olur.

![image](https://github.com/ispirbanu/investment_calculator/assets/45195137/d17be9e4-4962-49de-acb8-ddabb539878c)


### Styling modules

basit olarak eklenen bazı elemanların style özelliklerini component içerisinde yapmak;

ör: bir veri hesaplanmadığında gösterilen yazıya bazı style özellikleri eklenebilir.

ancak daha yönetilebilir CSS dosyaları için, her component dosyasına bir module.css dosyası eklemektir. 

Her elemanın css özellikleri o dosyaya taşınır. 

 css module kullanımı için oluşturulan dosyada isim .module.css olmalıdır.

bu dosya import edilirken classes gibi bir isim kullanılmalıdır. Ardından çağırılacağı yerde bu isimle çağırılır.

Eski hali;

```jsx
import logo from "../../assets/investment-calculator-logo.png";
const Header = () => {
  return (
    <header className="header">
      <img src={logo} alt="logo" />
      <h1>Investment Calculator</h1>
    </header>
  );
};

export default Header;
```

css module ile kullanım; (.header ifadesi css dosyasındaki sınıf ismine göredir.) 

```jsx
import logo from "../../assets/investment-calculator-logo.png";
import classes from ".Header.module.css";

const Header = () => {
  return (
    <header className={classes.header}>
      <img src={logo} alt="logo" />
      <h1>Investment Calculator</h1>
    </header>
  );
};

export default Header;
```

```jsx
//userınput
import classes from "./UserInput.module.css";
<form onSubmit={submitHandler} className={classes.form}>
<div className={classes["input-group"]}>
.
.
<p className={classes.actions}>
.
.
<button type="submit" className={classes.button}>
```

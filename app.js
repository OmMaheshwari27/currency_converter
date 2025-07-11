const BASE_URL =
    "https://latest.currency-api.pages.dev/v1/currencies/usd.json";

const dropdown = document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg")



for (let select of dropdown) {
    for (let currency_code in countryList) {
       let newoption=document.createElement("option");
       newoption.innerText=currency_code;
       newoption.value=currency_code;
       if(select.name==="from" && currency_code==="USD"){
           newoption.selected="selected";
        }
       else if(select.name==="to" && currency_code==="INR"){
           newoption.selected="selected";
        }
        select.append(newoption);
    }
    select.addEventListener("change",(eve)=>{
        updateflag(eve.target);
    });
}

const updateflag = (element) => {
  const currcode = element.value;
  const countrycode = countryList[currcode];
  const img = element.parentElement.querySelector("img");
  img.src = `https://flagsapi.com/${countrycode}/flat/64.png`;
};

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amt = amount.value;
    if (amt === "" || amt < 1) {
        amt = 1;
        amount.value = "1";
    }

    const url = `https://latest.currency-api.pages.dev/v1/currencies/${fromCurr.value.toLowerCase()}.json`;

    try {
        let res = await fetch(url);
        let data = await res.json();
        let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
        let finalamt = (amt * rate).toFixed(2);
        msg.innerText = `${amt} ${fromCurr.value} = ${finalamt} ${toCurr.value}`;
    } catch (error) {
        msg.innerText = "Failed to fetch exchange rate ❌";
        console.error(error);
    }
};


btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});

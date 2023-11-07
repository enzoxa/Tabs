function getRateAlfaBank(sValCode, classCode) {
  const xhr = new XMLHttpRequest();
  let rateText = document.querySelector(classCode);
  xhr.open('GET', 'https://alfabank.ru/ext-json/0.2/exchange/cash/?offset=0&limit=1');
  xhr.onload = function () {
    if (xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      const buyCost = response.response.data[sValCode].filter(value => value["type"] == 'buy')[0].value;
      const sellCost = response.response.data[sValCode].filter(value => value["type"] == 'sell')[0].value;
      console.log("Покупка: " + buyCost + " Продажа: " + sellCost);
      rateText.innerHTML = "Покупка: " + buyCost + " Продажа: " + sellCost;
    } else {
      console.error('Ошибка запроса: ' + xhr.status);
    }
  };
  xhr.send();
}

getRateAlfaBank('usd', '.api_container--rate');

function Container() {
  this.id = "";
  this.className = "";
  this.htmlCode = "";
}

Container.prototype.render = function() {
  return this.htmlCode;
}

function Basket() {
  Container.call(this);
  // Инициализация свойств корзины
  this.id = "basket";
  this.countGoods = 0;
  this.amount = 0;
  this.basketItems = [];
}

Basket.prototype = Object.create(Container.prototype);
Basket.prototype.constructor = Basket;

// Отрисовка корзины
Basket.prototype.render = function(wrapper) {
  var basketDiv = $('<div/>', {
    id: this.id,
    text: 'Корзина'
  });
  basketDiv.appendTo(wrapper);
  this.getBasketItems();
}

// Получение корзины с сервера
Basket.prototype.getBasketItems = function() {
  $.ajax({
    url: 'basket.content.json',
    // свойство для изменения this внутри метода success
    context: this,
    dataType: 'json',
    success: function(answer) {
      if (answer.result == 1) {
        //console.log("it's good");
        this.countGoods = answer.basket.length;
        this.amount = answer.amount;
        this.basketItems = answer.basket;
        var basketData = $('<div/>', {
          id: 'basket_data'
        });
        var basketWrapper = $('#basket_wrapper');
        basketData.appendTo(basketWrapper);
        basketData.append('<p>Товаров в корзине: ' + this.countGoods + '</p>');
        basketData.append('<p>Общая стоимость: ' + this.amount + '</p>');

      } else {
        console.log('Пшл отсд');
      }


    }
  })
}

// Метод добавления товара в корзину
Basket.prototype.add = function(id, quantity, price) {
  // TODO: Написать добавление с помощью ajax (см спецификацию в методичке)
     // Инициализация свойств товаров
  this.countGoods += quantity;
  this.amount += price;
  this.basketItems.push({
    id_product: id,
    price: price
  });
  this.refresh();
}

// Перерисовка корзины после добавления
Basket.prototype.refresh = function() {
  // TODO: Переписать перерисовку с помощью ajax
  var basketData = $('#basket_data');
  basketData.empty();
  basketData.append('<p>Товаров в корзине: ' + this.countGoods + '</p>');
  basketData.append('<p>Общая стоимость: ' + this.amount + '</p>');

}

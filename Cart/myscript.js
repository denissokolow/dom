$.event.addProp('dataTransfer');
var count = 0;
var budget = 0;
var haveMoney = 0;
var cost = 0;
var price = 0;
$(() =>{
 $.get('https://kodaktor.ru/cart_data.json', (data) => {
        Object.keys(data).forEach((key, i) => {
                        $('.wrapper').append(`
                          <div class="product cover" id="ite${i}"  draggable="true" >
                          <img src="${key}.png" draggable="false">
                          <div class = "cover-txt" id = "name">  ${key} </div>
                          <div class = "cover-txt" id = "price"> ${data[key]}$</div>
                          </div>`);
                        $('inbox-basket').text(`${count}`);
                        budget = $('#budg-start').val();
                        haveMoney = budget;
                        console.log(`при загрузке ${haveMoney} , ${budget}`);
                        });

  $('.product').on('dragstart', (event) => {
                console.log(event.target.id);
                event.dataTransfer.setData('text/plain', event.target.id);
              });

  $('.basket').on('dragover', e => e.preventDefault());
//событие на дроп
  $('.basket').on('drop', (event) => {
             const id = event.dataTransfer.getData('text/plain');
             const price = $(`#${id} #price`).text();
             cost = parseInt(price.match(/\d+/));
             dropDrop(id);
             });
//добавляем товар в корзину
  function dropDrop(id){
                  if (haveMoney >= cost){
                      count+=1;
                      const i = id[3];
                      const name = $(`#${id} #name`).text();
                      price = $(`#${id} #price`).text();
                      haveMoney = haveMoney - parseInt(price.match(/\d+/));
                      price = parseInt(price.match(/\d+/));
                      const foto = $('#' + id + ' img').attr('src');
                      console.log(`при дропе ${haveMoney} , ${budget}`);
                      $('.basket').append(`
                       <div class="product-in-basket cover" id="ite${i}" draggable="false">
                        <div class="del-prod"> X </div>
                        <img src= "${foto}" draggable="false">
                        <div class = "cover-txt"> ${name} </div>
                        <div class = "cover-txt"> ${price} $ </div>
                       </div>`);
                       $('#count-in-basket').text(`${count}`);
                       $('#budg-start').val(haveMoney);
                      }
                 else{
                      $('.budget-basket').css({'background-color' : '#FF0000'});
                      setTimeout(() => {$('.budget-basket').css({'background-color' : '#ECDE7F'});}, 2000);
                     }
                      }

//очистка корзины
  $('.clear-basket').on('click', function(){
                      document.querySelectorAll('.product-in-basket').forEach(e => e.parentNode.removeChild(e));
                      count = 0;
                      $('#count-in-basket').text(`${count}`);
                      $('#budg-start').val(budget);
                      haveMoney = $('#budg-start').val();
                      });

//удаление товара из корзины
  $('body').on('click', '.del-prod', function(){
                       price = $(this).closest('[id ^= ite]').text();
                       haveMoney = haveMoney + parseInt(price.match(/\d+/));
                       $(this).closest('.product-in-basket').remove();
                       count-=1;
                       $('#count-in-basket').text(`${count}`);
                       $('#budg-start').val(haveMoney);
                      });

//изменение бюджета
 $('#budg-start').change(function() {
                      haveMoney = $('#budg-start').val();
                      budget = $('#budg-start').val();
                      });

 });//get
});//async

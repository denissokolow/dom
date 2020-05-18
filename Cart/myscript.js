$.event.addProp('dataTransfer');
var count = 0;
var budget = 0;
var haveMoney = 0;
var cost = 0;
$(() =>{
 $.get('https://kodaktor.ru/cart_data.json', (data) => {
        Object.keys(data).forEach((key, i) => {
                        $('.wrapper').append(`
                          <div class="product cover" id="ite${i}"  draggable="true" >
                          <img src="${key}.png" draggable="false">
                          <div class = "cover-txt" id = "name"> Товар ${key} </div>
                          <div class = "cover-txt" id = "price"> Цена ${data[key]} </div>
                          </div>`);
                        $('inbox-basket').text(`${count}`);
                        // добавить на кейдаун получение значения бюджета
                        budget = $('#budg-start').attr('value');
                        haveMoney = budget;

       });
  $('.product').on('dragstart', (event) => {
                console.log(event.target.id);
                event.dataTransfer.setData('text/plain', event.target.id);
              });

  $('.basket').on('dragover', e => e.preventDefault());
  $('.basket').on('drop', (event) => {
             const id = event.dataTransfer.getData('text/plain');
             const price = $(`#${id} #price`).text();
             cost = parseInt(price.match(/\d+/));
             dropDrop(id, cost);
             });
  function dropDrop(id){
                  if (haveMoney >= cost){
                      count+=1;
                      const i = id[3];
                      const name = $(`#${id} #name`).text();
                      const price = $(`#${id} #price`).text();
                      const foto = $('#' + id + ' img').attr('src');
                      haveMoney = haveMoney - parseInt(price.match(/\d+/));
                      console.log(haveMoney, budget);
                      $('.basket').append(`
                       <div class="product-in-basket cover" id="ite${i}" draggable="true">
                        <div class="del-prod"> X </div>
                        <img src= "${foto}" draggable="false">
                        <div class = "cover-txt"> ${name} </div>
                        <div class = "cover-txt"> ${price} </div>
                       </div>`);
                       $('#count-in-basket').text(`${count}`);
                       $('#budg-start').val(haveMoney);

                     }}


  $('.clear-basket').on('click', function(){
                      document.querySelectorAll('.product-in-basket').forEach(e => e.parentNode.removeChild(e));
                      count = 0;
                      $('#count-in-basket').text(`${count}`);
                      $('#budg-start').val(500);
                      haveMoney = 500;
                       });

  $('body').on('click', '.del-prod', function(){
                       $(this).closest('.product-in-basket').remove();
                       count-=1;
                       $('#count-in-basket').text(`${count}`);
                       // добавить функцю увеличения haveMoney
                       $('#budg-start').val(500);
                                       });



//${data[key]}  ${key}
 });//get
});//async

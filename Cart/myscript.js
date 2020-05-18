$.event.addProp('dataTransfer');
$(() =>{
 $.get('https://kodaktor.ru/cart_data.json', (data) => {
        Object.keys(data).forEach((key, i) => {
                        $('.wrapper').append(`
                          <div class="product cover" id="ite${i}"  draggable="true" >
                          <img src="${key}.png" draggable="false">
                          <div class = "cover-txt" id = "name"> Товар ${key} </div>
                          <div class = "cover-txt" id = "price"> Цена ${data[key]} </div>
                          </div>`);

       });
$('.product').on('dragstart', (event) => {
                console.log(event.target.id);
                event.dataTransfer.setData('text/plain', event.target.id);
              });

$('.basket').on('dragover', e => e.preventDefault());
$('.basket').on('drop', (event) => {
             const id = event.dataTransfer.getData('text/plain');
             dropDrop(id);
             });
function dropDrop(id){
                      const count = 0;
                      const i = id[3];
                      const name = $(`#${id} #name`).text();
                      const price = $(`#${id} #price`).text();
                      const foto = $('#' + id + ' img').attr('src');
                      $('.basket').append(`
                       <div class="product-in-basket cover" id="ite${i}" draggable="true">
                        <img src= "${foto}" draggable="false">
                        <div class = "cover-txt"> ${name} </div>
                        <div class = "cover-txt"> ${price} </div>
                       </div>`);
                     }
function delProd(){

}


$('.clear-basket').on('click', function(){
                         $('.basket .content').empty()});


//${data[key]}  ${key}
 });//get
});//async

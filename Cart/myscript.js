$.event.addProp('dataTransfer');
$(() =>{
 $.get('https://kodaktor.ru/cart_data.json', (data) => {
        Object.keys(data).forEach((key, i) => {
                        $('.wrapper').append(`
                          <div class="product cover" id="ite${i}" draggable="true" >
                           <img src="${key}.png" draggable="false">
                           <div class = "cover-txt"> Товар ${key} <br> Цена ${data[key]} </div>
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
         const i = id[3];
         $('.basket').append(`
            <div class="product" id="ite${i}" draggable="true"></div>`);

};

//${data[key]}  ${key}
 });//get
});//async

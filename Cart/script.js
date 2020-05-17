(async e =>{
 $.get('https://kodaktor.ru/cart_data.json', (data) => {
        Object.keys(data).forEach((key, i) => {
                        $('.wrapper').append(`<div class="product" id="ite${i}" draggable="true">${data[key]}  ${key}</div>`);

       })
 var ist = document.querySelectorAll('div[id^="ite"]');//ist = NodeList of ite
 var pri = document.querySelector('.basket');
 //Навешиваем функции на события элементов .product
 [].forEach.call(ist, function(elem){
                      elem.addEventListener('dragstart', dragStart);

              });
 //Навешиваем функции на события приемника .basket
 pri.addEventListener('dragover', e => e.preventDefault());
 pri.addEventListener('drop', dragDrop);

 //Функция dragStart
 function dragStart(event){
          event.dataTransfer.setData('text', event.target.getAttribute('id'));
          //event.dataTransfer.setData("text", event.target.id);
          console.log(event.target.id);


          }
 //Функция dragDrop
 function dragDrop(event){
          var data = event.dataTransfer.getData("text");
          console.log(data);
          this.appendChild(document.getElementById(data));

          }



 });//get
})();//async

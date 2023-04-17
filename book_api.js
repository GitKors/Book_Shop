let currentBooks = []
let container = document.querySelector('.cards');
let loadIndex = 0
let currentCategory = 'Architecture'
function getData(subjectName) {
        
        axios.get(`https://www.googleapis.com/books/v1/volumes?q="subject:${subjectName}"&key=AIzaSyDbbM8_tK8pqO0hytMq7qbnl7PwD8vh3S0&printType=books&startIndex=${loadIndex}&maxResults=6&langRestrict=en`)
        .then(response => {
        loadIndex = loadIndex +6
         const result = response.data;
         result.items.forEach(i => {drowCard(i);currentBooks.push(i);})
            console.log(currentBooks)
       
        })
        .catch(error => console.error(error));


}

function cart(event){
    let basketValue = document.querySelector('.count-basket')
    let books = localStorage.getItem('books')
    if(books){
        let parsed = JSON.parse(books)
        if(parsed.find(b =>b.selfLink == event.currentTarget.id)){
            parsed = parsed.filter(b =>b.selfLink != event.currentTarget.id)
            localStorage.setItem('books',JSON.stringify(parsed))
            event.currentTarget.classList.remove('in-cart')
            event.currentTarget.classList.add('buy-button')
            event.currentTarget.innerHTML = 'BUY NOW'
            basketValue.innerHTML = Number(basketValue.innerHTML) -1
            return

        }
        parsed.push(currentBooks.find(b =>b.selfLink == event.currentTarget.id))
        basketValue.innerHTML = Number(basketValue.innerHTML) +1



        localStorage.setItem('books',JSON.stringify(parsed))

    }
    else{        
        let result = []
        result.push(currentBooks.find(b =>b.selfLink == event.currentTarget.id))
        result = JSON.stringify(result)
        basketValue.innerHTML = Number(basketValue.innerHTML) +1
        localStorage.setItem("books",result)

        }
        event.currentTarget.classList.remove('buy-button')
        event.currentTarget.classList.add('in-cart')
        event.currentTarget.innerHTML = 'IN THE CART'
}



function drowCard(book){

    let bookId = book.selfLink
    console.log(typeof bookId)
    let template = `<div class="card">
                        <div class="card-image">
                            <img src="${getBookImage(book)}" class="pic_wrapp" alt="cover">
                        </div>
                        <div class="card-item">
                            <p class="autors">${writeAutor(book)}</p> 
                            <p class="title-card">${book.volumeInfo.title}</p> 
                            <div class="average-raitng">${averageRating(book)}</div> 
                            <p class="raitng">${getRaiting(book)}</p>
                            <p class="item-card">${writeDescription(book)}</p>
                            <p class="price-card">${countPrice(book)}</p> 
                            ${drowButton(book,bookId)}
                        </div>
                    </div>`

    container.innerHTML = container.innerHTML + template

}


const list = document.getElementById('category-list').children

function listenCategories(){
for (let i = 0, len = list.length; i < len; i++) {
    list[i].addEventListener("click",e => getBooks(e,list[i].innerHTML));
}

}
listenCategories()


getData("Architecture")
list[0].style.fontWeight = 'bold'

function drowButton(book,bookId){
    let books = JSON.parse(localStorage.getItem('books'))
    console.log(books)

    
    if(books != null){
        if(books.find(b =>b.selfLink == book.selfLink)){
        return `<button class="in-cart"  id="${bookId}" onclick="cart(event)">in the cart</button>`
    }
    else{
        return `<button class="buy-button"  id="${bookId}" onclick="cart(event)">by now</button>`
    }

    }
    else{
        return `<button class="buy-button"  id="${bookId}" onclick="cart(event)">by now</button>`
    }

}






function getBooks(e,x){
    currentCategory = x
    container.innerHTML = ''
    for (let i = 0, len = list.length; i < len; i++) {
        list[i].style.fontWeight = 'normal'
    }
    e.target.style.fontWeight = "bold";
//    return function(){getData(x)} 
    return getData(x)
}

function countPrice(book){

    if(book.saleInfo.saleability == "FOR_SALE") {
        return book.saleInfo.listPrice.amount + ' RUB'
    }
    else{return ''}


}
function writeAutor(book){
    if(book.volumeInfo.authors){
    if(book.volumeInfo.authors.length > 0){
     return book.volumeInfo.authors.join(", ")


    }
    else {return book.volumeInfo.authors[0]}
} else{return ''}

}

function writeDescription(book){
if(book.volumeInfo.description)
{    
    if(book.volumeInfo.description.length < 100){
        return book.volumeInfo.description
   
   
       }
    else{
        return book.volumeInfo.description.slice(0, 100) + ' . . . '
    }}

       else{
        return ""
       }
}

function getBookImage(book) {
    if(book.volumeInfo.imageLinks?.thumbnail){

        return book.volumeInfo.imageLinks.thumbnail
    }
    else{
        return '/img/placeholder.png'
    }
    }

function averageRating(book) {
    let result = ''
    for (let i = 0; i < book.volumeInfo.averageRating; i++){
        result = result + '<img src="/img/star.svg"/>'
    }
        return result
    }

    function getRaiting(book) {
        if(book.volumeInfo?.ratingsCount){
    
            return book.volumeInfo.ratingsCount + "M review"
        }
        else{
            return ''
        }
        }



export {
    currentBooks,container,loadIndex,currentCategory,getData,cart,drowCard,list,listenCategories,drowButton,getBooks,countPrice,writeAutor,writeDescription,getBookImage,averageRating,getRaiting
}





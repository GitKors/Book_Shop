import{
    currentBooks,container,loadIndex,currentCategory,getData,cart,drowCard,list,listenCategories,drowButton,getBooks,countPrice,writeAutor,writeDescription,getBookImage,averageRating,getRaiting
}  from  './book_api.js'
import{
    sliderImages,sliderLine,sliderBtnNext,sliderBtnPrev,sliderCount,sliderWidth,showSlide,nextSlide,prevSlide,rollSlider,thisSlide,sliderDots
    
}  from '/index.js'

window.getData = getData
window.cart =cart
window.currentCategory = currentCategory 

listenCategories()


getData("Architecture")
list[0].style.fontWeight = 'bold'

// Адаптивность слайдера
window.addEventListener('resize', showSlide);

// Кнопки листания слайдов вперед и назад
sliderBtnNext.addEventListener('click', nextSlide);
sliderBtnPrev.addEventListener('click', prevSlide);

// Автоматическое перелистывание слайдов
setInterval(() => {
    nextSlide()
}, 5000);

showSlide();
listenDots();
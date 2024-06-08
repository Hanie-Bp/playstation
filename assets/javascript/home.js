document.addEventListener('DOMContentLoaded',()=> {
    const searchInput = document.querySelector('#search');
    const searchIcon = document.querySelector('.search-icon');

    searchIcon.addEventListener('click',()=> {
        console.log('hey');
        searchInput.focus();
    })

    searchInput.addEventListener('blur', ()=> {
        if (searchInput.value.trim() !== '') {
            searchInput.focus()
        }
    })
})
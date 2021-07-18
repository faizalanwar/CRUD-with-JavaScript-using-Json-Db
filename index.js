document.addEventListener('DOMContentLoaded', function () {

    const bookContainer = document.querySelector('#book-container')
    const status = document.getElementById('#status')

    const submit = document.getElementById('#submit')
    const bookURL = 'http://localhost:3000/tamu'
    // const bookURL = 'https://anww.herokuapp.com/tamu'

   
    const bookForm = document.querySelector('#book-form')
    let allBooks = []
    


    fetch(`${bookURL}`)
      .then(response => response.json())
      .then(bookData => bookData.forEach(function (book) {
        allBooks = bookData
        bookContainer.innerHTML += `
        <tr id="book-${book.id}">
        <td>${book.id}</td>
          <td>${book.title}</td>
          <td>Author: ${book.author}</td>
          <td><img src="${book.coverImage}" width="30px" height="50px"></td>
          <td>${book.description}</td>
          <td>         
          <button data-id="${book.id}" id="edit-${book.id}" data-action="edit" class="btn btn-success">Edit</button>
          <button data-id="${book.id}" id="delete-${book.id}" data-action="delete" class="btn btn-danger">Delete</button>
          </td>

        </tr>`
      })) // end of book fetch


    bookForm.addEventListener('submit', (e) => {
      e.preventDefault()
    
    
      console.log(e.target)

      const titleInput = bookForm.querySelector('#title').value
      const authorInput = bookForm.querySelector('#author').value
      const coverImageInput = bookForm.querySelector('#coverImage').value
      const descInput = bookForm.querySelector('#description').value

      fetch(`${bookURL}`, {
        method: 'POST',
        body: JSON.stringify({
          title: titleInput,
          author: authorInput,
          coverImage: coverImageInput,
          description: descInput
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => response.json())
        .then(book => {
          bookContainer.innerHTML += `
          <tr id="book-${book.id}">
          <td>${book.id}</td>
            <td>${book.title}</td>
            <td>Author: ${book.author}</td>
            <td><img src="${book.coverImage}" width="30px" height="50px"></td>
            <td>${book.description}</td>
            <td>         
            <button data-id="${book.id}" id="edit-${book.id}" data-action="edit">Edit</button>
            <button data-id="${book.id}" id="delete-${book.id}" data-action="delete">Delete</button>
            </td>
          </tr>`
        })
      
        
    })


    bookContainer.addEventListener('click', (e) => {
      if (e.target.dataset.action === 'edit') {
        const editButton = document.querySelector(`#edit-${e.target.dataset.id}`)
      editButton.disabled = true
      
      const bookData = allBooks.find((book) => {
        return book.id == e.target.dataset.id
      })
      e.target.parentElement.innerHTML += `
      <div id='edit-book'>
        <form id="book-form">
          <input required id="edit-title" placeholder="${bookData.title}">
          <input required id="edit-author" placeholder="${bookData.author}">
          <input required id="edit-coverImage" placeholder="${bookData.coverImage}">
          <input required id="edit-description" placeholder="${bookData.description}">
          <input type="submit" value="Edit Book">
      </div>`
      } else if (e.target.dataset.action === 'delete') {
        document.querySelector(`#book-${e.target.dataset.id}`).remove()
        
        fetch(`${bookURL}/${e.target.dataset.id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        }).then( response => response.json())
      }
    })



  //   editForm.addEventListener("submit", (e) => {
  //     event.preventDefault()
  //     const titleInput = document.querySelector("#edit-title").value
  //     const authorInput = document.querySelector("#edit-author").value
  //     const coverImageInput = document.querySelector("#edit-coverImage").value
  //     const descInput = document.querySelector("#edit-description").value
  //     const editedBook = document.querySelector(`#book-${bookData.id}`)
  //     fetch(`${bookURL}/${bookData.id}`, {
  //       method: 'PATCH',
  //       body: JSON.stringify({
  //         title: titleInput,
  //         author: authorInput,
  //         coverImage: coverImageInput,
  //         description: descInput
  //       }),
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     }).then( response => response.json() )
  //     .then( book => {
  //       editedBook.innerHTML = `
  //       <div id=book-${book.id}>
  //         <h2>${book.title}</h2>
  //         <h4>Author: ${book.author}</h4>
  //         <img src="${book.coverImage}" width="333" height="500">
  //         <p>${book.description}</p>
  //         <button data-id=${book.id} id="edit-${book.id}" data-action="edit">Edit</button>
  //         <button data-id=${book.id} id="delete-${book.id}" data-action="delete">Delete</button>
  //       </div>
  //       <div id=edit-book-${book.id}>
  //       </div>`
  //       editForm.innerHTML = ""
  //     })
  // }) // end of this event Listener for edit submit















}) // end of this event Listener for edit submit


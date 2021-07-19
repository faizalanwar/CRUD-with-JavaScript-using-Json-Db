document.addEventListener('DOMContentLoaded', function () {

  const bookContainer = document.querySelector('#book-container')

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




    const titleInput = bookForm.querySelector('#title').value
    const authorInput = bookForm.querySelector('#author').value
    const coverImageInput = bookForm.querySelector('#coverImage').value
    const descInput = bookForm.querySelector('#description').value
    bookForm.reset();
    document.getElementById("alert").outerHTML = `<div class="alert alert-success" id="alert" role="alert">
    Data ${titleInput} berhasil ditambah
  </div>`
    // console.log(e.target)
    window.setTimeout(function () {
      document.getElementById("alert").classList.add("none");
    }, 5000);

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
            <button data-id="${book.id}" id="edit-${book.id}" data-action="edit" class="btn btn-success">Edit</button>
            <button data-id="${book.id}" id="delete-${book.id}" data-action="delete" class="btn btn-danger">Delete</button>
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
        <form id="edit-form">
          <input required id="edit-title" placeholder="${bookData.title}">
          <input required id="edit-author" placeholder="${bookData.author}">
          <input required id="edit-coverImage" placeholder="${bookData.coverImage}">
          <input required id="edit-description" placeholder="${bookData.description}">
          <input type="submit" value="Edit Book">
      </div>`

      const editForm = document.querySelector('#edit-form')

      editForm.addEventListener("submit", (e) => {
        e.preventDefault()
        const titleInput = document.querySelector("#edit-title").value
        const authorInput = document.querySelector("#edit-author").value
        const coverImageInput = document.querySelector("#edit-coverImage").value
        const descInput = document.querySelector("#edit-description").value
        const editedBook = document.querySelector(`#book-${bookData.id}`)
        fetch(`${bookURL}/${bookData.id}`, {
          method: 'PATCH',
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
            editedBook.innerHTML = `
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

        </tr>
        <div id=edit-book-${book.id}>
        </div>`
            editForm.innerHTML = ""
          })
      }) // end of this event Listener for edit submit

    } else if (e.target.dataset.action === 'delete') {
      document.querySelector(`#book-${e.target.dataset.id}`).remove()

      fetch(`${bookURL}/${e.target.dataset.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => response.json())
    }
  })











}) // end of this event Listener for edit submit


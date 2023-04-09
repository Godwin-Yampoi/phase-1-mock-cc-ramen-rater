fetch('http://localhost:3000/ramens')
  .then(response => response.json())
  .then(data => {
    const ramenMenu = document.querySelector('#ramen-menu')
    data.forEach(ramen => {
      const img = document.createElement('img')
      img.src = ramen.image
      img.alt = ramen.name
      img.dataset.id = ramen.id
      ramenMenu.append(img)
    })
  })
  ramenMenu.addEventListener('click', event => {
    if (event.target.matches('img')) {
      const ramenId = event.target.dataset.id
      fetch(`http://localhost:3000/ramens/${ramenId}`)
        .then(response => response.json())
        .then(data => {
          const ramenDetail = document.querySelector('#ramen-detail')
          ramenDetail.innerHTML = `
            <img src="${data.image}" alt="${data.name}" />
            <h2>${data.name}</h2>
            <h3>${data.restaurant}</h3>
            <p class="rating">${data.rating}</p>
            <form id="ramen-rating">
              <label for="rating">Rating: </label>
              <input type="number" name="rating" id="rating" value="${data.rating}" />
              <label for="comment">Comment: </label>
              <textarea name="comment" id="comment">${data.comment}</textarea>
              <input type="submit" value="Update" />
            </form>
          `
        })
    }
  })
  ramenDetail.addEventListener('submit', event => {
    event.preventDefault()
    const ramenId = event.target.previousElementSibling.dataset.id
    const rating = event.target.rating.value
    const comment = event.target.comment.value
    
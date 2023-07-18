function fetchImg(searchValue, page) {
  return fetch(
    `https://pixabay.com/api/?q=${searchValue}&page=${page}&key=36079636-80c18f2b7171bd6af90a09a2e&image_type=photo&orientation=horizontal&per_page=12`
  ).then(res => res.json())
  
  
}

export default fetchImg;

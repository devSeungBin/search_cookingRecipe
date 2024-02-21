// 레시피 검색 결과 출력
const searchText = document.querySelector(".searchText");
const recipeResult = document.querySelector(".recipeResult");
const recipeResult_title = document.querySelector(".recipeResult_title");
const recipeResult_content = document.querySelector(".recipeResult_content");
  
function searchRecipe() {
    if (!recipeResult.classList.contains('active')) {
        recipeResult.classList.add('active')
    }
    recipeResult_title.innerHTML = `- "${searchText.value}" 레시피 검색결과 -`
    render(page);
}


const contents = document.querySelector(".recipeResult_content .row")
const buttons = document.querySelector(".pagination")

// 사용할 변수 선언
const numOfContent = 200
const maxContent = 9
const maxButton = 5
const maxPage = Math.ceil(numOfContent / maxContent)
let page = 1

// 글 목록 생성 함수
const makeContent = (id) => {
    const food = searchText.value
    const content = document.createElement("div")
    content.classList.add("col")
    content.innerHTML = `
        <div class="card h-100">
            <img src="img/recipe.png" class="card-img-top" alt="요리 사진">
            <div class="card-body">
                <h5 class="card-title">${id}번째 ${food} 레시피</h5>
                <p class="card-text">레시피 저자, 쟤료, 별점...</p>
                <p class="card-text"><a href="#">바로가기 링크</a></p>
            </div>
            <div class="card-footer">
                <small class="text-muted">레시피 찜하기</small>
            </div>
        </div>
    `
    return content
}

// 버튼 생성 함수
const makeButton = (id) => {
    const button = document.createElement("li")
    button.classList.add("page-item")
    button.innerHTML = `
        <a class="page-link">${id}</a>
    `
    button.dataset.num = id
    button.addEventListener("click", (e) => {
        Array.prototype.forEach.call(buttons.children, (button) => {
            // if (button.dataset.num)
            button.classList.remove("active")
         })
        e.target.parentElement.classList.add("active")
        renderContent(parseInt(e.target.parentElement.dataset.num))
    })

    return button
}


// 글 렌더링 함수 구현
const renderContent = (page) => {
    // 목록 리스트 초기화
    while (contents.hasChildNodes()) {
        contents.removeChild(contents.lastChild);
    }
    // 글의 최대 개수 numOfContent를 넘지 않는 선에서, 화면에 최대 maxContent개의 글 생성
    for (let id = (page - 1) * maxContent + 1; id <= page * maxContent && id <= numOfContent; id++) {
        contents.appendChild(makeContent(id));
    }
}

// 페이지 이동 함수 구현
const goPrevPage = () => {
    page -= maxButton
    render(page)
}
  
const goNextPage = () => {
    page += maxButton
    render(page)
}

const prev = document.createElement("li")
prev.classList.add("page-item");
prev.innerHTML = '<a class="page-link">Previous</a>';
prev.addEventListener("click", goPrevPage);

const next = document.createElement("li")
next.classList.add("page-item");
next.innerHTML = '<a class="page-link">Next</a>';
next.addEventListener("click", goNextPage);

// 버튼 렌더링 함수 구현
const renderButton = (page) => {
    // 버튼 리스트 초기화
    while (buttons.hasChildNodes()) {
        buttons.removeChild(buttons.lastChild);
    }
    // 화면에 최대 maxButton개의 페이지 버튼 생성
    for (let id = page; id < page + maxButton && id <= maxPage; id++) {
        buttons.appendChild(makeButton(id))
    }
    // 첫 버튼 활성화 (class="active")
    buttons.children[0].classList.add("active")

    // 이전, 다음 페이지 버튼 생성
    buttons.prepend(prev)
    buttons.append(next)

    // 이전, 다음 페이지 버튼이 필요없다면 제거
    if (page - maxButton < 1) buttons.removeChild(prev);
    if (page + maxButton > maxPage) buttons.removeChild(next);
}

const render = (page) => {
    renderContent(page);
    renderButton(page);
};




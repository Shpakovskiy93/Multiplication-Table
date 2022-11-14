let counterRightAnswer = 0;
let difficultyLevel;
drawMainPage()



function drawMainPage() {
    counterRightAnswer = 0;

    const title = document.createElement('h1');
    title.classList.add('title');
    title.innerText = 'WELCOME';

    const showMultiplicationTableBtn = document.createElement('button');
    showMultiplicationTableBtn.classList.add('show__multiplicationTable-btn');
    showMultiplicationTableBtn.innerText = 'Таблица умножения';
    showMultiplicationTableBtn.addEventListener('click', showMultiplicationTable)

    const easyTestBtn = document.createElement('button');
    easyTestBtn.classList.add('easy__test-btn');
    easyTestBtn.innerText = 'Легкий уровень';
    easyTestBtn.setAttribute('data-level','easy');
    easyTestBtn.addEventListener('click', e => {
        difficultyLevel = e.target.getAttribute('data-level');
        drawEasyTest();
    });

    const normalTestBtn = document.createElement('button');
    normalTestBtn.classList.add('normal__test-btn');
    normalTestBtn.innerText = 'Средний уровень';
    normalTestBtn.setAttribute('data-level','normal');
    normalTestBtn.addEventListener('click', e => {
        difficultyLevel = e.target.getAttribute('data-level');
        drawEasyTest();
    });

    const wrapperLevelTestBtns = document.createElement('div');
    wrapperLevelTestBtns.classList.add('level__test-btns');
    wrapperLevelTestBtns.append(easyTestBtn, normalTestBtn)

    const wrapperMainPage = document.createElement('div');
    wrapperMainPage.classList.add('main__page');
    wrapperMainPage.append(title, showMultiplicationTableBtn, wrapperLevelTestBtns);


    document.querySelector('.multiplication__table').append(wrapperMainPage);
}

function drawEasyTest() {
    document.querySelector('.multiplication__table').innerHTML = '';
    
    let firstNumber;
    let secondNumber;
    let rightAnswer
    let answersArr = [];

    if(difficultyLevel == 'easy') {
        firstNumber = getRandomNumer(2, 9);
        secondNumber = getRandomNumer(2, 9);
        rightAnswer = firstNumber * secondNumber;
        answersArr = shuffleArray([rightAnswer, rightAnswer + 1, rightAnswer - 1, getRandomNumer(10, 100)]);
    } else if(difficultyLevel == 'normal') {
        firstNumber = getRandomNumer(2, 25);
        secondNumber = getRandomNumer(2, 25);
        rightAnswer = firstNumber * secondNumber;
        answersArr = shuffleArray([rightAnswer, rightAnswer + 1, getRandomNumer(50, 200), getRandomNumer(10, 100)]);
    }

    const closeBtn = document.createElement('button');
    closeBtn.classList.add('close__btn');
    closeBtn.innerText = 'x';
    closeBtn.addEventListener('click', close);

    const counterNumber = document.createElement('span');
    counterNumber.classList.add('score__number');
    counterNumber.innerHTML = counterRightAnswer;

    const counter = document.createElement('p');
    counter.classList.add('test__score');
    counter.innerText = 'счет : ';
    counter.append(counterNumber);

    const question = document.createElement('h1');
    question.classList.add('question');
    question.innerText = `${firstNumber} умножить на ${secondNumber}`;

    let answerArrBtn = [];
    for(let i = 0; i < 4; i++) {
        let answerBtn = document.createElement('button');
        answerBtn.classList.add('answer');
        answerBtn.innerText = answersArr[i];
        answerBtn.addEventListener('click', e => {
            if(+e.target.innerText === rightAnswer) {
                counterRightAnswer++;
                drawEasyTest();
            }
        })
        answerArrBtn.push(answerBtn);
    }
    
    const wrapperAnswersBtn = document.createElement('div');
    wrapperAnswersBtn.classList.add('answers');
    wrapperAnswersBtn.append(...answerArrBtn);

    const wrapperTest = document.createElement('div');
    wrapperTest.classList.add('test');
    wrapperTest.append(closeBtn, counter, question, wrapperAnswersBtn);

    document.querySelector('.multiplication__table').append(wrapperTest);
}

function showMultiplicationTable() {
    clearMainPage()

    const multiplicationTableImg = document.createElement('img');
    multiplicationTableImg.src = '../img/showMultiplicationTable.jpeg';
    multiplicationTableImg.alt = 'Multiplication Table';

    const closeBtn = document.createElement('button');
    closeBtn.classList.add('close__btn');
    closeBtn.innerText = 'x';
    closeBtn.addEventListener('click', close);

    const wrapperMultiplicationTableImg = document.createElement('div');
    wrapperMultiplicationTableImg.classList.add('multiplication__table-img');
    wrapperMultiplicationTableImg.append(closeBtn, multiplicationTableImg);

    document.querySelector('.multiplication__table').append(wrapperMultiplicationTableImg);
}


function close() {
    clearMainPage();
    drawMainPage();
}
function clearMainPage () {
    document.querySelector('.multiplication__table').innerHTML = '';
}
function getRandomNumer(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function shuffleArray(array) {
    let currentIndex = array.length,  randomIndex;

    while (currentIndex != 0) {
  
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
  
        [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}
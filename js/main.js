let counterRightAnswer = 0;
drawMainPage()

function drawMainPage() {
    const title = document.createElement('h1');
    title.classList.add('title');
    title.innerText = 'WELCOME';

    const showMultiplicationTableBtn = document.createElement('button');
    showMultiplicationTableBtn.classList.add('show__multiplicationTable-btn');
    showMultiplicationTableBtn.innerText = 'show multiplication table';

    const easyTestBtn = document.createElement('button');
    easyTestBtn.classList.add('easy__test-btn');
    easyTestBtn.innerText = 'easy test';
    easyTestBtn.addEventListener('click', drawEasyTest);

    const hardTestBtn = document.createElement('button');
    hardTestBtn.classList.add('hard__test-btn');
    hardTestBtn.innerText = 'hard test';

    const wrapperLevelTestBtns = document.createElement('div');
    wrapperLevelTestBtns.classList.add('level__test-btns');
    wrapperLevelTestBtns.append(easyTestBtn, hardTestBtn)

    const wrapperMainPage = document.createElement('div');
    wrapperMainPage.classList.add('main__page');
    wrapperMainPage.append(title, showMultiplicationTableBtn, wrapperLevelTestBtns);


    document.querySelector('.multiplication__table').append(wrapperMainPage);
}
function drawEasyTest() {
    document.querySelector('.multiplication__table').innerHTML = '';

    let firstNumber = getRandomNumer(2, 9);
    let secondNumber = getRandomNumer(2, 9);
    let rightAnswer = firstNumber * secondNumber;
    let answersArr = shuffleArray([rightAnswer, rightAnswer + 1, rightAnswer - 1, getRandomNumer(10, 100)]);

    const counterNumber = document.createElement('span');
    counterNumber.classList.add('score__number');
    counterNumber.innerHTML = counterRightAnswer;

    const counter = document.createElement('p');
    counter.classList.add('test__score');
    counter.innerText = 'score : ';
    counter.append(counterNumber);

    const question = document.createElement('h1');
    question.classList.add('question');
    question.innerText = `${firstNumber} multiply by ${secondNumber}`;

    let answerArrBtn = [];
    for(let i = 0; i < 4; i++) {
        let answerBtn = document.createElement('button');
        answerBtn.classList.add('answer');
        answerBtn.innerText = answersArr[i];
        answerBtn.addEventListener('click', e => {
            if(+e.target.innerText === rightAnswer) {
                counterRightAnswer++
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
    wrapperTest.append(counter, question, wrapperAnswersBtn);

    document.querySelector('.multiplication__table').append(wrapperTest);
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
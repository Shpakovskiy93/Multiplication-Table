(function main() {
    let counterRightAnswer = 0;
    let counterWrongAnswer = 0;
    let difficultyLevel;
    let multiplicationExamplesArr = [];
    drawMainPage();


    function drawMainPage() {
        counterRightAnswer = 0;
        counterWrongAnswer = 0;
    
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
            multiplicationExamplesArr = createMultiplicationExamples(difficultyLevel);
            drawTest();
        });
    
        const normalTestBtn = document.createElement('button');
        normalTestBtn.classList.add('normal__test-btn');
        normalTestBtn.innerText = 'Средний уровень';
        normalTestBtn.setAttribute('data-level','normal');
        normalTestBtn.addEventListener('click', e => {
            difficultyLevel = e.target.getAttribute('data-level');
            multiplicationExamplesArr = createMultiplicationExamples(difficultyLevel);
            drawTest();
        });

        const hardTestBtn = document.createElement('button');
        hardTestBtn.classList.add('hard__test-btn');
        hardTestBtn.innerText = 'Сложный уровень';
        hardTestBtn.setAttribute('data-level','hard');
        hardTestBtn.addEventListener('click', e => {
            difficultyLevel = e.target.getAttribute('data-level');
            multiplicationExamplesArr = createMultiplicationExamples(difficultyLevel);
            drawTest();
        })
    
        const wrapperLevelTestBtns = document.createElement('div');
        wrapperLevelTestBtns.classList.add('level__test-btns');
        wrapperLevelTestBtns.append(easyTestBtn, normalTestBtn)
    
        const wrapperMainPage = document.createElement('div');
        wrapperMainPage.classList.add('main__page');
        wrapperMainPage.append(title, showMultiplicationTableBtn, wrapperLevelTestBtns, hardTestBtn);
    
    
        document.querySelector('.multiplication__table').append(wrapperMainPage);
    }

    function drawTest() {

        if(counterRightAnswer === 100) {
            summarize();
        }

        document.querySelector('.multiplication__table').innerHTML = '';

        let firstNumber = multiplicationExamplesArr[counterRightAnswer][0];
        let secondNumber = multiplicationExamplesArr[counterRightAnswer][1];
        let rightAnswer = firstNumber * secondNumber;
        let answersArr = createAnswerArr(rightAnswer);
    
        const closeBtn = document.createElement('button');
        closeBtn.classList.add('close__btn');
        closeBtn.innerText = 'x';
        closeBtn.addEventListener('click', close);
    
        const counterNumber = document.createElement('span');
        counterNumber.classList.add('score__number');
        counterNumber.innerHTML = counterRightAnswer;
    
        const counter = document.createElement('p');
        counter.classList.add('test__score');
        counter.innerText = 'пправильных ответов : ';
        counter.append(counterNumber);
    
        const question = document.createElement('h1');
        question.classList.add('question');
        question.innerText = `${firstNumber} * ${secondNumber}`;

        const wrapperAnswersBtn = document.createElement('div');
        wrapperAnswersBtn.classList.add('answers');

        if(difficultyLevel === 'easy') {
            let answerArrBtn = [];
            for(let i = 0; i < 4; i++) {
                let answerBtn = document.createElement('button');
                answerBtn.classList.add('answer');
                answerBtn.innerText = answersArr[i];
                answerBtn.addEventListener('click', e => {
                    if(+e.target.innerText === rightAnswer) {
                        counterRightAnswer++;
                        drawTest();
                    } else {
                        counterWrongAnswer++;
                        showPopUpWrongAnswer();
                    }
                })
                answerArrBtn.push(answerBtn);
            }
            wrapperAnswersBtn.append(...answerArrBtn);
            
        } else if(difficultyLevel === 'normal' || difficultyLevel === 'hard') {
            let answerInput = document.createElement('input');
            answerInput.classList.add('answer__input');
            let answerBtn = document.createElement('button');
            answerBtn.classList.add('answer__btn');
            answerBtn.innerText = 'ответить';
            answerBtn.addEventListener('click', e => {
                if(+answerInput.value === rightAnswer) {
                    counterRightAnswer++;
                    drawTest();
                } else {
                    counterWrongAnswer++;
                    showPopUpWrongAnswer();
                }
            })
            wrapperAnswersBtn.append(answerInput, answerBtn);
        }

        const wrapperTest = document.createElement('div');
        wrapperTest.classList.add('test');
        wrapperTest.append(closeBtn, counter, question, wrapperAnswersBtn);
    
        document.querySelector('.multiplication__table').append(wrapperTest);
    }
    
    function showMultiplicationTable() {
        clearMainPage()
    
        const multiplicationTableImg = document.createElement('img');
        multiplicationTableImg.src = './img/showMultiplicationTable.jpeg';
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

    function createAnswerArr(rightAnswer) {
        let answers = [];
        let firstNumber = rightAnswer + 10;
        let secondNumber;

        if(rightAnswer <= 10){
            secondNumber = rightAnswer - 1;
        } else if(rightAnswer <= 20 ?? rightAnswer > 10) {
            secondNumber = rightAnswer - 5;
        } else {
            secondNumber = rightAnswer - 10;
        }

        answers.push(rightAnswer);

        while (answers.length <= 3) {
            let rundomnumber  = getRandomNumer(secondNumber, firstNumber);
            if (answers.indexOf(rundomnumber) == -1) {
                answers.push(rundomnumber);
            }
        }

        return shuffleArray(answers);
    }

    function close() {
        clearMainPage();
        drawMainPage();
    }

    function clearMainPage () {
        document.querySelector('.multiplication__table').innerHTML = '';
    }

    function showPopUpWrongAnswer() {

        document.querySelector('.test').classList.add('hide');

        const closeBtn = document.createElement('button');
        closeBtn.classList.add('close__btn');
        closeBtn.innerText = 'x';
        closeBtn.addEventListener('click', close);

        const wrongAnswerTitle = document.createElement('h1');
        wrongAnswerTitle.classList.add('wrong__answer-title');
        wrongAnswerTitle.innerText = 'Не верно =(';

        const againBtn = document.createElement('button');
        againBtn.classList.add('again__btn');
        againBtn.innerText = 'ПОПРОБОВАТЬ ЕЩЁ РАЗ';
        againBtn.addEventListener('click', e => {
            document.querySelector('.wrong__answer').remove();
            document.querySelector('.test').classList.remove('hide');
        })

        const wrapperWrongAnswer = document.createElement('div');
        wrapperWrongAnswer.classList.add('wrong__answer');

        wrapperWrongAnswer.append(closeBtn, wrongAnswerTitle, againBtn);

        document.querySelector('.multiplication__table').append(wrapperWrongAnswer);

    }

    function summarize() {
        
    }

})()


function createMultiplicationExamples(level) {
    let multExamplesArr = [];
    if(level == 'easy' || level == 'normal') {
        for(let i = 2; i <= 9; i++) {
            for(let y = 2; y <= 9; y++) {
                multExamplesArr.push([i, y]);
            }
        }
    } else if(level == 'hard') {
        for(let i = 5; i <= 15; i++) {
            for(let y = 5; y <= 15; y++) {
                multExamplesArr.push([i, y]);
            }
        }
    }
    return shuffleArray(multExamplesArr);
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
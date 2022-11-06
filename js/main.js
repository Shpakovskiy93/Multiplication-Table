
const easyTestBtn = document.querySelector('.easy__test-btn');


easyTestBtn.addEventListener('click', e => {
    createEasyCardQuestion(getRandomNumer(2,9), getRandomNumer(2,9));
})



function createEasyCardQuestion(num1, num2) {
    document.querySelector('.multiplication-table').innerHTML = '';

    let answersArr = [num1 * num2, getRandomNumer(5,100), getRandomNumer(5,100), getRandomNumer(5,100)];
    let answerShuflArr = shuffleArray(answersArr);

    const optionBtn1 = document.createElement('button');
    optionBtn1.classList.add('option');
    optionBtn1.innerText = answerShuflArr[0];
    const optionBtn2 = document.createElement('button');
    optionBtn2.classList.add('option');
    optionBtn2.innerText = answerShuflArr[1];
    const optionBtn3 = document.createElement('button');
    optionBtn3.classList.add('option');
    optionBtn3.innerText = answerShuflArr[2];
    const optionBtn4 = document.createElement('button');
    optionBtn4.classList.add('option');
    optionBtn4.innerText = answerShuflArr[3];

    const answerOptions = document.createElement('div');
    answerOptions.classList.add('answer__options');
    answerOptions.append(optionBtn1, optionBtn2, optionBtn3, optionBtn4);

    const title = document.createElement('h2');
    title.classList.add('test__question');
    title.innerText = `${num1} multiply by ${num2}`;

    const test = document.createElement('div');
    test.classList.add('test');
    test.append(title, answerOptions);

    const container = document.createElement('div');
    container.classList.add('container');
    container.append(test);

    document.querySelector('.multiplication-table').append(container);


    document.querySelectorAll('.option').forEach(btn => {
        btn.addEventListener('click', e => {
            if(+e.target.innerText === num1 * num2) {
                createEasyCardQuestion(getRandomNumer(2,9), getRandomNumer(2,9));
            } else {
                e.target.classList.add('hide');
            }
        })
    })

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
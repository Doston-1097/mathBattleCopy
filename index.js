let scoreNumber = 0;
let change = 5;
const maxChange = 5;

const score = document.getElementById("score");
const a = document.getElementById("a");
const b = document.getElementById("b");
const operation = document.getElementById("operation");
const result = document.getElementById("result");
const line = document.getElementById("line");
const refresh = document.getElementById("refresh");

const getRandomNumber = (start = 1, limit = 100) =>
    Math.floor(Math.random() * (limit - start + 1)) + start;

let aRandom, bRandom, operationRandom, trueAnswer, isTrue, wrongAnswer, answer;

const next = () => {
    aRandom = getRandomNumber();
    bRandom = getRandomNumber();
    operationRandom = getRandomNumber(1, 4);
    console.log(aRandom,bRandom,operationRandom);


    let operationString = "";
    switch (operationRandom) {
        case 1:
            operationString = "+";
            break;
        case 2:
            operationString = "-";
            if (bRandom > aRandom) [aRandom, bRandom] = [bRandom, aRandom];
            break;
        case 3:
            operationString = "x";
            aRandom %= 30;
            bRandom %= 14;//1300
            break;
        case 4:
            operationString = "/";
            if (bRandom > aRandom) [aRandom, bRandom] = [bRandom, aRandom];
            bRandom = (bRandom % 14) + 1;
            let t = aRandom % bRandom;
            aRandom -= t;
            break;
    }
    operation.innerHTML = operationString;
    a.innerHTML = aRandom;
    b.innerHTML = bRandom;

    trueAnswer = eval(`${aRandom}${operationString}${bRandom}`.replace("x", "*"));
    isTrue = getRandomNumber(-1, 2) % 2;

    wrongAnswer = getRandomNumber(1, 30);
    answer=isTrue*wrongAnswer+trueAnswer;
    answer = Math.abs(answer);
    console.log("isTrue",isTrue,answer);
    result.innerHTML=answer;
};
next();

const check = (selectedAnswer) => {
    if (change <= 0) {
        refresh.classList.remove("d-none");
        return;
    }

    let isWin = !(!isTrue ^ selectedAnswer);
    if (isWin) scoreNumber++;
    else {
        change--;

        let w = (100 / maxChange) * change;
        line.style.width = `${w}%`;
    }
    score.innerHTML = scoreNumber;

    next();
};
const reload = () => {
    window.location.reload(true);
};
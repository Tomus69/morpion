let counterPlayer = 0;
let counterCPU = 0;
let timeoutId = 0;

const scorePlayer = $("#scorePlayer");
const scoreCPU = $("#scoreCPU");
const markList = [];

const results = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const markCPU = () => {
    let resultIndex = getResultsTarget();
    for (const key in results[resultIndex]) {
        const resultCase = $("#case" + results[resultIndex][key]);
        if (false === resultCase.hasClass('circle')) {
            return mark(resultCase, 'cross');
        }
    }
};

const getResultsTarget = () => {
    let resultIndex = 0;
    let markNumber = 0;
    for(const key in results) {
        for (const subkey in results[key]) {
            const curentCase = $("#case" + results[key][subkey]);
            if (curentCase.hasClass('cross')) {
                markList[key] = [];
                break;
            }
            if (curentCase.hasClass('circle')
            && -1 === markList[key].indexOf(results[key][subkey])) {
                markList[key].push(results[key][subkey]);
            }
        }
    }
    for (const key in markList) {
        if (markNumber < markList[key].length) {
            markNumber = markList[key].length;
            resultIndex = key;
        }
    }
    return resultIndex;
};

const markPlayer = (e) => {
    if ($(".circle").length === $(".cross").length) {
        mark($(e.target), 'circle');
    }
};

const mark = (target, shape) => {
    if (true === target.hasClass(shape)) {   
        return;
    }
    target.addClass([shape, 'mark']);
    if (hasWin(shape)) {
        terminate(shape);
    } else if (9 === $(".mark").length) {
        terminate();
    }
     else if ('circle' === shape) {
        timeoutId = setTimeout(markCPU, 1000);
    }
};

const hasWin = (shape) => {
    for (const key in results) {
        if ($("#case" + results[key][0]).hasClass(shape)
        && $("#case"  + results[key][1]).hasClass(shape)
        && $("#case"  + results[key][2]).hasClass(shape)) {
            return true;
        }
    }
    return false;
};

const terminate = (shape) => {
    clearTimeout(timeoutId);
    disable();
    chronoPause();
    btnToogle(btnResume, btnStart);
    if ('circle' === shape) {
        counterPlayer = counterPlayer + 1;
        scorePlayer.text(counterPlayer);
    } else if ('cross' === shape){
        counterCPU = counterCPU + 1;
        scoreCPU.text(counterCPU)
    }
};

const start = () => {
    $(".case").removeClass(["circle", "cross", "mark"]);
    for (const key in results) {
        markList.push([]);
    }
    enable();
};

const enable = () => {
    $(".case").on("click", markPlayer);
};

const disable = () => {
    $(".case").off("click", markPlayer);
};

$("#timerStart").on("click", start);
$("#timerPause").on("click", disable);
$("#timerResume").on("click", enable);

// const results = [
//     [$("#case0"), $("#case1"), $("#case2")],
//     [$("#case3"), $("#case4"), $("#case5")],
//     [$("#case6"), $("#case7"), $("#case8")],
//     [$("#case0"), $("#case3"), $("#case6")],
//     [$("#case1"), $("#case4"), $("#case7")],
//     [$("#case2"), $("#case5"), $("#case8")],
//     [$("#case0"), $("#case4"), $("#case8")],
//     [$("#case2"), $("#case4"), $("#case6")],
// ];

// let tab = [];

// const scorePlayer = $("#scorePlayer");
// let playerScore = 0;

// const mark = (e) => {
//     const target = $(e.target);
    
//     if (false === target.hasClass("circle")) {
//         target.addClass("circle");
//         hasWin(target);
//     }
// };

// const enable = () => {
//     $(".case").on("click", mark);
// };

// const disable = () => {
//     $(".case").off("click", mark);
// };

// const winPoint = () => {
//     playerScore = playerScore + 1;
//     scorePlayer.text(playerScore);
// };

// const hasWin = (target) => { 
//     const monElement = target;
//     const id = monElement.attr("id");
//     tab.push(id); 
//     for( const key in results){
//         if (tab.includes(results[key][0].attr("id")) 
//         && tab.includes(results[key][1].attr("id")) 
//         && tab.includes(results[key][2].attr("id"))){
//             console.log("Partie Terminée");
//             winPoint();
//             disable();
//             clearInterval(intervalId);
//             btnToogle(btnPause, btnStart);
//             secondPast = 0;
//             return increment();
//         }
//     }
// };

// $("#timerStart").on("click", enable);
// $("#timerPause").on("click", disable);
// $("#timerResume").on("click", enable);
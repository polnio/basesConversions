import * as conversions from './conversions.js';
const input = document.querySelector('#q');
const baseInputs = document.querySelectorAll('.base input');
const numpadBtns = document.querySelectorAll('#numpad button');
const backBtn = document.querySelector('#back');
const clearBtn = document.querySelector('#clear');
const symbols = {
    binary: '01'.split(''),
    decimal: '0123456789'.split(''),
    hexadecimal: '0123456789ABCDEF'.split('')
};
let currentBase = 'decimal';
function updateNumpad() {
    [...numpadBtns]
        .filter(btn => symbols[currentBase].includes(btn.innerHTML))
        .forEach(btn => btn.disabled = false);
    [...numpadBtns]
        .filter(btn => !symbols[currentBase].includes(btn.innerHTML))
        .forEach(btn => btn.disabled = true);
}
function setCurrentBase(base) {
    if (currentBase === 'binary' && base === 'decimal') {
        input.value = conversions.binToDec(input.value).toString();
    }
    else if (currentBase === 'binary' && base === 'hexadecimal') {
        input.value = conversions.binToHex(input.value);
    }
    else if (currentBase === 'decimal' && base === 'binary') {
        input.value = conversions.decToBin(parseInt(input.value));
    }
    else if (currentBase === 'decimal' && base === 'hexadecimal') {
        input.value = conversions.decToHex(parseInt(input.value));
    }
    else if (currentBase === 'hexadecimal' && base === 'binary') {
        input.value = conversions.hexToBin(input.value);
    }
    else if (currentBase === 'hexadecimal' && base === 'decimal') {
        input.value = conversions.hexToDec(input.value).toString();
    }
    currentBase = base;
    updateNumpad();
}
updateNumpad();
baseInputs.forEach((baseInput, i) => {
    baseInput.addEventListener('change', () => setCurrentBase(Object.keys(symbols)[i]));
});
numpadBtns.forEach(numpadBtn => {
    numpadBtn.addEventListener('click', e => {
        const btn = e.target;
        input.value += btn.innerHTML;
    });
});
backBtn.addEventListener('click', () => {
    input.value = input.value.substring(0, input.value.length - 1);
});
clearBtn.addEventListener('click', () => {
    input.value = '';
});
window.onkeydown = (e) => {
    const key = e.key.toUpperCase();
    if (symbols[currentBase].includes(key)) {
        input.value += key;
    }
    else if (key === 'BACKSPACE') {
        backBtn.click();
    }
};

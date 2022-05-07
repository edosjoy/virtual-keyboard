const body = document.querySelector('body');

body.prepend(createContainer());

const
    textarea = body.querySelector('.textarea'),
    keyboard = body.querySelector('.keyboard'),
    capsLockMarker = body.querySelector('.capslock > span'),
    arrKeys = new Set();

const objectKeys = {
    192: {
        ru: {
            default: 'ё',
            shift: 'Ё',
            caps: 'Ё',
        },
        en: {
            default: '`',
            shift: '~',
            caps: '`',
        },
    },
    49: {
        ru: {
            default: '1',
            shift: '!',
            caps: '1',
        },
        en: {
            default: '1',
            shift: '!',
            caps: '1',
        },
    },
    50: {
        ru: {
            default: '2',
            shift: '"',
            caps: '2',
        },
        en: {
            default: '2',
            shift: '@',
            caps: '2',
        },
    },
    51: {
        ru: {
            default: '3',
            shift: '№',
            caps: '3',
        },
        en: {
            default: '3',
            shift: '#',
            caps: '3',
        },
    },
    52: {
        ru: {
            default: '4',
            shift: ';',
            caps: '4',
        },
        en: {
            default: '4',
            shift: '$',
            caps: '4',
        },
    },
    53: {
        ru: {
            default: '5',
            shift: '%',
            caps: '5',
        },
        en: {
            default: '5',
            shift: '%',
            caps: '5',
        },
    },
    54: {
        ru: {
            default: '6',
            shift: ':',
            caps: '6',
        },
        en: {
            default: '6',
            shift: '^',
            caps: '6',
        },
    },
    55: {
        ru: {
            default: '7',
            shift: '?',
            caps: '7',
        },
        en: {
            default: '7',
            shift: '&',
            caps: '7',
        },
    },
    56: {
        ru: {
            default: '8',
            shift: '*',
            caps: '8',
        },
        en: {
            default: '8',
            shift: '*',
            caps: '8',
        },
    },
    57: {
        ru: {
            default: '9',
            shift: '(',
            caps: '9',
        },
        en: {
            default: '9',
            shift: '(',
            caps: '9',
        },
    },
    48: {
        ru: {
            default: '0',
            shift: ')',
            caps: '0',
        },
        en: {
            default: '0',
            shift: ')',
            caps: '0',
        },
    },
    189: {
        ru: {
            default: '-',
            shift: '_',
            caps: '-',
        },
        en: {
            default: '-',
            shift: '_',
            caps: '-',
        },
    },
    187: {
        ru: {
            default: '=',
            shift: '+',
            caps: '=',
        },
        en: {
            default: '=',
            shift: '+',
            caps: '=',
        },
    },
    81: {
        ru: {
            default: 'й',
            shift: 'Й',
            caps: 'Й',
        },
        en: {
            default: 'q',
            shift: 'Q',
            caps: 'Q',
        },
    },
    87: {
        ru: {
            default: 'ц',
            shift: 'Ц',
            caps: 'Ц',
        },
        en: {
            default: 'w',
            shift: 'W',
            caps: 'W',
        },
    },
    69: {
        ru: {
            default: 'у',
            shift: 'У',
            caps: 'У',
        },
        en: {
            default: 'e',
            shift: 'E',
            caps: 'E',
        },
    },
    82: {
        ru: {
            default: 'к',
            shift: 'К',
            caps: 'К',
        },
        en: {
            default: 'r',
            shift: 'R',
            caps: 'R',
        },
    },
    84: {
        ru: {
            default: 'е',
            shift: 'Е',
            caps: 'Е',
        },
        en: {
            default: 't',
            shift: 'T',
            caps: 'T',
        },
    },
    89: {
        ru: {
            default: 'н',
            shift: 'Н',
            caps: 'Н',
        },
        en: {
            default: 'y',
            shift: 'Y',
            caps: 'Y',
        },
    },
    85: {
        ru: {
            default: 'г',
            shift: 'Г',
            caps: 'Г',
        },
        en: {
            default: 'u',
            shift: 'U',
            caps: 'U',
        },
    },
    73: {
        ru: {
            default: 'ш',
            shift: 'Ш',
            caps: 'Ш',
        },
        en: {
            default: 'i',
            shift: 'I',
            caps: 'I',
        },
    },
    79: {
        ru: {
            default: 'щ',
            shift: 'Щ',
            caps: 'Щ',
        },
        en: {
            default: 'o',
            shift: 'O',
            caps: 'O',
        },
    },
    80: {
        ru: {
            default: 'з',
            shift: 'З',
            caps: 'З',
        },
        en: {
            default: 'p',
            shift: 'P',
            caps: 'P',
        },
    },
    219: {
        ru: {
            default: 'х',
            shift: 'Х',
            caps: 'Х',
        },
        en: {
            default: '[',
            shift: '{',
            caps: '[',
        },
    },
    221: {
        ru: {
            default: 'ъ',
            shift: 'Ъ',
            caps: 'Ъ',
        },
        en: {
            default: ']',
            shift: '}',
            caps: ']',
        },
    },
    65: {
        ru: {
            default: 'ф',
            shift: 'Ф',
            caps: 'Ф',
        },
        en: {
            default: 'a',
            shift: 'A',
            caps: 'A',
        },
    },
    83: {
        ru: {
            default: 'ы',
            shift: 'Ы',
            caps: 'Ы',
        },
        en: {
            default: 's',
            shift: 'S',
            caps: 'S',
        },
    },
    68: {
        ru: {
            default: 'в',
            shift: 'В',
            caps: 'В',
        },
        en: {
            default: 'd',
            shift: 'D',
            caps: 'D',
        },
    },
    70: {
        ru: {
            default: 'а',
            shift: 'А',
            caps: 'А',
        },
        en: {
            default: 'f',
            shift: 'F',
            caps: 'F',
        },
    },
    71: {
        ru: {
            default: 'п',
            shift: 'П',
            caps: 'П',
        },
        en: {
            default: 'g',
            shift: 'G',
            caps: 'G',
        },
    },
    72: {
        ru: {
            default: 'р',
            shift: 'Р',
            caps: 'Р',
        },
        en: {
            default: 'h',
            shift: 'H',
            caps: 'H',
        },
    },
    74: {
        ru: {
            default: 'о',
            shift: 'О',
            caps: 'О',
        },
        en: {
            default: 'j',
            shift: 'J',
            caps: 'J',
        },
    },
    75: {
        ru: {
            default: 'л',
            shift: 'Л',
            caps: 'Л',
        },
        en: {
            default: 'k',
            shift: 'K',
            caps: 'K',
        },
    },
    76: {
        ru: {
            default: 'д',
            shift: 'Д',
            caps: 'Д',
        },
        en: {
            default: 'l',
            shift: 'L',
            caps: 'L',
        },
    },
    186: {
        ru: {
            default: 'ж',
            shift: 'Ж',
            caps: 'Ж',
        },
        en: {
            default: ';',
            shift: ':',
            caps: ';',
        },
    },
    222: {
        ru: {
            default: 'э',
            shift: 'Э',
            caps: 'Э',
        },
        en: {
            default: '\'',
            shift: '"',
            caps: '\'',
        },
    },
    90: {
        ru: {
            default: 'я',
            shift: 'Я',
            caps: 'Я',
        },
        en: {
            default: 'z',
            shift: 'Z',
            caps: 'Z',
        },
    },
    88: {
        ru: {
            default: 'ч',
            shift: 'Ч',
            caps: 'Ч',
        },
        en: {
            default: 'x',
            shift: 'X',
            caps: 'X',
        },
    },
    67: {
        ru: {
            default: 'с',
            shift: 'С',
            caps: 'С',
        },
        en: {
            default: 'c',
            shift: 'C',
            caps: 'C',
        },
    },
    86: {
        ru: {
            default: 'м',
            shift: 'М',
            caps: 'М',
        },
        en: {
            default: 'v',
            shift: 'V',
            caps: 'V',
        },
    },
    66: {
        ru: {
            default: 'и',
            shift: 'И',
            caps: 'И',
        },
        en: {
            default: 'b',
            shift: 'B',
            caps: 'B',
        },
    },
    78: {
        ru: {
            default: 'т',
            shift: 'Т',
            caps: 'Т',
        },
        en: {
            default: 'n',
            shift: 'N',
            caps: 'N',
        },
    },
    77: {
        ru: {
            default: 'ь',
            shift: 'Ь',
            caps: 'Ь',
        },
        en: {
            default: 'm',
            shift: 'M',
            caps: 'M',
        },
    },
    188: {
        ru: {
            default: 'б',
            shift: 'Б',
            caps: 'Б',
        },
        en: {
            default: ',',
            shift: '<',
            caps: ',',
        },
    },
    190: {
        ru: {
            default: 'ю',
            shift: 'Ю',
            caps: 'Ю',
        },
        en: {
            default: '.',
            shift: '>',
            caps: '.',
        },
    },
    191: {
        ru: {
            default: '.',
            shift: ',',
            caps: '.',
        },
        en: {
            default: '/',
            shift: '?',
            caps: '/',
        },
    },
    220: {
        ru: {
            default: '\\',
            shift: '/',
            caps: '\\',
        },
        en: {
            default: '\\',
            shift: '|',
            caps: '\\',
        },
    },
}

if (!localStorage.getItem('lang')) {
    localStorage.setItem('lang', 'ru');
} else if (localStorage.getItem('lang') !== 'ru') {
    changeLanguage();
}

// Mouse events

keyboard.addEventListener('mousedown', e => {
    e.preventDefault();
    const t = e.target;
    t.style.boxShadow = '0 0 0';

    if (t.classList.contains('keyboard__key') && !t.classList.contains('keyboard__key_darkgrey') && !t.classList.contains('space')) {
        textarea.value += t.innerText;
    } else if (t.innerText === '▲' || t.innerText === '◄' || t.innerText === '▼' || t.innerText === '►') {
        textarea.value += t.innerText;
    } else if (t.innerText === 'Enter') {
        textarea.value += `\n`;
    } else if (t.innerText === 'Tab') {
        textarea.value += '    ';
    } else if (t.classList.contains('space')) {
        textarea.value += ' ';
    } else if (t.innerText === 'CapsLock') {
        capsLockMarker.classList.toggle('active');
        capsAndShift('data-caps');
    } else if (t.innerText === 'Shift') {
        capsAndShift('data-shift');
    } else if (t.innerText === 'Backspace' || t.innerText === 'Del') {
        deleteCharacter(t.innerText);
    }
});

keyboard.addEventListener('mouseup', e => {
    const t = e.target;

    t.style.boxShadow = '';

    if (t.innerText === 'Shift') {
        capsAndShift('data-shift');
    }
});



// Keyboard events

body.addEventListener('keydown', e => {
    if (e.keyCode > 47 && e.keyCode < 58) {
        if (localStorage.getItem('lang') === 'ru') {
            if (capsLockMarker.classList.contains('active') && arrKeys.has(16)) {
                textarea.value += objectKeys[e.keyCode].ru.shift;
                boxShadow(objectKeys[e.keyCode].ru.shift, 'off');
            } else if (capsLockMarker.classList.contains('active')) {
                textarea.value += objectKeys[e.keyCode].ru.caps;
                boxShadow(objectKeys[e.keyCode].ru.caps, 'off');
            } else if (arrKeys.has(16)) {
                textarea.value += objectKeys[e.keyCode].ru.shift;
                boxShadow(objectKeys[e.keyCode].ru.shift, 'off');
            } else {
                textarea.value += objectKeys[e.keyCode].ru.default;
                boxShadow(objectKeys[e.keyCode].ru.default, 'off');
            }
        } else {
            if (capsLockMarker.classList.contains('active') && arrKeys.has(16)) {
                textarea.value += objectKeys[e.keyCode].en.shift;
                boxShadow(objectKeys[e.keyCode].en.shift, 'off');
            } else if (capsLockMarker.classList.contains('active')) {
                textarea.value += objectKeys[e.keyCode].en.caps;
                boxShadow(objectKeys[e.keyCode].en.caps, 'off');
            } else if (arrKeys.has(16)) {
                textarea.value += objectKeys[e.keyCode].en.shift;
                boxShadow(objectKeys[e.keyCode].en.shift, 'off');
            } else {
                textarea.value += objectKeys[e.keyCode].en.default;
                boxShadow(objectKeys[e.keyCode].en.default, 'off');
            }
        }
    } else if ((e.keyCode > 64 && e.keyCode < 91) || (e.keyCode > 185 && e.keyCode < 192) || e.keyCode === 192 || (e.keyCode > 218 && e.keyCode < 223)) {
        if (localStorage.getItem('lang') === 'ru') {
            if (capsLockMarker.classList.contains('active') && arrKeys.has(16)) {
                textarea.value += objectKeys[e.keyCode].ru.default;
                boxShadow(objectKeys[e.keyCode].ru.default, 'off');
            } else if (capsLockMarker.classList.contains('active')) {
                textarea.value += objectKeys[e.keyCode].ru.caps;
                boxShadow(objectKeys[e.keyCode].ru.caps, 'off');
            } else if (arrKeys.has(16)) {
                textarea.value += objectKeys[e.keyCode].ru.shift;
                boxShadow(objectKeys[e.keyCode].ru.shift, 'off');
            } else {
                textarea.value += objectKeys[e.keyCode].ru.default;
                boxShadow(objectKeys[e.keyCode].ru.default, 'off');
            }
        } else {
            if (capsLockMarker.classList.contains('active') && arrKeys.has(16)) {
                textarea.value += objectKeys[e.keyCode].en.default;
                boxShadow(objectKeys[e.keyCode].en.default, 'off');
            } else if (capsLockMarker.classList.contains('active')) {
                textarea.value += objectKeys[e.keyCode].en.caps;
                boxShadow(objectKeys[e.keyCode].en.caps, 'off');
            } else if (arrKeys.has(16)) {
                textarea.value += objectKeys[e.keyCode].en.shift;
                boxShadow(objectKeys[e.keyCode].en.shift, 'off');
            } else {
                textarea.value += objectKeys[e.keyCode].en.default;
                boxShadow(objectKeys[e.keyCode].en.default, 'off');
            }
        }
    } else if (e.keyCode === 8 || e.keyCode === 46) {
        deleteCharacter(e.key);
        boxShadow(e.key, 'off');
    } else if (e.keyCode === 9) {
        e.preventDefault();
        textarea.value += '    ';
        boxShadow(e.key, 'off');
    } else if (e.keyCode === 20) {
        capsLockMarker.classList.toggle('active');
        capsAndShift('data-caps');
        boxShadow(e.key, 'off');
    } else if (e.keyCode === 13) {
        textarea.value += `\n`;
        boxShadow(e.key, 'off');
    } else if (e.keyCode === 16) {
        arrKeys.add(e.keyCode);
        capsAndShift('data-shift');
        boxShadow(e.key, 'off');
    } else if (e.keyCode === 17) {
        arrKeys.add(e.keyCode);
        boxShadow('Ctrl', 'off');
    } else if (e.keyCode === 18) {
        boxShadow('Opt', 'off');
    } else if (e.keyCode === 91) {
        boxShadow('Cmd', 'off');
    } else if (e.keyCode === 93) {
        boxShadow('Cmd', 'off');
    } else if (e.keyCode === 32) {
        boxShadow('space', 'off');
        textarea.value += ' ';
    } else if (e.keyCode > 36 && e.keyCode < 41) {
        switch (e.keyCode) {
            case 37:
                textarea.value += '◄';
                boxShadow('◄', 'off');
                break;
            case 38:
                textarea.value += '▲';
                boxShadow('▲', 'off');
                break;
            case 39:
                textarea.value += '►';
                boxShadow('►', 'off');
                break;
            case 40:
                textarea.value += '▼';
                boxShadow('▼', 'off');
                break;
        }
    }

    if (arrKeys.has(16) && arrKeys.has(17)) {
        localStorage.getItem('lang') === 'ru' ? localStorage.setItem('lang', 'en') : localStorage.setItem('lang', 'ru');
        changeLanguage();
    }

    // console.log(e.keyCode);
    // console.log(e.key);
});

body.addEventListener('keyup', e => {
    if (e.keyCode > 47 && e.keyCode < 58) {
        if (localStorage.getItem('lang') === 'ru') {
            if (capsLockMarker.classList.contains('active') && arrKeys.has(16)) {
                boxShadow(objectKeys[e.keyCode].ru.shift, 'on');
            } else if (capsLockMarker.classList.contains('active')) {
                boxShadow(objectKeys[e.keyCode].ru.caps, 'on');
            } else if (arrKeys.has(16)) {
                boxShadow(objectKeys[e.keyCode].ru.shift, 'on');
            } else {
                boxShadow(objectKeys[e.keyCode].ru.default, 'on');
            }
        } else {
            if (capsLockMarker.classList.contains('active') && arrKeys.has(16)) {
                boxShadow(objectKeys[e.keyCode].en.shift, 'on');
            } else if (capsLockMarker.classList.contains('active')) {
                boxShadow(objectKeys[e.keyCode].en.caps, 'om');
            } else if (arrKeys.has(16)) {
                boxShadow(objectKeys[e.keyCode].en.shift, 'on');
            } else {
                boxShadow(objectKeys[e.keyCode].en.default, 'on');
            }
        }
    } else if ((e.keyCode > 47 && e.keyCode < 58) || (e.keyCode > 64 && e.keyCode < 91) || (e.keyCode > 185 && e.keyCode < 192) || e.keyCode === 192 || (e.keyCode > 218 && e.keyCode < 223)) {
        if (localStorage.getItem('lang') === 'ru') {
            if (capsLockMarker.classList.contains('active') && arrKeys.has(16)) {
                boxShadow(objectKeys[e.keyCode].ru.default, 'on');
            } else if (capsLockMarker.classList.contains('active')) {
                boxShadow(objectKeys[e.keyCode].ru.caps, 'on');
            } else if (arrKeys.has(16)) {
                boxShadow(objectKeys[e.keyCode].ru.shift, 'on');
            } else {
                boxShadow(objectKeys[e.keyCode].ru.default, 'on');
            }
        } else {
            if (capsLockMarker.classList.contains('active') && arrKeys.has(16)) {
                boxShadow(objectKeys[e.keyCode].en.default, 'on');
            } else if (capsLockMarker.classList.contains('active')) {
                boxShadow(objectKeys[e.keyCode].en.caps, 'om');
            } else if (arrKeys.has(16)) {
                boxShadow(objectKeys[e.keyCode].en.shift, 'on');
            } else {
                boxShadow(objectKeys[e.keyCode].en.default, 'on');
            }
        }
    } else if (e.keyCode === 17) {
        arrKeys.delete(e.keyCode);
        boxShadow('Ctrl', 'on');
    } else if (e.keyCode === 18) {
        boxShadow('Opt', 'on');
    } else if (e.keyCode === 91) {
        boxShadow('Cmd', 'on');
    } else if (e.keyCode === 93) {
        boxShadow('Cmd', 'on');
    } else if (e.keyCode === 32) {
        boxShadow('space', 'on');
    } else if (e.keyCode === 20) {
        boxShadow('CapsLock', 'on');
    } else if (e.keyCode === 8) {
        boxShadow('Backspace', 'on');
    } else if (e.keyCode === 46) {
        boxShadow('Del', 'on');
    } else if (e.keyCode === 9) {
        boxShadow('Tab', 'on');
    } else if (e.keyCode > 36 && e.keyCode < 41) {
        switch (e.keyCode) {
            case 37:
                boxShadow('◄', 'on');
                break;
            case 38:
                boxShadow('▲', 'on');
                break;
            case 39:
                boxShadow('►', 'on');
                break;
            case 40:
                boxShadow('▼', 'on');
                break;
        }
    } else {
        boxShadow(e.key, 'on');
    }

    if (e.keyCode === 16) {
        arrKeys.delete(e.keyCode);
        capsAndShift('data-shift');
        boxShadow('Shift', 'on');
    }
});



// Functions

function boxShadow(key, action) {
    for (let i = 0; i < keyboard.children.length; i++) {
        for (let j = 0; j < keyboard.children[i].children.length; j++) {
            for (let k = 0; k < keyboard.children[i].children[j].children.length; k++) {
                if (keyboard.children[i].children[j].children[k].innerText === key) {
                    keyboard.children[i].children[j].children[k].style.boxShadow = action === 'off' ? '0 0 0' : '';
                }
            }
        }
    }
}

function capsAndShift(dataAtribute) {
    for (let i = 0; i < keyboard.children.length; i++) {
        for (let j = 0; j < keyboard.children[i].children.length; j++) {
            for (let k = 0; k < keyboard.children[i].children[j].children.length; k++) {
                if (keyboard.children[i].children[j].children[k].hasAttribute(dataAtribute)) {
                    keyboard.children[i].children[j].children[k].classList.toggle('hidden');
                }
            }
        }
    }
}

function deleteCharacter(action) {
    let position = textarea.selectionEnd;
    let str = textarea.value;
    str = str.split('');
    action.toLowerCase() === 'backspace' ? str.splice(position - 1, 1) : str.splice(position, 1);
    textarea.value = str.join('');
    action.toLowerCase() === 'backspace' ? textarea.selectionEnd = position - 1 : textarea.selectionEnd = position;
}

function changeLanguage() {
    for (let i = 0; i < keyboard.children.length; i++) {
        for (let j = 0; j < keyboard.children[i].children.length; j++) {
            if (keyboard.children[i].children[j].classList.contains(localStorage.getItem('lang'))) {
                keyboard.children[i].children[j].classList.remove('hidden');
            } else {
                keyboard.children[i].children[j].classList.add('hidden');
            }
        }
    }
}



// Add main container

function createContainer() {
    const container = document.createElement('div');
    container.classList.add('container');
    container.innerHTML = `<h1 class="heading">RS Virtual keyboard</h1>
    <textarea class="textarea"></textarea>
    <div class="keyboard">
    
        <div class="keyboard__line-keys">
            <span class="ru">
            <div class="keyboard__key" data-caps="false" data-shift="false">ё</div>
                <div class="keyboard__key hidden" data-caps="true" data-shift="true">Ё</div>
            </span>
            <span class="en hidden">
            <div class="keyboard__key" data-caps="false" data-shift="false">\`</div>
                <div class="keyboard__key hidden" data-caps="false" data-shift="true">~</div>
            </span>
            <span class="ru">
            <div class="keyboard__key" data-shift="false">1</div>
                <div class="keyboard__key hidden" data-shift="true">!</div>
            </span>
            <span class="en hidden">
            <div class="keyboard__key" data-shift="false">1</div>
                <div class="keyboard__key hidden" data-shift="true">!</div>
            </span>
            <span class="ru">
            <div class="keyboard__key" data-shift="false">2</div>
                <div class="keyboard__key hidden" data-shift="true">"</div>
            </span>
            <span class="en hidden">
            <div class="keyboard__key" data-shift="false">2</div>
                <div class="keyboard__key hidden" data-shift="true">@</div>
            </span>
            <span class="ru">
            <div class="keyboard__key" data-shift="false">3</div>
                <div class="keyboard__key hidden" data-shift="true">№</div>
            </span>
            <span class="en hidden">
            <div class="keyboard__key" data-shift="false">3</div>
                <div class="keyboard__key hidden" data-shift="true">#</div>
            </span>
            <span class="ru">
            <div class="keyboard__key" data-shift="false">4</div>
                <div class="keyboard__key hidden" data-shift="true">;</div>
            </span>
            <span class="en hidden">
            <div class="keyboard__key" data-shift="false">4</div>
                <div class="keyboard__key hidden" data-shift="true">$</div>
            </span>
            <span class="ru">
            <div class="keyboard__key" data-shift="false">5</div>
                <div class="keyboard__key hidden" data-shift="true">%</div>
            </span>
            <span class="en hidden">
            <div class="keyboard__key" data-shift="false">5</div>
                <div class="keyboard__key hidden" data-shift="true">%</div>
            </span>
            <span class="ru">
            <div class="keyboard__key" data-shift="false">6</div>
                <div class="keyboard__key hidden" data-shift="true">:</div>
            </span>
            <span class="en hidden">
            <div class="keyboard__key" data-shift="false">6</div>
                <div class="keyboard__key hidden" data-shift="true">^</div>
            </span>
            <span class="ru">
            <div class="keyboard__key" data-shift="false">7</div>
                <div class="keyboard__key hidden" data-shift="true">?</div>
            </span>
            <span class="en hidden">
            <div class="keyboard__key" data-shift="false">7</div>
                <div class="keyboard__key hidden" data-shift="true">&</div>
            </span>
            <span class="ru">
            <div class="keyboard__key" data-shift="false">8</div>
                <div class="keyboard__key hidden" data-shift="true">*</div>
            </span>
            <span class="en hidden">
            <div class="keyboard__key" data-shift="false">8</div>
                <div class="keyboard__key hidden" data-shift="true">*</div>
            </span>
            <span class="ru">
            <div class="keyboard__key" data-shift="false">9</div>
                <div class="keyboard__key hidden" data-shift="true">(</div>
            </span>
            <span class="en hidden">
            <div class="keyboard__key" data-shift="false">9</div>
                <div class="keyboard__key hidden" data-shift="true">(</div>
            </span>
            <span class="ru">
            <div class="keyboard__key" data-shift="false">0</div>
                <div class="keyboard__key hidden" data-shift="true">)</div>
            </span>
            <span class="en hidden">
            <div class="keyboard__key" data-shift="false">0</div>
                <div class="keyboard__key hidden" data-shift="true">)</div>
            </span>
            <span class="ru">
            <div class="keyboard__key" data-shift="false">-</div>
                <div class="keyboard__key hidden" data-shift="true">_</div>
            </span>
            <span class="en hidden">
            <div class="keyboard__key" data-shift="false">-</div>
                <div class="keyboard__key hidden" data-shift="true">_</div>
            </span>
            <span class="ru">
            <div class="keyboard__key" data-shift="false">=</div>
                <div class="keyboard__key hidden" data-shift="true">+</div>
            </span>
            <span class="en hidden">
            <div class="keyboard__key" data-shift="false">=</div>
                <div class="keyboard__key hidden" data-shift="true">+</div>
            </span>
            <span class="ru en">
            <div class="keyboard__key backspace keyboard__key_darkgrey">Backspace</div>
            </span>
        </div> 
        
        
        <div class="keyboard__line-keys">
            <span class="ru en">
            <div class="keyboard__key keyboard__key_darkgrey">Tab</div>
            </span>
            <span class="ru">
            <div class="keyboard__key" data-caps="false" data-shift="false">й</div>
                <div class="keyboard__key hidden" data-caps="true" data-shift="true">Й</div>
            </span>
            <span class="en hidden">
            <div class="keyboard__key" data-caps="false" data-shift="false">q</div>
                <div class="keyboard__key hidden" data-caps="true" data-shift="true">Q</div>
            </span>
            <span class="ru">
            <div class="keyboard__key" data-caps="false" data-shift="false">ц</div>
                <div class="keyboard__key hidden" data-caps="true" data-shift="true">Ц</div>
            </span>
            <span class="en hidden">
            <div class="keyboard__key" data-caps="false" data-shift="false">w</div>
                <div class="keyboard__key hidden" data-caps="true" data-shift="true">W</div>
            </span>
            <span class="ru">
            <div class="keyboard__key" data-caps="false" data-shift="false">у</div>
                <div class="keyboard__key hidden" data-caps="true" data-shift="true">У</div>
            </span>
            <span class="en hidden">
            <div class="keyboard__key" data-caps="false" data-shift="false">e</div>
                <div class="keyboard__key hidden" data-caps="true" data-shift="true">E</div>
            </span>
            <span class="ru">
            <div class="keyboard__key" data-caps="false" data-shift="false">к</div>
                <div class="keyboard__key hidden" data-caps="true" data-shift="true">К</div>
            </span>
            <span class="en hidden">
            <div class="keyboard__key" data-caps="false" data-shift="false">r</div>
                <div class="keyboard__key hidden" data-caps="true" data-shift="true">R</div>
            </span>
            <span class="ru">
            <div class="keyboard__key" data-caps="false" data-shift="false">е</div>
                <div class="keyboard__key hidden" data-caps="true" data-shift="true">Е</div>
            </span>
            <span class="en hidden">
            <div class="keyboard__key" data-caps="false" data-shift="false">t</div>
                <div class="keyboard__key hidden" data-caps="true" data-shift="true">T</div>
            </span>
            <span class="ru">
            <div class="keyboard__key" data-caps="false" data-shift="false">н</div>
                <div class="keyboard__key hidden" data-caps="true" data-shift="true">Н</div>
            </span>
            <span class="en hidden">
            <div class="keyboard__key" data-caps="false" data-shift="false">y</div>
                <div class="keyboard__key hidden" data-caps="true" data-shift="true">Y</div>
            </span>
            <span class="ru">
            <div class="keyboard__key" data-caps="false" data-shift="false">г</div>
                <div class="keyboard__key hidden" data-caps="true" data-shift="true">Г</div>
            </span>
            <span class="en hidden">
            <div class="keyboard__key" data-caps="false" data-shift="false">u</div>
                <div class="keyboard__key hidden" data-caps="true" data-shift="true">U</div>
            </span>
            <span class="ru">
            <div class="keyboard__key" data-caps="false" data-shift="false">ш</div>
                <div class="keyboard__key hidden" data-caps="true" data-shift="true">Ш</div>
            </span>
            <span class="en hidden">
            <div class="keyboard__key" data-caps="false" data-shift="false">i</div>
                <div class="keyboard__key hidden" data-caps="true" data-shift="true">I</div>
            </span>
            <span class="ru">
            <div class="keyboard__key" data-caps="false" data-shift="false">щ</div>
                <div class="keyboard__key hidden" data-caps="true" data-shift="true">Щ</div>
            </span>
            <span class="en hidden">
            <div class="keyboard__key" data-caps="false" data-shift="false">o</div>
                <div class="keyboard__key hidden" data-caps="true" data-shift="true">O</div>
            </span>
            <span class="ru">
            <div class="keyboard__key" data-caps="false" data-shift="false">з</div>
                <div class="keyboard__key hidden" data-caps="true" data-shift="true">З</div>
            </span>
            <span class="en hidden">
            <div class="keyboard__key" data-caps="false" data-shift="false">p</div>
                <div class="keyboard__key hidden" data-caps="true" data-shift="true">P</div>
            </span>
            <span class="ru">
            <div class="keyboard__key" data-caps="false" data-shift="false">х</div>
                <div class="keyboard__key hidden" data-caps="true" data-shift="true">Х</div>
            </span>
            <span class="en hidden">
            <div class="keyboard__key" data-shift="false">[</div>
                <div class="keyboard__key hidden" data-shift="true">{</div>
            </span>
            <span class="ru">
            <div class="keyboard__key" data-caps="false" data-shift="false">ъ</div>
                <div class="keyboard__key hidden" data-caps="true" data-shift="true">Ъ</div>
            </span>
            <span class="en hidden">
            <div class="keyboard__key" data-shift="false">]</div>
                <div class="keyboard__key hidden" data-shift="true">}</div>
            </span>
            <span class="ru">
            <div class="keyboard__key" data-shift="false">\\</div>
                <div class="keyboard__key hidden" data-shift="true">/</div>
            </span>
            <span class="en hidden">
            <div class="keyboard__key" data-shift="false">\\</div>
                <div class="keyboard__key hidden" data-shift="true">|</div>
            </span>
            <span class="ru en">
            <div class="keyboard__key keyboard__key_darkgrey">Del</div>
            </span>
        </div>
        
        
        <div class="keyboard__line-keys">
            <span class="ru en">
            <div class="keyboard__key capslock keyboard__key_darkgrey">CapsLock<span></span></div>
            </span>
            <span class="ru">
            <div class="keyboard__key" data-caps="false" data-shift="false">ф</div>
            <div class="keyboard__key hidden" data-caps="true" data-shift="true">Ф</div>
            </span>
            <span class="en hidden">
            <div class="keyboard__key" data-caps="false" data-shift="false">a</div>
            <div class="keyboard__key hidden" data-caps="true" data-shift="true">A</div>
            </span>
            <span class="ru">
            <div class="keyboard__key" data-caps="false" data-shift="false">ы</div>
            <div class="keyboard__key hidden" data-caps="true" data-shift="true">Ы</div>
            </span>
            <span class="en hidden">
            <div class="keyboard__key" data-caps="false" data-shift="false">s</div>
            <div class="keyboard__key hidden" data-caps="true" data-shift="true">S</div>
            </span>
            <span class="ru">
            <div class="keyboard__key" data-caps="false" data-shift="false">в</div>
            <div class="keyboard__key hidden" data-caps="true" data-shift="true">В</div>
            </span>
            <span class="en hidden">
            <div class="keyboard__key" data-caps="false" data-shift="false">d</div>
            <div class="keyboard__key hidden" data-caps="true" data-shift="true">D</div>
            </span>
            <span class="ru">
            <div class="keyboard__key" data-caps="false" data-shift="false">а</div>
            <div class="keyboard__key hidden" data-caps="true" data-shift="true">А</div>
            </span>
            <span class="en hidden">
            <div class="keyboard__key" data-caps="false" data-shift="false">f</div>
            <div class="keyboard__key hidden" data-caps="true" data-shift="true">F</div>
            </span>
            <span class="ru">
            <div class="keyboard__key" data-caps="false" data-shift="false">п</div>
            <div class="keyboard__key hidden" data-caps="true" data-shift="true">П</div>
            </span>
            <span class="en hidden">
            <div class="keyboard__key" data-caps="false" data-shift="false">g</div>
            <div class="keyboard__key hidden" data-caps="true" data-shift="true">G</div>
            </span>
            <span class="ru">
            <div class="keyboard__key" data-caps="false" data-shift="false">р</div>
            <div class="keyboard__key hidden" data-caps="true" data-shift="true">Р</div>
            </span>
            <span class="en hidden">
            <div class="keyboard__key" data-caps="false" data-shift="false">j</div>
            <div class="keyboard__key hidden" data-caps="true" data-shift="true">J</div>
            </span>
            <span class="ru">
            <div class="keyboard__key" data-caps="false" data-shift="false">о</div>
            <div class="keyboard__key hidden" data-caps="true" data-shift="true">О</div>
            </span>
            <span class="en hidden">
            <div class="keyboard__key" data-caps="false" data-shift="false">j</div>
            <div class="keyboard__key hidden" data-caps="true" data-shift="true">J</div>
            </span>
            <span class="ru">
            <div class="keyboard__key" data-caps="false" data-shift="false">л</div>
            <div class="keyboard__key hidden" data-caps="true" data-shift="true">Л</div>
            </span>
            <span class="en hidden">
            <div class="keyboard__key" data-caps="false" data-shift="false">k</div>
            <div class="keyboard__key hidden" data-caps="true" data-shift="true">K</div>
            </span>
            <span class="ru">
            <div class="keyboard__key" data-caps="false" data-shift="false">д</div>
            <div class="keyboard__key hidden" data-caps="true" data-shift="true">Д</div>
            </span>
            <span class="en hidden">
            <div class="keyboard__key" data-caps="false" data-shift="false">l</div>
            <div class="keyboard__key hidden" data-caps="true" data-shift="true">L</div>
            </span>
            <span class="ru">
            <div class="keyboard__key" data-caps="false" data-shift="false">ж</div>
            <div class="keyboard__key hidden" data-caps="true" data-shift="true">Ж</div>
            </span>
            <span class="en hidden">
            <div class="keyboard__key" data-shift="false">:</div>
            <div class="keyboard__key hidden" data-shift="true">;</div>
            </span>
            <span class="ru">
            <div class="keyboard__key" data-caps="false" data-shift="false">э</div>
            <div class="keyboard__key hidden" data-caps="true" data-shift="true">Э</div>
            </span>
            <span class="en hidden">
            <div class="keyboard__key" data-shift="false">'</div>
            <div class="keyboard__key hidden" data-shift="true">"</div>
            </span>
            <span class="ru en">
            <div class="keyboard__key enter keyboard__key_darkgrey">Enter</div>
            </span>
        </div>
        
        
        <div class="keyboard__line-keys">
            <span class="ru en">
            <div class="keyboard__key shift keyboard__key_darkgrey">Shift</div>
            </span>
            <span class="ru">
            <div class="keyboard__key" data-caps="false" data-shift="false">я</div>
                <div class="keyboard__key hidden" data-caps="true" data-shift="true">Я</div>
            </span>
            <span class="en hidden">
            <div class="keyboard__key" data-caps="false" data-shift="false">z</div>
                <div class="keyboard__key hidden" data-caps="true" data-shift="true">Z</div>
            </span>
            <span class="ru">
            <div class="keyboard__key" data-caps="false" data-shift="false">ч</div>
                <div class="keyboard__key hidden" data-caps="true" data-shift="true">Ч</div>
            </span>
            <span class="en hidden">
            <div class="keyboard__key" data-caps="false" data-shift="false">x</div>
                <div class="keyboard__key hidden" data-caps="true" data-shift="true">X</div>
            </span>
            <span class="ru">
            <div class="keyboard__key" data-caps="false" data-shift="false">с</div>
                <div class="keyboard__key hidden" data-caps="true" data-shift="true">С</div>
            </span>
            <span class="en hidden">
            <div class="keyboard__key" data-caps="false" data-shift="false">c</div>
                <div class="keyboard__key hidden" data-caps="true" data-shift="true">C</div>
            </span>
            <span class="ru">
            <div class="keyboard__key" data-caps="false" data-shift="false">м</div>
                <div class="keyboard__key hidden" data-caps="true" data-shift="true">М</div>
            </span>
            <span class="en hidden">
            <div class="keyboard__key" data-caps="false" data-shift="false">v</div>
                <div class="keyboard__key hidden" data-caps="true" data-shift="true">V</div>
            </span>
            <span class="ru">
            <div class="keyboard__key" data-caps="false" data-shift="false">и</div>
                <div class="keyboard__key hidden" data-caps="true" data-shift="true">И</div>
            </span>
            <span class="en hidden">
            <div class="keyboard__key" data-caps="false" data-shift="false">b</div>
                <div class="keyboard__key hidden" data-caps="true" data-shift="true">B</div>
            </span>
            <span class="ru">
            <div class="keyboard__key" data-caps="false" data-shift="false">т</div>
                <div class="keyboard__key hidden" data-caps="true" data-shift="true">Т</div>
            </span>
            <span class="en hidden">
            <div class="keyboard__key" data-caps="false" data-shift="false">n</div>
                <div class="keyboard__key hidden" data-caps="true" data-shift="true">N</div>
            </span>
            <span class="ru">
            <div class="keyboard__key" data-caps="false" data-shift="false">ь</div>
                <div class="keyboard__key hidden" data-caps="true" data-shift="true">Ь</div>
            </span>
            <span class="en hidden">
            <div class="keyboard__key" data-caps="false" data-shift="false">m</div>
                <div class="keyboard__key hidden" data-caps="true" data-shift="true">M</div>
            </span>
            <span class="ru">
            <div class="keyboard__key" data-caps="false" data-shift="false">б</div>
                <div class="keyboard__key hidden" data-caps="true" data-shift="true">Б</div>
            </span>
            <span class="en hidden">
            <div class="keyboard__key" data-shift="false">,</div>
                <div class="keyboard__key hidden" data-shift="true"><</div>
            </span>
            <span class="ru">
            <div class="keyboard__key" data-caps="false" data-shift="false">ю</div>
                <div class="keyboard__key hidden" data-caps="true" data-shift="true">Ю</div>
            </span>
            <span class="en hidden">
            <div class="keyboard__key" data-shift="false">.</div>
                <div class="keyboard__key hidden" data-shift="true">></div>
            </span>
            <span class="ru">
            <div class="keyboard__key" data-shift="false">.</div>
                <div class="keyboard__key hidden" data-shift="true">,</div>
            </span>
            <span class="en hidden">
            <div class="keyboard__key" data-shift="false">/</div>
                <div class="keyboard__key hidden" data-shift="true">?</div>
            </span>
            <span class="ru en">
            <div class="keyboard__key keyboard__key_darkgrey">&#9650;</div>
            </span>
            <span class="ru en">
            <div class="keyboard__key shift keyboard__key_darkgrey">Shift</div>
            </span>
        </div>
        
        
        <div class="keyboard__line-keys">
            <span class="ru en">
            <div class="keyboard__key keyboard__key_darkgrey">Ctrl</div>
            </span>
            <span class="ru en">
            <div class="keyboard__key keyboard__key_darkgrey">Opt</div>
            </span>
            <span class="ru en">
            <div class="keyboard__key keyboard__key_darkgrey">Cmd</div>
            </span>
            <span class="ru en">
            <div class="keyboard__key space">space</div>
            </span>
            <span class="ru en">
            <div class="keyboard__key keyboard__key_darkgrey">Cmd</div>
            </span>
            <span class="ru en">
            <div class="keyboard__key keyboard__key_darkgrey">&#9668;</div>
            </span>
            <span class="ru en">
            <div class="keyboard__key keyboard__key_darkgrey">&#9660;</div>
            </span>
            <span class="ru en">
            <div class="keyboard__key keyboard__key_darkgrey">&#9658;</div>
            </span>
            <span class="ru en">
            <div class="keyboard__key keyboard__key_darkgrey">Opt</div>
            </span>
        </div>
    </div>
    <div class="description">
        <p class="paragraph">The virtual keyboard was created in the MacOS operating system.</p>
        <p class="paragraph">To switch the language, use the keyboard shortcut - left Shift + Ctrl</p>
    </div>`;

    return container;
}
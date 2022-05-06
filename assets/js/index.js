const body = document.querySelector('body');

body.prepend(createContainer());

const
    textarea = body.querySelector('.textarea'),
    keyboard = body.querySelector('.keyboard'),
    capsLockMarker = body.querySelector('.capslock > span'),
    arrKeys = new Set();

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
    if ((e.keyCode > 47 && e.keyCode < 58) || (e.keyCode > 64 && e.keyCode < 91) || (e.keyCode > 185 && e.keyCode < 191) || e.keyCode === 192 || (e.keyCode > 219 && e.keyCode === 223)) {
        textarea.value += capsLockMarker.classList.contains('active') ? e.key.toUpperCase() : e.key.toLowerCase();
        boxShadow(capsLockMarker.classList.contains('active') ? e.key.toUpperCase() : e.key.toLowerCase(), 'off');
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

    console.log(e.keyCode);
    console.log(e.key);
});

body.addEventListener('keyup', e => {
    if (e.keyCode === 17) {
        arrKeys.delete(e.keyCode);
        boxShadow('Ctrl', 'on');
    } else if (e.keyCode === 18) {
        boxShadow('Opt', 'on');
    } else if (e.keyCode === 91) {
        boxShadow('Cmd', 'on');
    } else if (e.keyCode === 32) {
        boxShadow('space', 'on');
    } else if (e.keyCode === 20) {
        boxShadow('CapsLock', 'on');
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
        boxShadow(capsLockMarker.classList.contains('active') ? e.key.toUpperCase() : e.key.toLowerCase(), 'on');
    }

    if (e.keyCode === 16) {
        arrKeys.delete(e.keyCode);
        capsAndShift('data-shift');
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
            <div class="keyboard__key keyboard__key_darkgrey">Ctrl</div>
            </span>
        </div>
    </div>
    <div class="description">
        <p class="paragraph">The virtual keyboard was created in the MacOS operating system.</p>
        <p class="paragraph">To switch the language, use the keyboard shortcut - left Shift + Ctrl</p>
    </div>`;

    return container;
}
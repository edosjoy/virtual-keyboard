const body = document.querySelector('body');

body.prepend(createContainer());

const
    textarea = body.querySelector('.textarea'),
    keyboard = body.querySelector('.keyboard'),
    capsLockMarker = body.querySelector('.capslock > span'),
    arrKeys = new Set();



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
    } else if (t.innerText === 'BackSpace' || t.innerText === 'Del') {
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

    // if (e.keyCode === 16 || e.keyCode === 17) {
    //     arrKeys.add(e.keyCode);
    // } else {
    //     arrKeys.clear();
    // }
    //
    // if (arrKeys.has(16) && arrKeys.has(17)) {
    //     console.log('double keys');
    // }

    if ((e.keyCode > 47 && e.keyCode < 58) || (e.keyCode > 64 && e.keyCode < 91) || (e.keyCode > 185 && e.keyCode < 191) || e.keyCode === 192 || (e.keyCode > 219 && e.keyCode === 223)) {
        textarea.value += capsLockMarker.classList.contains('active') ? e.key.toUpperCase() : e.key.toLowerCase();
        boxShadow(e.key, 'off');
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
        console.log('+');
    }

    // console.log(e.keyCode);
    // console.log(e.key);
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
    }
});



// Functions

function boxShadow(key, action) {
    for (let i = 0; i < keyboard.children.length; i++) {
        for (let j = 0; j < keyboard.children[i].children.length; j++) {
            if (keyboard.children[i].children[j].innerText === key) {
                keyboard.children[i].children[j].style.boxShadow = action === 'off' ? '0 0 0' : '';
            }
        }
    }
}

function capsAndShift(dataAtribute) {
    for (let i = 0; i < keyboard.children.length; i++) {
        for (let j = 0; j < keyboard.children[i].children.length; j++) {
            if (keyboard.children[i].children[j].hasAttribute(dataAtribute)) {
                keyboard.children[i].children[j].classList.toggle('hidden');
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



// Add main container

function createContainer() {
    const container = document.createElement('div');
    container.classList.add('container');
    container.innerHTML = `<h1 class="heading">RS Virtual keyboard</h1>
    <textarea class="textarea"></textarea>
    <div class="keyboard">
    
        <div class="keyboard__line-keys">
            <div class="keyboard__key" data-caps="" data-shift="" data-lang="">ё</div>
                <div class="keyboard__key hidden" data-caps="" data-shift="">Ё</div>
            
            <div class="keyboard__key" data-shift="">1</div>
                <div class="keyboard__key hidden" data-shift="">!</div>
            
            <div class="keyboard__key" data-shift="">2</div>
                <div class="keyboard__key hidden" data-shift="">"</div>
            
            <div class="keyboard__key" data-shift="">3</div>
                <div class="keyboard__key hidden" data-shift="">№</div>
            
            <div class="keyboard__key" data-shift="">4</div>
                <div class="keyboard__key hidden" data-shift="">;</div>
            
            <div class="keyboard__key" data-shift="">5</div>
                <div class="keyboard__key hidden" data-shift="">%</div>
            
            <div class="keyboard__key" data-shift="">6</div>
                <div class="keyboard__key hidden" data-shift="">:</div>
            
            <div class="keyboard__key" data-shift="">7</div>
                <div class="keyboard__key hidden" data-shift="">?</div>
            
            <div class="keyboard__key" data-shift="">8</div>
                <div class="keyboard__key hidden" data-shift="">*</div>
            
            <div class="keyboard__key" data-shift="">9</div>
                <div class="keyboard__key hidden" data-shift="">(</div>
            
            <div class="keyboard__key" data-shift="">0</div>
                <div class="keyboard__key hidden" data-shift="">)</div>
            
            <div class="keyboard__key" data-shift="">-</div>
                <div class="keyboard__key hidden" data-shift="">_</div>
            
            <div class="keyboard__key" data-shift="">=</div>
                <div class="keyboard__key hidden" data-shift="">+</div>
            
            <div class="keyboard__key backspace keyboard__key_darkgrey">Backspace</div>
        </div> 
        
        
        <div class="keyboard__line-keys">
            <div class="keyboard__key keyboard__key_darkgrey">Tab</div>
        
            <div class="keyboard__key" data-caps="" data-shift="">й</div>
                <div class="keyboard__key hidden" data-caps="" data-shift="">Й</div>
            
            <div class="keyboard__key" data-caps="" data-shift="">ц</div>
                <div class="keyboard__key hidden" data-caps="" data-shift="">Ц</div>
            
            <div class="keyboard__key" data-caps="" data-shift="">у</div>
                <div class="keyboard__key hidden" data-caps="" data-shift="">У</div>
            
            <div class="keyboard__key" data-caps="" data-shift="">к</div>
                <div class="keyboard__key hidden" data-caps="" data-shift="">К</div>
            
            <div class="keyboard__key" data-caps="" data-shift="">е</div>
                <div class="keyboard__key hidden" data-caps="" data-shift="">Е</div>
            
            <div class="keyboard__key" data-caps="" data-shift="">н</div>
                <div class="keyboard__key hidden" data-caps="" data-shift="">Н</div>
            
            <div class="keyboard__key" data-caps="" data-shift="">г</div>
                <div class="keyboard__key hidden" data-caps="" data-shift="">Г</div>
            
            <div class="keyboard__key" data-caps="" data-shift="">ш</div>
                <div class="keyboard__key hidden" data-caps="" data-shift="">Ш</div>
            
            <div class="keyboard__key" data-caps="" data-shift="">щ</div>
                <div class="keyboard__key hidden" data-caps="" data-shift="">Щ</div>
            
            <div class="keyboard__key" data-caps="" data-shift="">з</div>
                <div class="keyboard__key hidden" data-caps="" data-shift="">З</div>
            
            <div class="keyboard__key" data-caps="" data-shift="">х</div>
                <div class="keyboard__key hidden" data-caps="" data-shift="">Х</div>
            
            <div class="keyboard__key" data-caps="" data-shift="">ъ</div>
                <div class="keyboard__key hidden" data-caps="" data-shift="">Ъ</div>
            
            <div class="keyboard__key" data-shift="">\\</div>
                <div class="keyboard__key hidden" data-shift="">/</div>
            
            <div class="keyboard__key keyboard__key_darkgrey">Del</div>
        </div>
        
        
        <div class="keyboard__line-keys">
            <div class="keyboard__key capslock keyboard__key_darkgrey">CapsLock<span></span></div>
            
            <div class="keyboard__key" data-caps="" data-shift="">ф</div>
            <div class="keyboard__key hidden" data-caps="" data-shift="">Ф</div>
            
            <div class="keyboard__key" data-caps="" data-shift="">ы</div>
            <div class="keyboard__key hidden" data-caps="" data-shift="">Ы</div>
            
            <div class="keyboard__key" data-caps="" data-shift="">в</div>
            <div class="keyboard__key hidden" data-caps="" data-shift="">В</div>
            
            <div class="keyboard__key" data-caps="" data-shift="">а</div>
            <div class="keyboard__key hidden" data-caps="" data-shift="">А</div>
            
            <div class="keyboard__key" data-caps="" data-shift="">п</div>
            <div class="keyboard__key hidden" data-caps="" data-shift="">П</div>
            
            <div class="keyboard__key" data-caps="" data-shift="">р</div>
            <div class="keyboard__key hidden" data-caps="" data-shift="">Р</div>
            
            <div class="keyboard__key" data-caps="" data-shift="">о</div>
            <div class="keyboard__key hidden" data-caps="" data-shift="">О</div>
            
            <div class="keyboard__key" data-caps="" data-shift="">л</div>
            <div class="keyboard__key hidden" data-caps="" data-shift="">Л</div>
            
            <div class="keyboard__key" data-caps="" data-shift="">д</div>
            <div class="keyboard__key hidden" data-caps="" data-shift="">Д</div>
            
            <div class="keyboard__key" data-caps="" data-shift="">ж</div>
            <div class="keyboard__key hidden" data-caps="" data-shift="">Ж</div>
            
            <div class="keyboard__key" data-caps="" data-shift="">э</div>
            <div class="keyboard__key hidden" data-caps="" data-shift="">Э</div>
            
            <div class="keyboard__key enter keyboard__key_darkgrey">Enter</div>
        </div>
        
        
        <div class="keyboard__line-keys">
            <div class="keyboard__key shift keyboard__key_darkgrey">Shift</div>
            
            <div class="keyboard__key" data-caps="" data-shift="">я</div>
                <div class="keyboard__key hidden" data-caps="" data-shift="">Я</div>
            
            <div class="keyboard__key" data-caps="" data-shift="">ч</div>
                <div class="keyboard__key hidden" data-caps="" data-shift="">Ч</div>
            
            <div class="keyboard__key" data-caps="" data-shift="">с</div>
                <div class="keyboard__key hidden" data-caps="" data-shift="">С</div>
            
            <div class="keyboard__key" data-caps="" data-shift="">м</div>
                <div class="keyboard__key hidden" data-caps="" data-shift="">М</div>
            
            <div class="keyboard__key" data-caps="" data-shift="">и</div>
                <div class="keyboard__key hidden" data-caps="" data-shift="">И</div>
            
            <div class="keyboard__key" data-caps="" data-shift="">т</div>
                <div class="keyboard__key hidden" data-caps="" data-shift="">Т</div>
            
            <div class="keyboard__key" data-caps="" data-shift="">ь</div>
                <div class="keyboard__key hidden" data-caps="" data-shift="">Ь</div>
            
            <div class="keyboard__key" data-caps="" data-shift="">б</div>
                <div class="keyboard__key hidden" data-caps="" data-shift="">Б</div>
            
            <div class="keyboard__key" data-caps="" data-shift="">ю</div>
                <div class="keyboard__key hidden" data-caps="" data-shift="">Ю</div>
            
            <div class="keyboard__key" data-shift="">.</div>
                <div class="keyboard__key hidden" data-shift="">,</div>
            
            <div class="keyboard__key keyboard__key_darkgrey">&#9650;</div>
            
            <div class="keyboard__key shift keyboard__key_darkgrey">Shift</div>
        </div>
        
        
        <div class="keyboard__line-keys">
            <div class="keyboard__key keyboard__key_darkgrey">Ctrl</div>
            
            <div class="keyboard__key keyboard__key_darkgrey">Opt</div>
            
            <div class="keyboard__key keyboard__key_darkgrey">Cmd</div>
            
            <div class="keyboard__key space">space</div>
            
            <div class="keyboard__key keyboard__key_darkgrey">Cmd</div>
            
            <div class="keyboard__key keyboard__key_darkgrey">&#9668;</div>
            
            <div class="keyboard__key keyboard__key_darkgrey">&#9660;</div>
            
            <div class="keyboard__key keyboard__key_darkgrey">&#9658;</div>
            
            <div class="keyboard__key keyboard__key_darkgrey">Ctrl</div>
        </div>
    </div>
    <div class="description">
        <p class="paragraph">The virtual keyboard was created in the MacOS operating system.</p>
        <p class="paragraph">To switch the language, use the keyboard shortcut - left Shift + Ctrl</p>
    </div>`;

    return container;
}
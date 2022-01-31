document.addEventListener('readystatechange', function () {
    if (document.readyState === 'interactive') {
        initColorBlender();
    }
});

window.addEventListener('resize', function () {
    getCurrentFontSize();
    constructOutputFields();
});

var t79CB = {
 
}

function initColorBlender() {
    getElements();
    getCurrentFontSize()
    setEventListener();
    setNumberOfShades(null);
}

function setColor(e) {
    if (e.target.id == 'color-picker-1') {
        t79CB.inputColorText1.value = e.target.value;
    } else if (e.target.id == 'color-picker-2') {
        t79CB.inputColorText2.value = e.target.value;
    } else if (e.target.id == 'color-text-1') {
        const color = checkThatValueIsAColor(e.target.value);
        if (color) {
            t79CB.inputColorPicker1.value = color;
        } else { return; }
    } else if (e.target.id == 'color-text-2') {
        const color = checkThatValueIsAColor(e.target.value);
        if (color) {
            t79CB.inputColorPicker2.value = color;
        } else { return; }
    }
}

function checkThatValueIsAColor(value) {
    if (/^(#{1})([0-9A-F]{6})$/i.test(value)) { // #081d58
        return value;
    }
    if (/^(#{1})([0-9A-F]{3})$/i.test(value)) { // #126
        v = value.split('');
        return '' + v[0] + v[1] + v[1] + v[2] + v[2] + v[3] + v[3];
    }
}

function setNumberOfShades(e) {
    if (e == null) {
        setupOutputFieldsTable(5);
    } else {
        setupOutputFieldsTable(parseInt(e.target.value))
    }
}

function setupOutputFieldsTable(numberOfShades) {
    t79CB.outputColorField.innerHTML = '';
    t79CB.outputFields = Array(numberOfShades).fill();
    for (fieldIndex in t79CB.outputFields) {
        let field = {};
        
        const svgContainer = document.createElement('div');
        svgContainer.classList.add('svg-container-main-view');
        field['svgContainerMainView'] = svgContainer;

        const textPartContainer = document.createElement('div');
        textPartContainer.classList.add('text-part-container');
        const textField = document.createElement('span');
        textField.classList.add('color-text-field');
        textPartContainer.appendChild(textField);
        field['textField'] = textField;

        const fieldContainer = document.createElement('div');
        fieldContainer.classList.add('color-container');
        fieldContainer.appendChild(svgContainer);
        fieldContainer.appendChild(textPartContainer);

        t79CB.outputColorField.appendChild(fieldContainer);
        t79CB.outputFields[fieldIndex] = field;
    }
    constructOutputFields()
} 

function constructOutputFields() {

    const outputDivWidth = t79CB.outputColorField.clientWidth;

    const standarFieldHeight = t79CB.curentFontSize * 4;
    const minStandardFieldHeight = t79CB.curentFontSize * 1.8;

    const fieldHeight = interpolation(t79CB.outputFields.length, 3, standarFieldHeight, 20, minStandardFieldHeight);
    const fieldWidth = outputDivWidth - 150;

    for (fieldIndex in t79CB.outputFields) {
        const colorField = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
        colorField.setAttribute('width', String(fieldWidth));
        colorField.setAttribute('height', String(fieldHeight));

        const colorRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        colorRect.classList.add('color-rect');
        colorRect.setAttributeNS(null, 'width', String(fieldWidth));
        colorRect.setAttributeNS(null, 'height', String(fieldHeight));
        colorRect.style.fill = '#ffffff';
        colorField.appendChild(colorRect);

        t79CB.outputFields[fieldIndex]['svgContainerMainView'].innerHTML = '';
        t79CB.outputFields[fieldIndex]['svgContainerMainView'].appendChild(colorField);
        //t79CB.outputFields[fieldIndex]['svgContainer'].setAttribute('width', String(fieldWidth));
        t79CB.outputFields[fieldIndex]['svgContainerMainView'].style.height = String(fieldHeight) + 'px';
    }
}

function setEventListener() {
    t79CB.inputNumberOfShadesSlider.addEventListener('input', setNumberOfShades);
    t79CB.inputColorText1.addEventListener('input', setColor);
    t79CB.inputColorPicker1.addEventListener('input', setColor);
    t79CB.inputColorText2.addEventListener('input', setColor);
    t79CB.inputColorPicker2.addEventListener('input', setColor);
}

function getElements() {
    t79CB.outputColorField = document.getElementById('output-colors');
    t79CB.inputNumberOfShadesSlider = document.getElementById('number-of-shades-slider');
    t79CB.inputColorText1 = document.getElementById('color-text-1');
    t79CB.inputColorPicker1 = document.getElementById('color-picker-1');
    t79CB.inputColorText2 = document.getElementById('color-text-2');
    t79CB.inputColorPicker2 = document.getElementById('color-picker-2');
    t79CB.htmlElement = document.querySelector('html');
}

function interpolation(x, x1, y1, x2, y2) {
    return y1 + ((x - x1)*(y2-y1))/(x2-x1);
}

function getCurrentFontSize() {
    var fontSizeString = window.getComputedStyle(t79CB.htmlElement, null).getPropertyValue('font-size');
    t79CB.curentFontSize = parseFloat(fontSizeString);
}


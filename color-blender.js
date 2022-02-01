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
    getCurrentFontSize();
    setEventListener();
    setNumberOfShades(null);
    initColorInputTextfield();
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

    setColorShades();
}

function checkThatValueIsAColor(value) {
    if (/^(#{1})([0-9A-F]{6})$/i.test(value)) { // #081d58
        return value;
    }
    if (/^([0-9A-F]{6})$/i.test(value)) {
        return '#' + value;
    }
    if (/^(#{1})([0-9A-F]{3})$/i.test(value)) {
        v = value.split('');
        return '' + v[0] + v[1] + v[1] + v[2] + v[2] + v[3] + v[3];
    }
    if (/^([0-9A-F]{3})$/i.test(value)) {
        v = value.split('');
        return '#' + v[0] + v[0] + v[1] + v[1] + v[2] + v[2];
    }
    if (/^rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)$/i.test(value)) {
        const color = w3color(value);
        return color.toHexString();
    }
    if (/^(\d{1,3})\s(\d{1,3})\s(\d{1,3})$/i.test(value)) {
        const d = value.split(' ');
        const color = w3color('rgb(' + d[0] + ',' + d[1] + ',' + d[2] + ')');
        return color.toHexString();
    }
    if (/^hsl\((\d{1,3}),\s*(\d{1,3})%,\s*(\d{1,3})%\)$/i.test(value)) {
        const color = w3color(value);
        return color.toHexString();
    }
    if (/^(\d{1,3})\s*(\d{1,3})%\s*(\d{1,3})%$/i.test(value)) {
        const d = value.split(' ');
        const color = w3color('hsl(' + d[0] + ',' + d[1] + ',' + d[2] + ')');
        return color.toHexString();
    }
}

function stepSelector(button) {

    button.style.backgroundColor = '#fff5';
    window.setTimeout(function () {
        button.style.backgroundColor = 'white';
    }, 80);

    if (button.id == 'step-button-minus') {
        setupOutputFieldsTable(t79CB.outputFields.length - 1);
    } else if (button.id == 'step-button-plus') {
        setupOutputFieldsTable(t79CB.outputFields.length + 1);
    }

    t79CB.stepStatus.innerHTML = t79CB.outputFields.length;
}

function setNumberOfShades(e) {
    if (e == null) {
        setupOutputFieldsTable(5);
    } else {
        setupOutputFieldsTable(parseInt(e.target.value));
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

    const standarFieldHeight = t79CB.curentFontSize * 6;
    const minStandardFieldHeight = t79CB.curentFontSize * 3.5;
    const cutof = t79CB.curentFontSize * 0.5;

    const fieldHeight = interpolation(t79CB.outputFields.length, 3, standarFieldHeight, 20, minStandardFieldHeight);
    const fieldWidth = outputDivWidth - 100;

    for (fieldIndex in t79CB.outputFields) {
        const colorField = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
        colorField.setAttribute('width', String(fieldWidth));
        colorField.setAttribute('height', String(fieldHeight));

        const rectPath = 'M0 0 L0 ' + fieldHeight + ' L' + (fieldWidth - cutof) + ' ' + fieldHeight + ' L' + fieldWidth + ' 0 Z';
        const colorPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        colorPath.classList.add('color-rect');
        colorPath.setAttributeNS(null, 'd', rectPath);
        colorPath.style.fill = '#ffffff';
        colorField.appendChild(colorPath);

        // const colorRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        // colorRect.classList.add('color-rect');
        // colorRect.setAttributeNS(null, 'width', String(fieldWidth));
        // colorRect.setAttributeNS(null, 'height', String(fieldHeight));
        // colorRect.style.fill = '#ffffff';
        // colorField.appendChild(colorRect);

        t79CB.outputFields[fieldIndex]['svgContainerMainView'].innerHTML = '';
        t79CB.outputFields[fieldIndex]['svgContainerMainView'].appendChild(colorField);
        t79CB.outputFields[fieldIndex]['svgContainerMainView'].setAttribute('width', String(fieldWidth) + 'px');
        t79CB.outputFields[fieldIndex]['svgContainerMainView'].style.height = String(fieldHeight) + 'px';
    }

    setColorShades();
}

function setColorShades() {

    const value1 = t79CB.inputColorPicker1.value;
    const rect1 = t79CB.outputFields[0]['svgContainerMainView'].querySelector('.color-rect');
    const color1 = w3color(value1);
    const rgbColor1Str = color1.toRgbString();
    rect1.style.fill = rgbColor1Str;
    t79CB.outputFields[0]['textField'].innerHTML = '<span>' + color1.toHexString() + '</span>';

    const value2 = t79CB.inputColorPicker2.value;
    const rect2 = t79CB.outputFields[t79CB.outputFields.length - 1]['svgContainerMainView'].querySelector('.color-rect');
    const color2 = w3color(value2);
    const rgbColor2Str = color2.toRgbString();
    rect2.style.fill = rgbColor2Str;
    t79CB.outputFields[t79CB.outputFields.length - 1]['textField'].innerHTML = '<span>' + color2.toHexString() + '</span>';

    const rgbColor1 = color1.toRgb();
    const rgbColor2 = color2.toRgb();

    const stepR = (rgbColor2.r - rgbColor1.r) / (t79CB.outputFields.length - 1);
    const stepG = (rgbColor2.g - rgbColor1.g) / (t79CB.outputFields.length - 1);
    const stepB = (rgbColor2.b - rgbColor1.b) / (t79CB.outputFields.length - 1);

    for (colorIndex in t79CB.outputFields) {
        if (colorIndex > 0 && colorIndex < t79CB.outputFields.length - 1) {
            const rectMain = t79CB.outputFields[colorIndex]['svgContainerMainView'].querySelector('.color-rect');
            color = {};

            color['r'] = rgbColor1.r + stepR * colorIndex;
            color['g'] = rgbColor1.g + stepG * colorIndex;
            color['b'] = rgbColor1.b + stepB * colorIndex;

            const rgbColor = 'rgb(' + color['r'] + ',' + color['g'] + ',' + color['b'] + ')';

            const outputColor = w3color(rgbColor);

            rectMain.style.fill = rgbColor;

            t79CB.outputFields[colorIndex]['textField'].innerHTML = '<span>' + outputColor.toHexString() + '</span>';

            console.log(t79CB.outputFields[colorIndex]['textField'].clientWidth);
        }
    }

}

function initColorInputTextfield() {
    t79CB.inputColorText1.value = t79CB.inputColorPicker1.value;
    t79CB.inputColorText2.value = t79CB.inputColorPicker2.value;
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
    t79CB.stepStatus = document.getElementById('step-status');

}

function interpolation(x, x1, y1, x2, y2) {
    return y1 + ((x - x1) * (y2 - y1)) / (x2 - x1);
}

function getCurrentFontSize() {
    var fontSizeString = window.getComputedStyle(t79CB.htmlElement, null).getPropertyValue('font-size');
    t79CB.curentFontSize = parseFloat(fontSizeString);
}


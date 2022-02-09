document.addEventListener('readystatechange', function () {
    if (document.readyState === 'interactive') {
        initColorBlender();
    }
});

window.addEventListener('resize', function () {
    getCurrentFontSize();
    //constructOutputFields();
    setupOutputFieldsTable(t79CB.outputFields.length);
});

var t79CB = {
    MIN_NUMBER_OF_SHADES: 3,
    MAX_NUMBER_OF_SHADES: 20,

    colorInfoTextWidth: 0,
    colorInfoTextHeight: 0,
    colorSpace: 'HSL',
    transparent: 'opaque'
}

function initColorBlender() {
    getElements();
    getCurrentFontSize();
    setEventListener();
    stepSelector(null);
    colorSpaceSelector(null);
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

    if (button != null && button.getAttribute('data-active') == 'true') {
        button.style.backgroundColor = '#fff5';
        window.setTimeout(function () {
            button.style.backgroundColor = null;
        }, 80);
        if (button.id == 'step-button-plus') {
            setupOutputFieldsTable(t79CB.outputFields.length + 1);
        } else {
            setupOutputFieldsTable(t79CB.outputFields.length - 1);
        }
    }

    if (button == null) {
        setupOutputFieldsTable(5);
    }

    t79CB.stepStatus.innerHTML = t79CB.outputFields.length;

    if (t79CB.outputFields.length <= t79CB.MIN_NUMBER_OF_SHADES) {
        t79CB.stepButtonMinus.setAttribute('data-active', 'false');
        t79CB.stepButtonPluss.setAttribute('data-active', 'true');
    } else if (t79CB.outputFields.length >= t79CB.MAX_NUMBER_OF_SHADES) {
        t79CB.stepButtonMinus.setAttribute('data-active', 'true');
        t79CB.stepButtonPluss.setAttribute('data-active', 'false');
    } else {
        t79CB.stepButtonMinus.setAttribute('data-active', 'true');
        t79CB.stepButtonPluss.setAttribute('data-active', 'true');
    }

}

function colorSpaceSelector(button) {

    if (button == null || button.id == 'color-space-button-rgb') {
        t79CB.colorSpace = 'RGB';
        t79CB.colorSpaceButtonRGB.setAttribute('data-selected', 'true');
        t79CB.colorSpaceButtonHSL.setAttribute('data-selected', 'false');
    } else {
        t79CB.colorSpace = 'HSL';
        t79CB.colorSpaceButtonHSL.setAttribute('data-selected', 'true');
        t79CB.colorSpaceButtonRGB.setAttribute('data-selected', 'false');
    }

    setColorShades();

}

function transparentSelector(button) {

    if (button == null || button.id == 'transparent-button-opaque') {
        t79CB.transparent = 'opaque';
        t79CB.transparentButtonOpaque.setAttribute('data-selected', 'true');
        t79CB.transparentButtonColor.setAttribute('data-selected', 'false');
        t79CB.transparentButtonBW.setAttribute('data-selected', 'false');

    } else if (button.id == 'transparent-button-color') {
        t79CB.transparent = 'color';
        t79CB.transparentButtonOpaque.setAttribute('data-selected', 'false');
        t79CB.transparentButtonColor.setAttribute('data-selected', 'true');
        t79CB.transparentButtonBW.setAttribute('data-selected', 'false');

    } else if (button.id == 'transparent-button-bw') {
        t79CB.transparent = 'bw';
        t79CB.transparentButtonOpaque.setAttribute('data-selected', 'false');
        t79CB.transparentButtonColor.setAttribute('data-selected', 'false');
        t79CB.transparentButtonBW.setAttribute('data-selected', 'true');
    }

    setupOutputFieldsTable(t79CB.outputFields.length);

}

function setupOutputFieldsTable(numberOfShades) {

    localStorage.setItem('scrollpos', window.scrollY);

    const cHeightOutput = t79CB.outputColorField.clientHeight;
    t79CB.outputColorField.style.minHeight = '' + cHeightOutput;
    t79CB.outputColorField.innerHTML = '';


    const cHeight = t79CB.outputColorFieldTop.clientHeight;
    t79CB.outputColorFieldTop.style.minHeight = '0px'; //'' + cHeight + 'px';
    t79CB.outputColorFieldTop.innerHTML = '';

    t79CB.outputColorFieldTransparent.innerHTML = '';
    t79CB.outputFields = Array(numberOfShades).fill();

    for (fieldIndex in t79CB.outputFields) {
        let field = {};



        const svgContainer = document.createElement('div');
        svgContainer.classList.add('svg-container-main-view');
        field['svgContainerMainView'] = svgContainer;

        if (t79CB.transparent == 'opaque') {
            const svgTopContainer = document.createElement('div');
            svgTopContainer.classList.add('svg-container-top-view');
            field['svgContainerTopView'] = svgTopContainer;
            t79CB.outputColorFieldTop.appendChild(svgTopContainer);
        } else {

            const svgTransparentContainer = document.createElement('div');
            svgTransparentContainer.classList.add('svg-container-transparent-view');
            field['svgContainerTransparentView'] = svgTransparentContainer;
            t79CB.outputColorFieldTransparent.appendChild(svgTransparentContainer);

        }

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

    let fieldWidth = t79CB.outputColorField.clientWidth / t79CB.outputFields.length * 1.01;
    let fieldHeight = t79CB.curentFontSize * 10;

    console.log('fieldwidth: ' + fieldWidth + ' textWidth: ' + t79CB.colorInfoTextWidth);

    if (t79CB.transparent == 'opaque') {

        for (fieldIndex in t79CB.outputFields) {

            var fWidth;
            if (fieldIndex > 0) {
                fWidth = fieldWidth + 5;
            } else {
                fWidth = fieldWidth
            }

            const colorField = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
            colorField.setAttribute('width', String(fWidth));
            colorField.setAttribute('height', String(fieldHeight));

            const colorRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            colorRect.classList.add('color-rect');
            colorRect.setAttributeNS(null, 'width', String(fWidth));
            colorRect.setAttributeNS(null, 'height', String(fieldHeight));
            colorRect.style.fill = '#ffffff';
            colorField.appendChild(colorRect);

            t79CB.outputFields[fieldIndex]['svgContainerTopView'].style.minHeight = String(fieldHeight) + 'px';
            t79CB.outputFields[fieldIndex]['svgContainerTopView'].innerHTML = '';
            t79CB.outputFields[fieldIndex]['svgContainerTopView'].appendChild(colorField);
            t79CB.outputFields[fieldIndex]['svgContainerTopView'].setAttribute('width', String(fWidth) + 'px');
            t79CB.outputFields[fieldIndex]['svgContainerTopView'].style.height = String(fieldHeight) + 'px';
        }

    } else {

        //t79CB.outputFields[fieldIndex]['svgContainerTopView'].style.display = 'none';

        fieldHeight = interpolation(t79CB.outputFields.length, 3, fieldWidth * 0.5, 20, fieldWidth * 1.5);

        for (fieldIndex in t79CB.outputFields) {
            let transparents = Array(5).fill();

            console.log('going to add 5 images');

            const transparentColumnContainer = document.createElement('div');
            transparentColumnContainer.classList.add('transparent-column-container');
            t79CB.outputFields[fieldIndex]['svgContainerTransparentView'].innerHTML = '';
            //t79CB.outputFields[fieldIndex]['scgContainerTransparentView'].appendChild(transparentColumnContainer);

            for (transparentIndex in transparents) {
                //const transparentContainer = document.createElement('div');
                //transparentContainer.classList.add('transparent-container');
                //transparentColumnContainer.appendChild(transparentContainer);

                //transparentContainer.style.backgroundImage = 'url(assets/astronaut.jpg)';
                //transparentContainer.style.height = '' + fieldHeight;
                const colorField = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
                colorField.classList.add('transparent-field');
                colorField.setAttribute('width', String(fieldWidth));
                colorField.setAttribute('height', String(fieldHeight));
                if (t79CB.transparent == 'color') {
                    colorField.style.backgroundImage = 'url(assets/astronaut.jpg)';

                } else {
                    colorField.style.backgroundImage = 'url(assets/cameraman.png)';

                }

                const colorRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                colorRect.classList.add('color-rect');
                colorRect.setAttributeNS(null, 'width', String(fieldWidth + 10));
                colorRect.setAttributeNS(null, 'height', String(fieldHeight + 10));
                colorField.appendChild(colorRect);
                t79CB.outputFields[fieldIndex]['svgContainerTransparentView'].appendChild(colorField);

                transparents[transparentIndex] = colorField;

                console.log('added 1 images');
            }

            t79CB.outputFields[fieldIndex]['svgContainerTransparentView'] = transparents;
        }

    }

    setColorShades();
}

function setColorShades() {



    const color1 = w3color(t79CB.inputColorPicker1.value);
    const color2 = w3color(t79CB.inputColorPicker2.value);

    var csColor1;
    var csColor2;

    var step1;
    var step2;
    var step3;

    if (t79CB.colorSpace == 'RGB') {

        csColor1 = color1.toRgb();
        csColor2 = color2.toRgb();

        step1 = (csColor2.r - csColor1.r) / (t79CB.outputFields.length - 1);
        step2 = (csColor2.g - csColor1.g) / (t79CB.outputFields.length - 1);
        step3 = (csColor2.b - csColor1.b) / (t79CB.outputFields.length - 1);

    } else if (t79CB.colorSpace == 'HSL') {

        csColor1 = color1.toHsl();
        csColor2 = color2.toHsl();

        step1 = (csColor2.h - csColor1.h) / (t79CB.outputFields.length - 1);
        step2 = (csColor2.s - csColor1.s) / (t79CB.outputFields.length - 1);
        step3 = (csColor2.l - csColor1.l) / (t79CB.outputFields.length - 1);
    }

    t79CB.colorInfoTextWidth = 0;
    t79CB.colorInfoTextHeight = 0;

    for (fieldIndex in t79CB.outputFields) {

        var color;

        if (fieldIndex == 0) {
            color = color1;
        } else if (fieldIndex == t79CB.outputFields.length - 1) {
            color = color2;
        } else {

            const color3 = {};

            if (t79CB.colorSpace == 'RGB') {
                color3['r'] = csColor1.r + step1 * fieldIndex;
                color3['g'] = csColor1.g + step2 * fieldIndex;
                color3['b'] = csColor1.b + step3 * fieldIndex;

                const rgbColor = 'rgb(' + color3['r'] + ',' + color3['g'] + ',' + color3['b'] + ')';
                color = w3color(rgbColor);

            } else if (t79CB.colorSpace == 'HSL') {
                color3['h'] = csColor1.h + step1 * fieldIndex;
                color3['s'] = csColor1.s + step2 * fieldIndex;
                color3['l'] = csColor1.l + step3 * fieldIndex;

                const hslColor = 'hsl(' + color3['h'] + ',' + color3['s'] + ',' + color3['l'] + ')';
                color = w3color(hslColor);
            }
        }

        t79CB.outputFields[fieldIndex]['color'] = color;

        const colorText = document.createElement('div');
        const value1 = document.createElement('span');
        value1.innerHTML = color.toHexString();
        const value2 = document.createElement('span');
        value2.innerHTML = color.toRgbString();
        const value3 = document.createElement('span');
        value3.innerHTML = color.toHslString();
        colorText.appendChild(value1);
        colorText.appendChild(value2);
        colorText.appendChild(value3);
        colorText.style.display = 'inline-block';
        colorText.style.fontSize = '1em';
        colorText.style.width = '100%';

        t79CB.outputFields[fieldIndex]['textField'].innerHTML = '';
        t79CB.outputFields[fieldIndex]['textField'].appendChild(colorText);

        if (colorText.clientWidth > t79CB.colorInfoTextWidth) {
            t79CB.colorInfoTextWidth = colorText.clientWidth;
        }
        if (colorText.clientHeight > t79CB.colorInfoTextHeight) {
            t79CB.colorInfoTextHeight = colorText.clientHeight;
        }
    }

    if (t79CB.colorInfoTextWidth > t79CB.outputColorField.clientWidth * 0.55) {

        t79CB.colorInfoTextWidth = 0;
        t79CB.colorInfoTextHeight = 0;

        for (fieldIndex in t79CB.outputFields) {
            textElm = t79CB.outputFields[fieldIndex]['textField'].firstChild;
            textElm.style.fontSize = '0.9em';
            if (textElm.clientWidth > t79CB.colorInfoTextWidth) {
                t79CB.colorInfoTextWidth = textElm.clientWidth;
            }
            if (textElm.clientHeight > t79CB.colorInfoTextHeight) {
                t79CB.colorInfoTextHeight = textElm.clientHeight;
            }
        }
    }



    if (t79CB.colorInfoTextWidth > t79CB.outputColorField.clientWidth * 0.55) {

        t79CB.colorInfoTextWidth = 0;
        t79CB.colorInfoTextHeight = 0;

        for (fieldIndex in t79CB.outputFields) {
            textElm = t79CB.outputFields[fieldIndex]['textField'].firstChild;
            textElm.style.fontSize = '0.9em';
            textElm.firstChild.style.width = '100%';
            textElm.firstChild.style.display = 'block';
            if (textElm.clientWidth > t79CB.colorInfoTextWidth) {
                t79CB.colorInfoTextWidth = textElm.clientWidth;
            }
            if (textElm.clientHeight > t79CB.colorInfoTextHeight) {
                t79CB.colorInfoTextHeight = textElm.clientHeight;
            }
        }
    }

    if (t79CB.colorInfoTextWidth > t79CB.outputColorField.clientWidth * 0.55) {

        t79CB.colorInfoTextWidth = 0;
        t79CB.colorInfoTextHeight = 0;

        for (fieldIndex in t79CB.outputFields) {
            textElm = t79CB.outputFields[fieldIndex]['textField'].firstChild;
            textElm.style.fontSize = '0.9em';
            textElm.firstChild.nextSibling.style.width = '100%';
            textElm.firstChild.nextSibling.style.display = 'block';
            if (textElm.clientWidth > t79CB.colorInfoTextWidth) {
                t79CB.colorInfoTextWidth = textElm.clientWidth;
            }
            if (textElm.clientHeight > t79CB.colorInfoTextHeight) {
                t79CB.colorInfoTextHeight = textElm.clientHeight;
            }
        }
    }

    constructOutputFieldsPart2();

    const alpha = [0.98, 0.92, 0.80, 0.56, 0.25];

    for (fieldIndex in t79CB.outputFields) {
        const rectMain = t79CB.outputFields[fieldIndex]['svgContainerMainView'].querySelector('.color-rect');
        rectMain.style.fill = t79CB.outputFields[fieldIndex]['color'].toRgbString();

        if (t79CB.transparent == 'opaque') {
            const rectTop = t79CB.outputFields[fieldIndex]['svgContainerTopView'].querySelector('.color-rect');
            rectTop.style.fill = t79CB.outputFields[fieldIndex]['color'].toRgbString();

        } else {

            for (transparentIndex in t79CB.outputFields[fieldIndex]['svgContainerTransparentView']) {
                const rectMain = t79CB.outputFields[fieldIndex]['svgContainerTransparentView'][transparentIndex].querySelector('.color-rect');

                console.log(t79CB.outputFields[fieldIndex]['color'].toRgbString());

                const colorSplit1 = t79CB.outputFields[fieldIndex]['color'].toRgbString().split('(');
                console.log(colorSplit1);
                const colorSplit2 = colorSplit1[1].split(')');
                const colorValues = colorSplit2[0].split(',');
                const newColor = 'rgba(' + colorValues[0] + ',' + colorValues[1] + ',' + colorValues[2] + ',' + alpha[transparentIndex] + ')';



                rectMain.style.fill = newColor;
            }

        }

    }

    const scrollpos = localStorage.getItem('scrollpos');
    if (scrollpos) window.scrollTo(0, scrollpos);

}


function constructOutputFieldsPart2() {

    const outputDivWidth = t79CB.outputColorField.clientWidth;

    const standarFieldHeight = t79CB.curentFontSize * 6;
    const minStandardFieldHeight = t79CB.curentFontSize * 3.5;
    const cutof = t79CB.curentFontSize * 0.5;

    const fieldHeight = Math.max(interpolation(t79CB.outputFields.length, 3, standarFieldHeight, 20, minStandardFieldHeight), (t79CB.colorInfoTextHeight + t79CB.curentFontSize));
    console.log('fieldHeight: ' + fieldHeight + '  ' + (t79CB.colorInfoTextHeight + t79CB.curentFontSize) + '  ' + interpolation(t79CB.outputFields.length, 3, standarFieldHeight, 20, minStandardFieldHeight));
    const fieldWidth = outputDivWidth - (t79CB.colorInfoTextWidth + t79CB.curentFontSize * 2);

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

        t79CB.outputFields[fieldIndex]['svgContainerMainView'].style.minHeight = String(fieldHeight) + 'px';
        t79CB.outputFields[fieldIndex]['svgContainerMainView'].innerHTML = '';
        t79CB.outputFields[fieldIndex]['svgContainerMainView'].appendChild(colorField);
        t79CB.outputFields[fieldIndex]['svgContainerMainView'].setAttribute('width', String(fieldWidth) + 'px');
        t79CB.outputFields[fieldIndex]['svgContainerMainView'].style.height = String(fieldHeight) + 'px';
    }
}



function initColorInputTextfield() {
    t79CB.inputColorText1.value = t79CB.inputColorPicker1.value;
    t79CB.inputColorText2.value = t79CB.inputColorPicker2.value;
}

function setEventListener() {
    t79CB.inputColorText1.addEventListener('input', setColor);
    t79CB.inputColorPicker1.addEventListener('input', setColor);
    t79CB.inputColorText2.addEventListener('input', setColor);
    t79CB.inputColorPicker2.addEventListener('input', setColor);
}

function getElements() {
    t79CB.outputColorField = document.getElementById('output-colors');
    t79CB.outputColorFieldTop = document.getElementById('top-view');
    t79CB.outputColorFieldTransparent = document.getElementById('transparent-view');
    t79CB.inputColorText1 = document.getElementById('color-text-1');
    t79CB.inputColorPicker1 = document.getElementById('color-picker-1');
    t79CB.inputColorText2 = document.getElementById('color-text-2');
    t79CB.inputColorPicker2 = document.getElementById('color-picker-2');
    t79CB.htmlElement = document.querySelector('html');
    t79CB.stepStatus = document.getElementById('step-status');
    t79CB.stepButtonMinus = document.getElementById('step-button-minus');
    t79CB.stepButtonPluss = document.getElementById('step-button-plus');
    t79CB.colorSpaceButtonRGB = document.getElementById('color-space-button-rgb');
    t79CB.colorSpaceButtonHSL = document.getElementById('color-space-button-hsl');
    t79CB.transparentButtonOpaque = document.getElementById('transparent-button-opaque');
    t79CB.transparentButtonColor = document.getElementById('transparent-button-color');
    t79CB.transparentButtonBW = document.getElementById('transparent-button-bw');

}

function interpolation(x, x1, y1, x2, y2) {
    return y1 + ((x - x1) * (y2 - y1)) / (x2 - x1);
}

function getCurrentFontSize() {
    var fontSizeString = window.getComputedStyle(t79CB.htmlElement, null).getPropertyValue('font-size');
    t79CB.curentFontSize = parseFloat(fontSizeString);
}


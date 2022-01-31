document.addEventListener('readystatechange', function () {
    if (document.readyState === 'interactive') {
        initColorBlender();
    }
});

window.addEventListener('resize', function () {
});

var t79CB = {
 
}

function initColorBlender() {
    getElements();
}

function getElements() {
    t79CB.outputColorField = document.getElementById('output-colors');
    t79CB.inputNumberOfShadesSlider = document.getElementById('number-of-shades-slider');
    t79CB.inputColorText1 = document.getElementById('color-text-1');
    t79CB.inputColorPicker1 = document.getElementById('color-picker-1');
    t79CB.inputColorText2 = document.getElementById('color-text-2');
    t79CB.inputColorPicker2 = document.getElementById('color-picker-2');
}


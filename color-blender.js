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

    pageInit: false,

    colorInfoTextWidth: 0,
    colorInfoTextHeight: 0,
    colorSpace: 'HSL',
    transparent: 'opaque',

    colorWheel: '<svg width="80" height="80"><g transform="translate(40,40)" d="M0,8L0,-33"><path d="M-2.0604212271251416,-26.891862436105733A1,1,0,0,1,-1.1036423264050035,-27.97824107436648A28,28,0,0,1,3.368734777765373,-27.796611771888205A1,1,0,0,1,4.234269547723441,-26.63622650288221L1.1820746894374747,-8.688049664794688A0.8353768929313344,0.8353768929313344,0,0,1,-0.4736769173378053,-8.75529198412761Z" fill="rgb(255,0,0)"></path><path d="M4.808425778461373,-26.53858780057165A1,1,0,0,1,6.008875190129991,-27.34764009836023A28,28,0,0,1,7.87213395085613,-26.870606749006956A1,1,0,0,1,8.53610774939377,-25.5842229783584L2.4594053907129934,-8.005761382488854A0.39830387508575305,0.39830387508575305,0,0,1,1.690293287549282,-8.202670223243395Z" fill="rgb(255,82,0)"></path><path d="M9.08654561046571,-25.393941989863418A1,1,0,0,1,10.403210274183332,-25.995638403223076A28,28,0,0,1,16.54186107898156,-22.591299919298027A1,1,0,0,1,16.728736901862774,-21.155778467924005L5.373217334838146,-7.109580605648766A1,1,0,0,1,4.084942897009922,-6.878462148486986A8,8,0,0,0,3.6714620731271106,-7.107768021368535A1,1,0,0,1,3.185273392628353,-8.322958267937913Z" fill="rgb(255,128,0)"></path><path d="M17.18164337951197,-20.789630388607076A1,1,0,0,1,18.62445921281447,-20.907642598586058A28,28,0,0,1,20.01584427714987,-19.57973385602794A1,1,0,0,1,19.965283058697693,-18.132983022704824L6.062885521263746,-5.777742582122217A0.3983038750857458,0.3983038750857458,0,0,1,5.488552467960664,-6.325874010416328Z" fill="rgb(255,191,0)"></path><path d="M20.352165157796843,-17.697654485987194A1,1,0,0,1,21.794842762177794,-17.57796430113415A28,28,0,0,1,22.95016330945208,-16.040261970101344A1,1,0,0,1,22.66352827359068,-14.621288831966147L6.926658449844941,-4.707684452935392A0.3983038750857479,0.3983038750857479,0,0,1,6.4497676203628975,-5.342414045404591Z" fill="rgb(255,255,0)"></path><path d="M22.973954937502462,-14.12851710000835A1,1,0,0,1,24.377597057607474,-13.774351588983322A28,28,0,0,1,27.0374763599182,-7.27838389251792A1,1,0,0,1,26.285318800128053,-6.041491247304506L8.639434313551249,-2.1858123564147722A1,1,0,0,1,7.4897490823378075,-2.8113446397800415A8,8,0,0,0,7.310587712792464,-3.2488932413312464A1,1,0,0,1,7.691397523129634,-4.501111535700656Z" fill="rgb(225,255,0)"></path><path d="M26.40964155013781,-5.472516250214045A1,1,0,0,1,27.609149188505654,-4.662068327130947A28,28,0,0,1,19.21089737987245,20.370110992824998A1,1,0,0,1,17.76531132024648,20.29313466693464L6.015343267919315,6.575199334219459A1,1,0,0,1,6.022067421949062,5.2663748409603155A8,8,0,0,0,7.979754363984195,-0.568788440876921A1,1,0,0,1,8.763757063561004,-1.6168373593243102Z" fill="rgb(0,189,0)"></path><path d="M17.32298936002079,20.672001367749292A1,1,0,0,1,17.176969992256574,22.11225230240278A28,28,0,0,1,6.78335580824785,27.165899285293506A1,1,0,0,1,5.560406928279752,26.391276507731888L2.027656629488309,8.67791504386361A1,1,0,0,1,2.674082490683542,7.539846340146445A8,8,0,0,0,4.2787010897068845,6.759638820598414A1,1,0,0,1,5.573021307693625,6.954066035034113Z" fill="rgb(0,219,164)"></path><path d="M4.989256199335935,26.505186728129463A1,1,0,0,1,4.1570355833536015,27.689692218562705A28,28,0,0,1,-8.361587184939921,26.722347571810534A1,1,0,0,1,-9.001955643633996,25.42405151634311L-2.7898823318036627,8.463696443653445A1,1,0,0,1,-1.6452317860993189,7.82899817154203A8,8,0,0,0,0.422950869345613,7.988811711520042A1,1,0,0,1,1.456505900544491,8.791825264261188Z" fill="rgb(4,255,255)"></path><path d="M-9.54882638765805,25.22374903803928A1,1,0,0,1,-10.87626084751109,25.801297447548976A28,28,0,0,1,-16.951710678644115,22.285410139091965A1,1,0,0,1,-17.11233688324009,20.846715024437856L-5.502170865000036,7.010257961585078A1,1,0,0,1,-4.209890152783163,6.80270717446366A8,8,0,0,0,-3.8006663540174643,7.0395266364606925A1,1,0,0,1,-3.33675307582772,8.263393965349618Z" fill="rgb(0,170,255)"></path><path d="M-17.55848046550527,20.47235610910703A1,1,0,0,1,-19.003211016351074,20.56399696236199A28,28,0,0,1,-23.520674888119864,15.191374289621322A1,1,0,0,1,-23.182407311620604,13.78381631311668L-7.558433352328595,4.720983602389331A1,1,0,0,1,-6.272601622827299,4.965326664108248A8,8,0,0,0,-5.968319013674838,5.327210165837968A1,1,0,0,1,-5.948314447265217,6.635899046254253Z" fill="rgb(26,0,255)"></path><path d="M-23.474629853320913,13.280035924845867A1,1,0,0,1,-24.864400690338012,12.874842846043546A28,28,0,0,1,-27.730448479095358,-3.8758517964749304A1,1,0,0,1,-26.554448587217276,-4.720048849795576L-8.80615192937286,-1.3672194821698886A1,1,0,0,1,-7.992692143362888,-0.34186591146996714A8,8,0,0,0,-7.424366596157139,2.9797282838987273A1,1,0,0,1,-7.850655894028898,4.217203214118516Z" fill="rgb(144,0,255)"></path><path d="M-26.446339748516632,-5.29232603130719A1,1,0,0,1,-27.23333201722129,-6.507351783927934A28,28,0,0,1,-18.45412313500927,-21.058141877143758A1,1,0,0,1,-17.012312831627998,-20.92842117873318L-5.771190540161484,-6.7905051847983176A1,1,0,0,1,-5.825711126482151,-5.48279945564144A8,8,0,0,0,-7.566592318899395,-2.597437329286825A1,1,0,0,1,-8.698043090672208,-1.939496663681502Z" fill="rgb(255,0,255)"></path><path d="M-16.55644898883602,-21.290880625180655A1,1,0,0,1,-16.357926160286755,-22.724837771359475A28,28,0,0,1,-14.759257370240174,-23.794207737998153A1,1,0,0,1,-13.358112315605215,-23.430288864614933L-4.321260897717938,-7.174091889784506A0.39830387508574644,0.39830387508574644,0,0,1,-4.981156099228078,-6.732679563468085Z" fill="rgb(255,0,154)"></path><path d="M-12.849078789366926,-23.71326158882964A1,1,0,0,1,-12.41857044232353,-25.095400139648067A28,28,0,0,1,-8.260991441879815,-26.753616959155046A1,1,0,0,1,-6.997453675868847,-26.04713502421508L-2.464117390706706,-8.41472715149842A0.8353768929313433,0.8353768929313433,0,0,1,-4.003325277237741,-7.800826512234283Z" fill="rgb(255,0,98)"></path><path d="M-6.433398789717434,-26.192154950062516A1,1,0,0,1,-5.667300003913365,-27.420461532688385A28,28,0,0,1,-3.7714950572937305,-27.74483420445703A1,1,0,0,1,-2.6406041071557818,-26.841103011331224L-1.0195808052895754,-8.312721887005662A0.3983038750857483,0.3983038750857483,0,0,1,-1.8021272558505055,-8.178828005462558Z" fill="rgb(255,0,72)"></path><path d="M0,8L0,-33" transform="rotate(',
    colorWheel2: ')" stroke="',
    colorWheel3: '" stroke-width="2px"></path></g></svg>',
}

function initColorBlender() {
    getElements();
    getCurrentFontSize();
    setEventListener();
    stepSelector(null);
    colorSpaceSelector(null);
    initColorInputTextfield();
    t79CB.pageInit = true;
}

function setColor(e) {

    const oldPosition = t79CB.controlersContainer.getBoundingClientRect().top;

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

    if (t79CB.pageInit) {
        const newPosition = t79CB.controlersContainer.getBoundingClientRect().top;
        window.scrollBy(0, (newPosition - oldPosition));
    }

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

    const oldPosition = t79CB.controlersContainer.getBoundingClientRect().top;

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

    if (t79CB.pageInit) {
        const newPosition = t79CB.controlersContainer.getBoundingClientRect().top;
        window.scrollBy(0, (newPosition - oldPosition));
    }
}

function colorSpaceSelector(button) {

    const oldPosition = t79CB.controlersContainer.getBoundingClientRect().top;

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

    if (t79CB.pageInit) {
        const newPosition = t79CB.controlersContainer.getBoundingClientRect().top;
        window.scrollBy(0, (newPosition - oldPosition));
    }

}

function transparentSelector(button) {


    const oldPosition = t79CB.controlersContainer.getBoundingClientRect().top;

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

    const newPosition = t79CB.controlersContainer.getBoundingClientRect().top;

    window.scrollBy(0,(newPosition - oldPosition));
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
    let fieldHeight = t79CB.curentFontSize * 15;

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


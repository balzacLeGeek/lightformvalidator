(function () {
    const greatMessage = 'LightValidator has been instancied';

    // Ligth Form Validator constructor
    this.LightValidator = function () {
        helloMsg()
    }

    const helloMsg = () => {
        // console.log(`%c Hello`, 'font-weight: bold, font-size: 18px, color: #1d1e3d')
        console.log(`%c 🥳 ${ greatMessage } `, "color: #1d1e3d; background: #bcbcbc; padding: 5px; font-size: 15px;");
    }
})();
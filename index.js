(function () {
    const greatMessage = 'LightValidator has been instancied';

    // Ligth Form Validator constructor
    this.LightValidator = function () {
        const defaultOptions = {
            id: null,
            className: 'light-validator'
            // Future options goes here
        }

        // Plugin options
        // Create options by extending defaultOptions with the passed in arugments, assing defaultOptions otherwise
        this.options    = (arguments[0] && typeof arguments[0] === 'object') ? extendDefaultOptions(defaultOptions, arguments[0]) : defaultOptions

        helloMsg()
    }

    // Extends defaultOptions with the provided options
    const extendDefaultOptions = (defaultOptions, options) => {
        let property;

        for (property in options) {
            if (options.hasOwnProperty(property)) {
                defaultOptions[property] = options[property]
            }
        }

        return defaultOptions;
    }

    const helloMsg = () => {
        // console.log(`%c Hello`, 'font-weight: bold, font-size: 18px, color: #1d1e3d')
        console.log(`%c 🥳 ${ greatMessage } `, "color: #1d1e3d; background: #bcbcbc; padding: 5px; font-size: 15px;");
    }
})();
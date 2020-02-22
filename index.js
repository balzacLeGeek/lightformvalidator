(function () {
    const greatMessage  = 'LightValidator has been instancied';
    const errorStyle    = "color: #ffffff; background: #fd4042; padding: 5px; font-size: 15px;"

    const ERR_MSG_FORM_ID_MISSED = '"id: YOUR_FORM_ID" option must be defined'

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

        if (verifyOptions.call(this)) {
            this.form = getForm(this.options.id)
        }

        helloMsg()
    }

    function verifyOptions() {
        const formId = this.options.id

        if (!formId) {
            throwError(ERR_MSG_FORM_ID_MISSED)
        }

        return true
    }

    const getForm = formId => {
        const formNode = document.getElementById(formId)

        if (!formNode) {
            throwError(`Form with id "${formId}" not found`)
        }

        return formNode
    }

    const throwError = message => {
        console.info(`%c ❌ ${ message } `, errorStyle)
        throw message
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
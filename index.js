(function() {
  const greatMessage = "LightValidator has been instancied";
  const errorStyle =
    "color: #ffffff; background: #fd4042; padding: 5px; font-size: 15px;";

  const ERR_MSG_FORM_ID_MISSED = '"id: YOUR_FORM_ID" option must be defined';

  // Ligth Form Validator constructor
  this.LightValidator = function() {
    const defaultOptions = {
      id: null,
      className: "light-validator"
      // Future options goes here
    };

    // Plugin options
    // Create options by extending defaultOptions with the passed in arugments, assing defaultOptions otherwise
    this.options =
      arguments[0] && typeof arguments[0] === "object"
        ? extendDefaultOptions(defaultOptions, arguments[0])
        : defaultOptions;

    if (verifyOptions.call(this)) {
      this.form = getForm(this.options.id);
    }

    helloMsg();
  };

  LightValidator.prototype.validate = function() {
    return new Promise(resolve => {
      const _ = this;
      const form = _.form;

      onKeyUp(form);

      form.addEventListener("submit", function(e) {
        e.preventDefault();
        const formDatas = serializeForm(form);

        if (formHasError(form)) {
          throwError(`Form has error`);
        }

        resolve(formDatas);

        return formDatas;
      });
    });
  };
  /**
   * Resets form elements
   *
   * @param {Node} form The form node
   */
  LightValidator.prototype.reset = form => {
    loopElements(form, element => {
      switch (element.tagName.toLowerCase()) {
        case "select":
          element.querySelector("option").selected = "selected";
          break;
        default:
          element.value = "";
      }
    });
  };

  /**
   *
   *
   * @param {Node} form
   * @return {Boolean}
   */
  const formHasError = form => {
    var errorList = [];

    loopElements(form, element => {
      errorList.push(processFielValidation(element, false));
    });

    return errorList.indexOf(true) !== -1;
  };

  /**
   * Loops all form elements and process item in the given callback function
   *
   * @param {Node} form
   * @param {Function} callback A callback function
   */
  const loopElements = (form, callback) => {
    getElements(form).forEach(element => {
      callback(element);
    });
  };

  const getFormChildren = (form, type, selector) => {
    return form[`querySelector${type}`](selector);
  };

  const getElements = form => {
    return getFormChildren(form, "All", "[name]");
  };

  const processFielValidation = (element, checkError) => {
    const $parent = element.closest("div");

    if (element.required) {
      if (element.value === "") {
        element.classList.add("invalid-field");
        $parent.classList.add("invalid-field-wrapper");

        showInvalidMessage($parent, element.name);

        if (checkError !== undefined) {
          checkError = true;
        }
      } else {
        $parent.classList.remove("invalid-field-wrapper");
        element.classList.remove("invalid-field");

        if (element.type === "email") {
          const emailValue = element.value;

          if (!validEmail(emailValue)) {
            showInvalidMessage(
              $parent,
              "",
              `<strong><em>${emailValue}</em></strong> is not an email address valid`
            );
          } else {
            removeInvalidMessage($parent);
          }
        } else {
          removeInvalidMessage($parent);
        }
      }
    }

    return checkError;
  };

  /**
   * Trigger form validation on form element KeyUp
   *
   * @param {Node} form The form node
   */
  function onKeyUp(form) {
    loopElements(form, function(element) {
      element.onkeyup = function() {
        processFielValidation(this);
      };
    });
  }

  /**
   * Serializes form
   *
   * @param {Node} form The form node
   * @return {Object} The form datas { name: value }
   */
  const serializeForm = form => {
    const serialized = {};

    loopElements(form, element => {
      const elementType = element.type;

      if (
        (elementType === "radio" && element.checked) ||
        elementType !== "radio"
      ) {
        serialized[element.name] = element.value;
      }
    });

    return serialized;
  };

  function removeInvalidMessage(parent) {
    const $invalidMessage = getFormChildren(parent, "", ".invalid-message");

    if ($invalidMessage) {
      $invalidMessage.parentNode.removeChild($invalidMessage);
    }
  }

  function showInvalidMessage(parent, fieldName, custom) {
    const div = document.createElement("div");
    const userMessageError = parent.querySelector("[data-error]");

    removeInvalidMessage(parent);

    div.classList.add("invalid-message");

    if (userMessageError) {
      div.textContent = userMessageError.dataset.error;
    } else {
      div.innerHTML = custom
        ? custom
        : `<strong><em>${fieldName}</em></strong> is required.`;
    }

    parent.appendChild(div);
  }

  const validEmail = value => /^.+@.+\..{2,}$/.test(value);

  function verifyOptions() {
    const formId = this.options.id;

    if (!formId) {
      throwError(ERR_MSG_FORM_ID_MISSED);
    }

    return true;
  }

  const getForm = formId => {
    const formNode = document.getElementById(formId);

    if (!formNode) {
      throwError(`Form with id "${formId}" not found`);
    }

    const nodeName = formNode.nodeName.toLowerCase();

    if (nodeName !== "form") {
      throwError(
        `LightValidator element must be a <form>, <${nodeName}> given`
      );
    }

    return formNode;
  };

  const throwError = message => {
    console.info(`%c ❌ ${message} `, errorStyle);
    throw message;
  };

  // Extends defaultOptions with the provided options
  const extendDefaultOptions = (defaultOptions, options) => {
    let property;

    for (property in options) {
      if (options.hasOwnProperty(property)) {
        defaultOptions[property] = options[property];
      }
    }

    return defaultOptions;
  };

  const helloMsg = () => {
    // console.log(`%c Hello`, 'font-weight: bold, font-size: 18px, color: #1d1e3d')
    console.log(
      `%c 🥳 ${greatMessage} `,
      "color: #1d1e3d; background: #bcbcbc; padding: 5px; font-size: 15px;"
    );
  };
})();

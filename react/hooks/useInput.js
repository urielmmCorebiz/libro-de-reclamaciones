import { useState } from "react";

export default function useInput(props) {
  const {
    // Nombre del campo en el formulario
    name,
    // Valor inicial
    value,
    // Objeto de errores a mostrar incluye required, default y min, ver + abajo
    errors = {},
    // Tipo del input
    type = type,
    // Activar o desactivar correciones ortograficas
    spellCheck = false,
    // Marcar como requerido
    required = false,
    // Expresion para activar errores
    regexp = null,
    // Expresion para remplazar
    regexpOverwrite = null,
    placeholder = "",
    // Evento en cual validar ya sea change o blur
    validateEvent = "",
    // Mandar todo a minuscula
    toLowerCase = false,
    // Mandar todo a mayuscula
    toUpperCase = false,
    /**
     * Funcion para hacer un replace custom ej:
     * (valor) => { return nuevoValor }
     */
    replacer = null,
    minlength = null,
    maxlength = null,
    /**
     * Funcion para hacer un validacion personalizada:
     * (valor) => { return esValido; }
     */
    customValidation = null,
    // Desactivar interaccion en el input
    disabled = false,
    // Forzar validacion de longitud en blur
    validateMinLengthOnBlur = false,
    // Regex para generar mascara, recordar que reemplazara solo los grupos de captura
    maskRegex = null,
    // Array de indices de la cadena donde se tiene que mantener caracter fijo
    maskPermanents = null,
    // Cartacter fijo a mostrar en las mascaras ej "/" en "23/02/1991"
    maskPermanentChar = " ",
    // Caracter que reemplazara los grupos de captura
    maskChar = "*",
    // activar prefill de los permanentes
    maskPrefill = false,
  } = props;

  const [data, setData] = useState({
    value: value || "",
    displayValue: value || "",
    error: "",
  });

  const { requiredError = "", defaultError = "", minlengthError = "" } = errors;

  const validate = (config = {}) => {
    const { avoidValidation = false } = config;
    const value = data.value;
    let error = "";
    if (required && !value) error = requiredError;
    else if (minlength > value.length && !!value.length) error = minlengthError;
    else if (regexp && value) {
      if (!new RegExp(regexp).test(value)) error = defaultError;
    }
    if (customValidation) {
      if (!customValidation(value)) error = defaultError;
    }
    if (!avoidValidation) setData((data) => ({ ...data, error }));
    return !!error;
  };

  const input = {
    disabled,
    spellCheck,
    placeholder,
    type: type || "text",
    onChange: (e) => {
      let value = e.target.value;
      let error = "";
      if (toLowerCase) value = value.toLowerCase();
      else if (toUpperCase) value = value.toUpperCase();

      if (maxlength) value = value.substring(0, maxlength);

      if (validateEvent === "change") {
        if (required && !value) error = requiredError;
        else if (!validateMinLengthOnBlur && minlength > value.length)
          error = minlengthError;
        else if (regexp && value) {
          if (!new RegExp(regexp).test(value)) error = defaultError;
        }
        if (customValidation) {
          if (!customValidation(value)) error = defaultError;
        }
      }

      if (regexpOverwrite) {
        value = (value.match(new RegExp(regexpOverwrite)) || []).join("");
      }

      let displayValue = value;

      if (maskPermanents) {
        maskPermanents.forEach((indexValue) => {
          if (displayValue.length === indexValue)
            displayValue += maskPermanentChar;
          else if (displayValue.length > indexValue) {
            displayValue =
              displayValue.substring(0, indexValue) +
              maskPermanentChar +
              displayValue.substring(indexValue);
          }
        });
      }

      if (maskRegex) {
        displayValue.replace(maskRegex, function () {
          const args = Array.from(arguments);
          args.forEach((groupValue, index) => {
            if (groupValue && index > 0 && index < args.length - 2) {
              displayValue = displayValue.replace(
                groupValue,
                maskChar.repeat(groupValue.length)
              );
            }
          });
        });
      }

      if (maskPermanents && maskPrefill) {
        const lastPermanent = maskPermanents[maskPermanents.length - 1];
        if (displayValue.length < lastPermanent)
          displayValue.padEnd(lastPermanent, " ");
      }

      if (maskPermanents) {
        maskPermanents.forEach((indexValue) => {
          if (displayValue[indexValue]) {
            displayValue =
              displayValue.substring(0, indexValue) +
              maskPermanentChar +
              displayValue.substring(indexValue + 1);
          }
        });
      }

      if (replacer) value = replacer(value);

      setData({ value, displayValue, error });
    },
    onBlur: (e) => {
      let value = e.target.value;
      let error = "";

      if (validateEvent === "blur") {
        if (required && !value) error = requiredError;
        else if (minlength > value.length) error = minlengthError;
        else if (regexp && value) {
          if (!new RegExp(regexp).test(value)) error = defaultError;
        }
        if (customValidation) {
          if (!customValidation(value)) error = defaultError;
        }
      } else if (validateMinLengthOnBlur) {
        if (minlength > value.length) error = minlengthError;
      }

      setData((state) => ({ ...state, value, error }));
    },
    value: data.value,
    error: data.error,
  };

  return {
    input: { input, displayValue: data.displayValue, id: name, name: name },
    setData,
    validate,
    type,
  };
}

function createErrors(fields) {
  return fields
    .flatMap((field) => {
      if (!field) return null;
      else if (field.input) return field.validate() && field;
    })
    .filter(Boolean);
}

function createData(field) {
  if (!field) return null;
  else if (field.fields) {
    let object = {};
    field.fields.forEach((field) => {
      if (field) {
        if (field.name) {
          object = {
            ...object,
            [field.name]: field.fields.map(({ fields }) =>
              createData({ fields })
            ),
          };
        } else {
          const data = createData(field);
          object = { ...object, ...data };
        }
      }
    });
    return object;
  } else if (field.input) {
    return {
      [field.input.$$name || field.input.name]: field.input.input.value,
    };
  }
}

useInput.__proto__.validateData = function validateData(fields) {
  const errorsArray = createErrors(fields);
  const data = createData({ fields });
  const errors = (errorsArray.length && errorsArray) || void 0;
  return { data, errors };
};

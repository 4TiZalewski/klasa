// Copyright (c) 2024 4TiZalewski

// @ts-check

/**
 * @type {HTMLButtonElement | null}
 */
const submit_button_null = document.querySelector(".submit");

/**
 * @type {HTMLButtonElement | null}
 */
const clear_button_null = document.querySelector(".clear");

/**
 * @type {HTMLDivElement | null}
 */
const display_null = document.querySelector(".display");

/**
 * @type {HTMLInputElement | null}
 */
const name_input_null = document.querySelector("#name");

/**
 * @type {HTMLSelectElement | null}
 */
const clazz_input_null = document.querySelector("#clazz");

if (display_null && submit_button_null && clear_button_null && name_input_null && clazz_input_null) {
    const submit_button = /** @type {HTMLButtonElement} */ (submit_button_null);
    const clear_button = /** @type {HTMLButtonElement} */ (clear_button_null);
    const display = /** @type {HTMLDivElement} */ (display_null);
    const name_input = /** @type {HTMLInputElement} */ (name_input_null);
    const clazz_input = /** @type {HTMLSelectElement} */ (clazz_input_null);

    submit_button.addEventListener("click", (/** @type {MouseEvent} */ event) => {
        event.preventDefault();

        if (validate_inputs(name_input, clazz_input, display)) {
            clear_children(display);

            const message = document.createElement("p");
            message.className = "info";
            message.innerText = `Cześć ${name_input.value} z ${clazz_input.value} klasy`;
            display.append(message);

            name_input.value = "";
            clazz_input.value = "1";
        }
    });

    clear_button.addEventListener("click", (/** @type {MouseEvent} */ event) => {
        event.preventDefault();

        clear_children(display);
    });

} else {
    console.warn("Could not get all of the elements!");
}

/**
 * Validates inputs with error displays
 * @param {HTMLInputElement} name_input 
 * @param {HTMLSelectElement} clazz_input 
 * @param {HTMLElement} error_out
 * @returns {boolean}
 */
function validate_inputs(name_input, clazz_input, error_out) {
    clear_children(error_out);

    let result = true;
    let name_value = name_input.value;
    name_value = name_value.trim();

    if (name_value.length <= 2) {
        result = false;
        create_error("Nie wpisałeś imienia lub jest ono za krótkie (min 3 znaki)", error_out);
    }

    const clazz_value = Number(clazz_input.value);
    if (clazz_value < 0 || clazz_value > 6) {
        result = false;
        create_error("Niepoprawna klasa!", error_out);
    }

    return result;
}

/**
 * @param {string} msg 
 * @param {HTMLElement} error_out 
 */
function create_error(msg, error_out) {
    const error = document.createElement("p");
    error.className = "error";
    error.innerText = msg;
    error_out.append(error);
}

/**
 * @param {HTMLElement} element 
 */
function clear_children(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

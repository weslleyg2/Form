class AuthenticateForm {
    constructor() {
        this.form = document.querySelector('.form');
        this.events();
    }
    events() {
        this.form.addEventListener('submit', e => {
            this.handleSubmit(e);
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        const authenticateFields = this.isAuthenticate();//campos validos
        const authenticatePassword = this.authenticatePassword();

        if (authenticateFields && authenticatePassword) {
            alert('Form Sent');
            this.form.submit();
        }
    }
    authenticatePassword() {
        let valid = true;

        const password = this.form.querySelector('.password');
        const repeatPassword = this.form.querySelector('.repeatPassword');

        if (password.value !== repeatPassword.value) {
            valid = false;

            this.createError(password, 'Password  and repeat password fields must be the same.');
            this.createError(repeatPassword, 'Password  and repeat password fields must be the same.');
        }
        if (password.value.length < 6 || password.value.length > 12) {
            valid = false;
            this.createError(password, 'Password must be between 3 and 12 characters.');
        }
        return valid;
    }
    isAuthenticate() {
        let valid = true;

        for (let errorText of this.form.querySelectorAll('.error-text')) {
            {
                errorText.remove();
            }

        }
        for (let fields of this.form.querySelectorAll('.authenticate')) {
            const label = fields.previousElementSibling.innerText;
            if (!fields.value) {
                this.createError(fields, `"${label}" Field cannot be empty.`);//Campo tal não pode esta vazio
                valid = false;
            }

            if (fields.classList.contains('cpf')) {
                if (!this.validaCPF(fields)) valid = false;
            }
            if (fields.classList.contains('users')) {
                if (!this.authenticateUser(fields)) valid = false;
            }
        }
        return valid;
    }
    authenticateUser(field) {
        const user = field.value;
        let valid = true;

        if (user.length < 3 || user.length > 12) {
            this.createError(field, 'User must be between 3 and 12 characters.');
            valid = false;
        }

        if (!user.match(/^[a-zA-Z0-9]+$/g)) {
            this.createError(field, 'User Name need have letters and/or numbers.');
            valid = false;
        }

        return valid;
    }
    validaCPF(field) {
        const cpf = new ValidaCPF(field.value);

        if (!cpf.valida()) {
            this.createError(field, 'Invalid CPF.');
            return false;
        }
        return true;
    }

    createError(field, msg) {
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('error-text');
        field.insertAdjacentElement('afterend', div);
    }
}
const authenticate = new AuthenticateForm();
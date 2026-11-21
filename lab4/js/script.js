class LoginData {
    // Конструктор: сохраняет введённые данные в свойства объекта
    constructor(login, email, password, weapon, agree) {
        this.login = login;
        this.email = email;
        this.password = password;
        this.weapon = weapon;
        this.agree = agree;
        this.createdAt = new Date();
    }

    // Пароль в консоль целиком не выводим: показываем звёздочки
    getMaskedPassword() {
        return "*".repeat(this.password.length);
    }

    // Метод форматированного вывода на консоль
    printToConsole() {
        console.log("%cДанные для отправки на сервер",
            "color: #f0a500; font-weight: bold; font-size: 14px;");
        console.log(`Логин:          ${this.login}`);
        console.log(`Email:          ${this.email}`);
        console.log(`Пароль:         ${this.getMaskedPassword()}`);
        console.log(`Любимое оружие: ${this.weapon}`);
        console.log(`Согласие:       ${this.agree ? "да" : "нет"}`);
        console.log(`Время:          ${this.createdAt.toLocaleString("ru-RU")}`);
        console.table({
            login: this.login,
            email: this.email,
            password: this.getMaskedPassword(),
            weapon: this.weapon,
            agree: this.agree
        });
    }
}

const form = document.getElementById("login-form");
const status = document.getElementById("form-status");

function showStatus(text, isError) {
    status.textContent = text;
    status.classList.toggle("form__status_error", isError);
}

form.addEventListener("submit", (event) => {
    event.preventDefault(); // не перезагружать страницу

    const login = form.login.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;
    const weapon = form.weapon.value;
    const agree = form.agree.checked;

    // простая проверка заполнения
    if (!login || !email || !password) {
        showStatus("Заполни логин, email и пароль", true);
        return;
    }
    if (!form.email.checkValidity()) {
        showStatus("Email введён неверно", true);
        return;
    }
    if (password.length < 6) {
        showStatus("Пароль должен быть не короче 6 символов", true);
        return;
    }
    if (!agree) {
        showStatus("Нужно согласие на обработку данных", true);
        return;
    }

    // создаём объект с введёнными данными и вызываем метод вывода
    const data = new LoginData(login, email, password, weapon, agree);
    data.printToConsole();

    showStatus(`Добро пожаловать, ${login}! Данные выведены в консоль (F12).`, false);
    form.reset();
});


const quiz = {"Как в JavaScript можно узнать браузер клиента?": "navigator.appName",
    "Как изменить текст внутри тега ниже на Привет, мир\n\n<p id=\"demo\">This is a demonstration.</p>": "document.getElementById(\"demo\").innerHTML = \"Привет, мир\"",
    "Внутри какого тега HTML используют JavaScript": "script"
}
const theory = ["Самый простой способ внедрения JavaScript в HTML-документ – использование тега script. Теги script часто помещают в элемент head, и ранее этот способ считался чуть ли не обязательным. Однако в наши дни теги script используются как в элементе head, так и в теле веб-страниц.",
"Функция document.getElementById() Возвращает ссылку на элемент по его идентификатору; идентификатор является строкой, которая может быть использована для идентификации элемента; она может быть определена при помощи атрибута id в HTML или из скрипта.",
"Если Вы хотите узнать, какой браузер использует пользователь, то можно воспользоваться свойством navigator.appName, которое возвращает имя браузера клиента"
]
const startEducation = (queue) => {
    const theoryItem = document.querySelector("#theory");
    const start = document.getElementById("start")
    start.innerHTML = "";
    theoryItem.innerHTML = theory[queue];
    if (queue === 2) {
        theoryItem.innerHTML += "<button onclick='startQuiz()' class='automatic__btn'>Начать опрос</button>"+
            `<button class="automatic__btn" onclick="toStart()">Вернуться к началу</button>`;
        return
    }
    theoryItem.innerHTML += `<button onclick='startEducation(${queue}+1)' class='automatic__btn'>Следующее</button>`+
    `<button class="automatic__btn" onclick="toStart()">Вернуться к началу</button>`;

}


const startQuiz = () => {
    const theoryItem = document.querySelector("#theory");
    const answer = document.getElementById("answer")
    const question = Math.round(Math.random()*2);
    const start = document.getElementById("start")
    start.innerHTML = "";
    const skip = document.getElementById("skip")
    skip.innerHTML = '';
    let i = 0;
    console.log(question)
    let keys;
    for (keys in quiz) {
        if (i === question) {
            theoryItem.innerText = keys
            break;
        }
        i++;
    }
    console.log(keys)
    answer.innerHTML = "<div class=\"input\">\n" +
        "                    <label>\n" +
        "                        <input type=\"text\" class=\"robot__input\">\n" +
        "                    </label>\n" +
        "                </div>\n" +
        "                <button class=\"automatic__btn\" id='answer_btn'>Ответить</button>"+
        `<button class="automatic__btn" onclick="toStart()">Вернуться к началу</button>`;
    document.getElementById("answer_btn").onclick = () => {
        if (document.querySelector(".robot__input").value === quiz[keys])
            celebration()
        else
            punishment()
        answer.innerHTML = `<button class="automatic__btn" onclick="toStart()">Вернуться к началу</button>`;
    }
}
const punishment = () => {
    console.log("Bad")
    const theory = document.getElementById("theory")
    theory.innerHTML = "<p>Неверно!</p><img src=\"https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYjNlNmEyZmUzOWY5ZmY4MDgyM2Q3YzY5MWY2ODU4NjE5OTU0ZmQ1MiZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/kGf2lNmE6LXOA0hEKJ/giphy.gif\">"
}
const celebration = () => {
    console.log("Good")
    const theory = document.getElementById("theory")
    theory.innerHTML = "<img src=\"src/congrats.gif\" alt=\"Поздравляем!\">"
}

const toStart = () => {
    document.querySelector('#answer').innerHTML = "";
    document.getElementById("theory").innerHTML = ""
    document.querySelector('#start').innerHTML = "<div class=\"start__btns\">\n" +
        "                    <button class=\"automatic__btn\" onclick=\"startEducation(0)\">Начать обучение</button>\n" +
        "                </div>";
    document.getElementById("skip").innerHTML = "<button class=\"automatic__btn\"  onclick=\"startQuiz()\">Пропустить обучение</button>"
    // startEducation(0)
}
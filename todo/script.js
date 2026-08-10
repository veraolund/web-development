// detta script implementerar en dynamisk webbsida med interaktiva widgets och anpassade element. 
// skriptet möjlligör följande funktionaliteter: 
// ändra eller ta bort profilbild, valet sparas mellan sessioner
// ändra stil på webbplatsen, valet sparas mellan sessioner
// att-göra-lista: lägga till uppgifter, räkna antalet uppgifter, markera gjorda uppgifter, ta bort uppgifter
// visa dagens datum och veckodag i navbar
// animerad dropdown (för mobilanvändare)
// navigationspanel i dropdown med tre olika innehåll
// bilder som byts ut efter olika tidsintervall
// digital klocka som visar exakt klockslag
// slumpmässigt utvalt citat som byts ut dagligen


// DEKLARERA KONSTANTER OCH VARIABLER
// meny och dropdown
const menuButton = document.getElementById("menu-button");
const dropdown = document.getElementById("dropdown");
const menuItems = document.querySelectorAll("#dropdown li");
const navbarDate = document.getElementById("nav-date");
const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

// innehåll/content
const widgets = document.querySelectorAll(".widget");
const settings = document.getElementById("settings");
const helpCenter = document.getElementById("help-center");

// menyalternativ
const menuSettings = document.getElementById("menu-settings");
const menuHelp = document.getElementById("menu-help");
const menuHome = document.getElementById("menu-home");

// bilder
const sleepingCatImage = document.getElementById("sleeping-cat");
const sleepingCatImages = [new Image(), new Image(), new Image(), new Image()];
const sunImage = document.getElementById("sun");
const moonImage = document.getElementById("moon");
let currentIndex = 0; // och index

// övriga element i widgets och deras innehåll
const timeOfDay = document.getElementById("time");
const todaysQuote = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const quotes = [
    "You’re braver than you believe, and stronger than you seem, and smarter than you think.",
    "Keep your face to the sunshine and you cannot see a shadow.",
    "In every day, there are 1,440 minutes. That means we have 1,440 daily opportunities to make a positive impact.",
    "The only time you fail is when you fall down and stay down.",
    "Optimism is a happiness magnet. If you stay positive good things and good people will be drawn to you.",
    "Happiness is an attitude. We either make ourselves miserable, or happy and strong. The amount of work is the same.",
    "The struggle you’re in today is developing the strength you need tomorrow.",
    "Once you replace negative thoughts with positive ones, you’ll start having positive results.",
    "Positive thinking will let you do everything better than negative thinking will.",
    "You’re off to great places, today is your day. Your mountain is waiting, so get on your way.",
    "Winning doesn’t always mean being first. Winning means you’re doing better than you’ve done before."

]
const authors = [
    "A.A. Mine",
    "Helen Keller",
    "Les Brown",
    "Stephen Richards",
    "Mary Lou Retton",
    "Francesca Reigler",
    "Robert Tew",
    "Willie Nelson",
    "Zig Ziglar",
    "Dr. Seuss",
    "Bonnie Blair"
]

// to-do-list element 
const taskInput = document.getElementById("task");
const addButton = document.getElementById("addTask");
const taskList = document.getElementById("task-list");
const taskCounter = document.getElementById("task-counter");

// settings relevanta element
const removeAvatar = document.getElementById("remove-avatar");
const changeAvatar = document.getElementById("change-avatar");
const vintageLook = document.getElementById("vintage-button");
const modernLook = document.getElementById("modern-button");
const currentAvatar = document.querySelectorAll(".current-avatar");
const avatar1 = document.getElementById("avatar1");
const avatar2 = document.getElementById("avatar2");
const avatar3 = document.getElementById("avatar3");
const avatar4 = document.getElementById("avatar4");
const avatar5 = document.getElementById("avatar5");
const avatarChoices = document.getElementById("avatar-choices");
const bodyElement = document.querySelector("body");



// SETTINGS - ÄNDRA PROFILBILD
// hämta vald profilbild från localStorage (minnet) och lägger till den om den finns
const savedAvatar = localStorage.getItem("savedAvatar");
if (savedAvatar) {
    updateCurrentAvatar(savedAvatar);
}

// uppdatera profilbilden genom att ändra src-attributet, sparar det i localStorage
function updateCurrentAvatar(newSrc) {
    currentAvatar.forEach(element => {
        element.src = newSrc;
    });
    localStorage.setItem("savedAvatar", newSrc);
}

// lägga till klick-lyssnare för avataralternativen 1-5, uppdaterar profilbilden med respektive avatar
avatar1.addEventListener("click", function () {
    updateCurrentAvatar(avatar1.src);
});

avatar2.addEventListener("click", function () {
    updateCurrentAvatar(avatar2.src);
});

avatar3.addEventListener("click", function () {
    updateCurrentAvatar(avatar3.src);
});

avatar4.addEventListener("click", function () {
    updateCurrentAvatar(avatar4.src);
});

avatar5.addEventListener("click", function () {
    updateCurrentAvatar(avatar5.src);
});

// ta bort profilbilden genom att uppdatera med en generisk bild
removeAvatar.addEventListener("click", function () {
    updateCurrentAvatar("resources/profile.png");
});

// visa och döljer avataralternativen vid klick
changeAvatar.addEventListener("click", function () {
    avatarChoices.classList.toggle("hide");
});

// SETTINGS - ÄNDRA STIL
// ändra utseende genom att lägga till en klass eller ta bort den, sparar valet i localStorage
function setLook(look) {
    if (look === "vintage") {
        bodyElement.classList.add("vintage-look");
    } else {
        bodyElement.classList.remove("vintage-look");
    }
    localStorage.setItem("selectedLook", look);
}

// lägga till klick-lyssnare på knappen och ändrar till vintage-stil
vintageLook.addEventListener("click", function () {
    setLook("vintage");
});

// lägga till klick-lyssnare på knappen och ändrar (återställer) till modern-stil 
modernLook.addEventListener("click", function () {
    setLook("defualt");
});

// hämta vald look från localStorage och sätter den om den finns
const savedLook = localStorage.getItem("selectedLook");
if (savedLook) {
    setLook(savedLook);
}


// TO-DO-LIST MED MINNE
// hämta sparade uppgifter ur localStorage, annars skapa en tom array
let todo = JSON.parse(localStorage.getItem("todo")) || [];

// visa upp de sparade uppgifter
displayTasks();

// skapa och visa list-element för varje uppgift i att-göra-listan
function displayTasks() {
    taskList.textContent = ""; // rensa listan så att den är tom när alla uppgifter läggs in

    // skapa element för varje uppgift i att-göra-listan 
    todo.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = item.text;

        // visuell representation av de avklarade uppgifterna genom att lägga till en klass
        if (item.disabled) {
            li.classList.add("checked");
        }

        // lägga till en klick-lyssnare på uppgifterna som markerar/avmarkerar gjorda/ogjorda uppgifter
        li.addEventListener("click", function () {
            item.disabled = !item.disabled;
            saveToLocalStorage(); // spara ändringen i localStorage
            displayTasks(); // visa förändringen/den nya markeringen
        });

        // lägga till en dubbelklick-lyssnare som tar bort uppgiften
        li.addEventListener("dblclick", function () {
            todo.splice(index, 1); // ta bort uppgiften (1st) ur arrayen
            saveToLocalStorage(); // spara ändringen i localStorage
            displayTasks(); // visa den uppdaterade listan (utan borttagen uppgift)
        });

        taskList.appendChild(li); // lägger till uppgiften (list-elementet) i att-göra-listan

    });

    // räkna och visa antalet ogjorda uppgifter
    const uncheckedTasks = todo.filter(item => !item.disabled);
    taskCounter.textContent = uncheckedTasks.length;
}

// göra om arrayen till en sträng och spara den i localStorage
function saveToLocalStorage() {
    localStorage.setItem("todo", JSON.stringify(todo));
}

// skapa ett objekt av uppgiften (med text och markeringsstatus), spara och visa upp
function addTask(taskText) {
    todo.push({
        text: taskText,
        disabled: false
    }); // lägga till objektet i arrayen
    saveToLocalStorage(); // spara uppgiften i localStorage
    displayTasks(); // visa upp uppgiften i att-göra-listan
}

// lägga till en klick-lyssnare som lägger till en ny uppgift om det finns text, annars skickas en alert
addButton.addEventListener("click", function () {
    const taskText = taskInput.value.trim(); // ta bort mellanrum (whitespace) från inputtexten
    if (taskText !== "") { // om det inte är tomt
        addTask(taskText); // lägga till uppgift med respektive text
        taskInput.value = ""; // rensa inputfältet, förbereda för ny uppgiftstext
    } else {
        alert("Please enter a task."); // skicka alert
    }
});

// lägga till en tangentbord-lyssnare som lägger till en uppgift när enter-tangenten trycks, om det finns text, annars skickas en alert
taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") { // om den tryckta tangenten är enter-tangenten
        event.preventDefault(); // stoppar standardbeteendet för enter-klickande

        const taskText = taskInput.value.trim(); // ta bort mellanrum (whitespace) från inputtexten
        if (taskText !== "") { // om det inte är tomt
            addTask(taskText); // lägga till uppgift med respektive text
            taskInput.value = ""; // rensa inputfältet, förbereda för ny uppgiftstext
        } else {
            alert("Please enter a task."); // skicka alert
        }
    }
});


// DATUM I NAVBAR
// visa dagens datum i navbar
function setDate() {
    const currentDate = new Date(); // skapa datum-objekt för nuvarande datum 
    navbarDate.textContent = weekdays[currentDate.getDay()] + ", " + months[currentDate.getMonth()] + " " + currentDate.getDate(); // skriva datumet (med rätt formattering)
}
setDate(); // köra funktionen direkt vid start
setInterval(setDate, 60000); // uppdatera varje minut


// ANIMERAD DROPDOWN
// visa (och dölja) dropdown vid klick på menyknappen genom att lägga till/ta bort en klass
menuButton.addEventListener("click", function (event) {
    event.stopPropagation(); // stoppa händelsebubbling, klicket når inte document
    dropdown.classList.toggle("show-dropdown");
});

// dropdown döljs när vid click utanför 
document.addEventListener("click", function () {
    dropdown.classList.remove("show-dropdown"); // ta bort klassen
})


// DISPLAYA AKTUELLT INNEHÅLL
// döljer allt innehåll/content
function hideAll() {
    widgets.forEach(element => element.classList.add("hide")); // lägga till klassen för varje widget
    settings.classList.add("hide");  // lägga till klassen för settings
    helpCenter.classList.add("hide"); // lägga till klassen för help-center
}

// visa det valda innehållet och markera nuvarande menyalternativ
function changeContent(sectionToShow, currentMenuItem) {
    hideAll(); // rensa allt innehåll
    menuItems.forEach(element => element.classList.remove("current")); // avmarkerar alla menyalternativ

    currentMenuItem.classList.add("current"); // markera det aktuella menyalternativet

    // visa det aktuella innehållet
    switch (sectionToShow) {
        case "home":
            widgets.forEach(element => element.classList.remove("hide"));
            break;
        case "settings":
            settings.classList.remove("hide");
            break;
        case "helpCenter":
            helpCenter.classList.remove("hide");
            break;
    }
}

// visa hem-innehåll (widgetar) och markerat menyalternativ vid start (och reload)
changeContent("home", menuHome);

// visa endast hem-innehåll vid klick på menyvalet
menuHome.addEventListener("click", function () {
    changeContent("home", menuHome);
});

// visa endast settings-innehåll vid klick på menyvalet
menuSettings.addEventListener("click", function () {
    changeContent("settings", menuSettings);
});

// visa endast help-center-innehåll vid klick på menyvalet
menuHelp.addEventListener("click", function () {
    changeContent("helpCenter", menuHelp);
});


// DYNAMISKA BILDER 
// tilldela bildernas sökväg till respektive bild i arrayen 
sleepingCatImages[0].src = "resources/sleeping-cat1.png";
sleepingCatImages[1].src = "resources/sleeping-cat2.png";
sleepingCatImages[2].src = "resources/sleeping-cat3.png";
sleepingCatImages[3].src = "resources/sleeping-cat2.png"; // återanvända samma bild som ett mellansteg (fram och tillbaka effekt)

// automatiskt/tiddstyrt bildbyte varje 0.5 sekunder
setInterval(function () {
    currentIndex = (currentIndex + 1) % sleepingCatImages.length; // räkna ut index för nästa bild, modulo ger 0 vid arrayens slut
    sleepingCatImage.src = sleepingCatImages[currentIndex].src; // ny blid genom att sätta ny sökväg till bilden
}, 500);

// visa sol-bild under dagstid, eller måne-bild (nattetid), hämtar ny timme varje minut
function sunOrMoonDisplay() {
    const currentDate = new Date(); // skapa datum-objekt för nuvarande tid 
    const hour = currentDate.getHours(); // få ut timmen ur datum-objektet
    if (hour >= 5 && hour <= 20) { // visa sol om det är dagstid (05:00-20:59)
        moonImage.classList.add("hide");
        sunImage.classList.remove("hide");
    } else { // visa måne annars
        moonImage.classList.remove("hide");
        sunImage.classList.add("hide");
    }
}
sunOrMoonDisplay(); // köra funktionen direkt vid start
setInterval(sunOrMoonDisplay, 60000); // uppdatera varje minut


// DYNAMISKT INNEHÅLL I WIDGETS
// visa nuvarande klockslag (med rätt formattering), uppdateras varje sekund
function setTimeOfDay() {
    const currentDate = new Date(); // skapa datum-objekt för nuvarande tid 
    const hour = currentDate.getHours(); // få ut timmen ur datum-objektet
    const minute = currentDate.getMinutes(); // få ut minuten ur datum-objektet
    if (hour < 10 && minute < 10) { // om timme och minut inte är tvåsiffriga
        timeOfDay.textContent = "0" + hour + ":0" + minute; // lägga till en nolla framför timmen respektive minuten
    } else if (minute < 10) { // om minuten inte är tvåsiffrig
        timeOfDay.textContent = hour + ":0" + minute; // lägga till nolla framför
    } else if (hour < 10) { // om timmen inte är tvåsiffrig
        timeOfDay.textContent = "0" + hour + ":" + minute; // lägga till nolla framför
    } else { // i alla andra fall skrivs timme och minut ut så som de är
        timeOfDay.textContent = hour + ":" + minute; 
    }
}
setTimeOfDay(); // köra funktionen direkt vid start
setInterval(setTimeOfDay, 1000); // uppdatera varje sekund

// lägga in dagens slumpmässigt utvalda citat med dess författare
function setTodaysQuote() {
    const today = new Date().toDateString(); // hämta dagens satum som en sträng
    const lastUpdate = localStorage.getItem("lastUpdate"); // hämta senaste sparade datumet från localStorage
    // uppdatera citatet (ur arrayen) om det är en ny dag och spara i localStorage
    if (lastUpdate !== today) { // om sparade datumet inte är samma som dages datum
        let randomIndex = Math.floor(Math.random() * quotes.length); // skapa slumpmässigt index
        localStorage.setItem("savedQuoteIndex", randomIndex); // spara det slumpmässiga indexet
        localStorage.setItem("lastUpdate", today); // spara dagens datum i localStorage
    }
    // displaya dagens citat och författare på det sparade slumpmässiga indexet
    const savedIndex = localStorage.getItem("savedQuoteIndex"); // hämta indexet från localStorage
    todaysQuote.textContent = quotes[savedIndex]; // sätta dagens citat ur arrayen genom indexet 
    quoteAuthor.textContent = authors[savedIndex]; // sätta respektive författare på samma index
}
setTodaysQuote(); // sätta dagens citat och författare vid start

// dynamiskt visa nuvarande årtal
document.querySelectorAll(".current-year").forEach((element) => {
    element.textContent = new Date().getFullYear();
});
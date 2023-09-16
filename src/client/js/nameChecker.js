function checkForName(inputText) {
    console.log("::: Running checkForName :::", inputText);
    let names = [
        "Lily",
        "James",
        "Hsu",
        "Zaw",
        "Phyo"
    ]

    if(names.includes(inputText)) {
        alert("Welcome!")
    }
}

export { checkForName }

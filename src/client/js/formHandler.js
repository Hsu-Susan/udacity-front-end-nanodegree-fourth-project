function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('url').value

    if(Client.checkForURL(formText)) {
    console.log("*** FORM IS SUBMITTED!!! ***")

    postData('http://localhost:8081/api', {url: formText})

    .then(function(res) {
        document.getElementById('polarity').innerHTML = polarityChecker(res.score_tag);
        document.getElementById("agreement").innerHTML = `${res.agreement}`;
        document.getElementById("subjectivity").innerHTML = `${res.subjectivity}`;
        document.getElementById("confidence").innerHTML = `${res.confidence}`;
        document.getElementById("irony").innerHTML = `${res.irony}`;
    })
    } else {
        alert('Seems like an invalid URL, please try with a valid URL.');
    }
}

const postData = async (url = "", data = {}) => {
    console.log('ANALYZING DATA -> :', data);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    try {
        const newData = await response.json();
        console.log('RECEIVED DATA -> :', newData)
        return newData;
    } catch (error) {
        console.log('error', error);
    }
};

// API response output (https://www.meaningcloud.com/developer/sentiment-analysis/doc/2.1/response)
const polarityChecker = (score) => {
    let display;
    switch (score){
        case 'P+':
            display = 'strong positive';
            break;
        case 'P':
            display = 'positive';
            break;
        case 'NEW':
            display = 'neutral';
            break;
        case 'N':
            display = 'negative';
            break;
        case 'N+':
            display = 'strong negative';
            break;
        case 'NONE':
            display = 'no sentiment';
    }
    return display.toUpperCase();
}

export { handleSubmit }
export { polarityChecker }
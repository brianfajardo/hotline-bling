// JSON = JavaScript Object Notation
// AJAX = Asynchronous JavaScript And XML

let pageCounter = 1;
let fetchButton = document.querySelector('#btn');
let animalContainer = document.querySelector('#animal-info');

// fetchButton.addEventListener('click', () => {
//     let ourRequest = new XMLHttpRequest();
//     // GET: download/receive data, 
//     // POST: send data to server
//     ourRequest.open('GET', 'https://learnwebcode.github.io/json-example/animals-'+ pageCounter + '.json', true);
//     ourRequest.onload = () => {
//         let ourData = JSON.parse(ourRequest.responseText);
//         console.log(ourData);
//         renderHTML(ourData);
//     };
// ourRequest.send();
// pageCounter++;
// if (pageCounter > 3){
//     fetchButton.classList.add('hide-me');
// }
// });

fetchButton.addEventListener('click', promiseThen);

function promiseThen(){
    fetchData()
        .then(responseData => {
            renderHTML(responseData);
        })
        .catch(error => console.log(error));
};

function fetchData(){
    return new Promise((resolve, reject) => {
        const REQUEST = new XMLHttpRequest();
        // GET: download/receive data, 
        // POST: send data to server
        REQUEST.open('GET', 'https://learnwebcode.github.io/json-example/animals-'+ pageCounter + '.json', true);
        REQUEST.onreadystatechange = () => {
            if (REQUEST.readyState === XMLHttpRequest.DONE && REQUEST.status === 200 && REQUEST.status < 400){
                const RESPONSE_DATA = JSON.parse(REQUEST.responseText);
                resolve(RESPONSE_DATA);
            }
        }
        REQUEST.send();
        pageCounter++;
        if (pageCounter > 3){
            fetchButton.classList.add('hide-me');
        }
    })
};

function renderHTML(data){
    let htmlString = '';
    // Loop through JSON.parse array object[i]
    for (let i = 0; i < data.length; i++){
        htmlString += '<p>' + data[i].name + ' is a ' + data[i].species + " that likes to eat ";
        // Loop through nested array object of property in JSON.parse array object[i]
        for (let ii = 0; ii < data[i].foods.likes.length; ii++){
            if (ii === 0){
                htmlString += data[i].foods.likes[ii]
            } else {
                htmlString += ' and ' + data[i].foods.likes[ii]
            }
        }
        htmlString += ' and dislikes ';
        // Loop through nested array object of property in JSON.parse array object[i]
        for (let ii = 0; ii < data[i].foods.dislikes.length; ii++){
            if (ii === 0){
                htmlString += data[i].foods.dislikes[ii]
            } else {
                htmlString += ' and ' + data[i].foods.dislikes[ii]
            }
        }
        htmlString += '.</p>';
    };
    animalContainer.insertAdjacentHTML('beforeend', htmlString);
};

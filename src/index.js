document.addEventListener('DOMContentLoaded', () => {
    let dogs;
    fetch('http://localhost:3000/dogs')
    .then(r => r.json())
    .then(data => {
        dogs = data;
        for (let dog of dogs) {
            renderDog(dog);
        }
    });

    function renderDog(dog){
        let row = document.createElement('tr');
        row.className = `${dog.id}`;
        let name = document.createElement('td');
        let breed = document.createElement('td');
        let sex = document.createElement('td');
        let edit = document.createElement('button');
        name.innerText = dog.name;
        breed.innerText = dog.breed;
        sex.innerText = dog.sex;
        edit.innerText = 'Edit Dog';
        row.append(name, breed, sex, edit);
        document.querySelector('#table-body').append(row);
        makeEditable(row);
    }
    
    let numID;
    const form = document.querySelector('#dog-form');

    function makeEditable(dogRow){

        dogRow.querySelector('button').addEventListener('click', e => {
            form.querySelector('[name = name]').value = dogRow.querySelector('td:nth-child(1)').innerText;
            form.querySelector('[name = breed]').value = dogRow.querySelector('td:nth-child(2)').innerText;
            form.querySelector('[name = sex]').value = dogRow.querySelector('td:nth-child(3)').innerText;

            numID = e.target.parentElement.className;
            console.log('num reassigned to ' + numID);
        })
    }

    form.addEventListener('submit', e => {
        e.preventDefault();
        console.log('num before patch is '+ numID);
        fetch(`http://localhost:3000/dogs/${numID}`, {
            method: 'PATCH',
            body: JSON.stringify({
                name: `${form.querySelector('[name = name]').value}`,
                breed: `${form.querySelector('[name = breed]').value}`,
                sex: `${form.querySelector('[name = sex]').value}`,
            }),
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then(r => r.json())
        .then(data => {
            document.querySelector('#table-body').innerText = '';
            fetch('http://localhost:3000/dogs')
            .then(r => r.json())
            .then(data => {
                dogs = data;
                for (let dog of dogs) {
                    renderDog(dog);
                }
            });
        });
        
        // dogRow.querySelector('td:nth-child(1)').innerText = form.querySelector('[name = name]').value;
        // dogRow.querySelector('td:nth-child(2)').innerText = form.querySelector('[name = breed]').value;
        // dogRow.querySelector('td:nth-child(3)').innerText = form.querySelector('[name = sex]').value;
    })
})
const requestDataContainer = document.querySelector('.request__data-container pre');

const responseDataContainer = document.querySelector('.response__data-container pre');


document.querySelector('.btn').addEventListener('click', async (event) => {
    event.preventDefault();

    await sentUserData();

    const getResultData = await getUserData();

    await drawTable(getResultData);
});

const sentUserData = async () => {
    const inputDataName = document.getElementById('inputDataName').value;

    const inputDataLastName = document.getElementById('inputDataLastName').value;

    await fetch('/insertData', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({name: inputDataName, last_name: inputDataLastName}),
    }).catch(error => {
        console.error('Error sent data -->', error);
    })

}

const getUserData = async () => {
    return await fetch('/getData', {
        method: 'GET',
        'Content-Type': 'application/json',
    }).then((data) =>
        data.json()
    ).catch(error => {
        console.error('Error get data -->', error)
    })
}

const drawTable = async (data) => {
    const table = document.querySelector('table');

    while (table.rows.length > 1) {
        table.deleteRow(1);
    }

    data.forEach(item => {
        const tr = table.insertRow();
        tr.className = 'content';
        tr.insertCell().innerHTML = item.id;
        tr.insertCell().innerHTML = item.name;
        tr.insertCell().innerHTML = item.last_name;
    });

    requestDataContainer.innerText = `${JSON.stringify({
        name: data[data.length - 1].name,
        last_name: data[data.length - 1].last_name
    }, null, 2)}`;

    responseDataContainer.innerText = `${JSON.stringify(data, null, 2)}`;
}


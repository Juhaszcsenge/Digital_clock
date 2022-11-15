import './style.css';

let users = []

document.addEventListener('DOMContentLoaded', async () => {
    let response =  await fetch('/users.json');
    let eredmeny = await response.json();
    for (let e of eredmeny.users) {
        users.push(e)
    }
    document.getElementById('osszes').addEventListener('click', async () => {
        document.getElementById('lista').textContent = ""
        response =  await fetch('/users.json');
        eredmeny = await response.json();
        users.sort((a, b) => a.lastName.localeCompare(b.lastName))
        for (let e of users) {
            let li = document.createElement('li')
            li.innerHTML = e.lastName.toUpperCase() + "," + e.firstName;
            document.getElementById('lista').appendChild(li)
        }
    })
    document.getElementById('elerhetoseg').addEventListener('click', async () => {
        document.getElementById('tablazat').textContent = ""
        response =  await fetch('/users.json');
        eredmeny = await response.json();
        users.sort((a, b) => a.username.localeCompare(b.username))
        for (let e of users) {
            let tr = document.createElement('tr')
            let td1 = document.createElement('td')
            let td2 = document.createElement('td')
            let td3 = document.createElement('td')
            td1.textContent = e.username;
            td2.textContent = e.email;
            td3.textContent = e.phone;
            tr.appendChild(td1)
            tr.appendChild(td2)
            tr.appendChild(td3)
            document.getElementById('tablazat').appendChild(tr)
        }
    })
    document.getElementById('cm').addEventListener('input', async () => {
        let cm =  document.getElementById('cm').value
        response =  await fetch('/users.json');
        eredmeny = await response.json();
        let userFilteredByHeight = users.filter(f => f.height >= cm)
        let sum = 0;
        for (let e of userFilteredByHeight) {
            sum += e.weight
        }
        document.getElementById('oszsulyDisplay').textContent = cm + "cm-nél magasabbak öszsúlya: "+ sum +" kg"
    })
    document.getElementById('barnaSz').addEventListener('click', async () => {
        response =  await fetch('/users.json');
        eredmeny = await response.json();
        let userFilteredByEyeColor = users.filter(f => f.eyeColor == "Brown")
        document.getElementById('barnaszem').textContent = "Barnaszemüek száma: " + userFilteredByEyeColor.length
        
    })

})
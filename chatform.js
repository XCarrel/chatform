// Chatform.js: a script that turns a form into a chat
// Author: X. Carrel
// Date: Jan 23

// We only handle certain types of inputs
var supportedInputTypes = ['text','date','checkbox','tel','email','number','radio','time']

// List of alternate prompt texts
// The key of the array is the id of the input
var prompts = {
    "numPax" : [
        "Vous serez combien ?",
        "Tout seul ou à plusieurs ?",
        "Y'aura de la compagnie ?"
    ],
    "txtContact" : [
        "C'est qui le boss ?",
        "Qui contacter en cas de problème ?",
        "Y'a un responsable dans le groupe ?"
    ],
}

// Chat about all possible inputs
for (input of document.getElementsByTagName('input')) {
    if (supportedInputTypes.includes(input.type)) { // this is a supported input ...
        if (prompts[input.id]){                     // ... for which we have at least one prompt

            // pick a prompt text at random
            let pick = Math.floor(Math.random() * prompts[input.id].length)
            prompText = prompts[input.id][pick]

            // show question
            q = document.createElement('div')
            q.classList.add('chatformquestion')
            q.innerText = prompText
            chatformbox.appendChild(q)

            // Handle dialog
            input.value = prompt(prompText)

            // Show answer
            a = document.createElement('div')
            a.classList.add('chatformanswer')
            a.innerText = input.value
            chatformbox.appendChild(a)
        } 
    }
}
frmUpdateRun.classList.remove('d-none')

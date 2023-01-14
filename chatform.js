// Chatform.js: a script that turns a form into a chat
// Author: X. Carrel
// Date: Jan 23

// TODO: Handle the textarea input. It is not a regular input field, thus not selected with the others
// TODO: Handle the checkbox input with radio buttons
// TODO: Have a list to pick from (waypoints)
// TODO: Format date in answer bubble
// TODO: Put something in the answer bubble when no answer is provided

// We only handle certain types of inputs
var supportedInputTypes = [
  "text",
  "date",
  "checkbox",
  "tel",
  "email",
  "number",
  "radio",
  "time",
];

// List of prompt texts for each input
// The key of the array is the id of the input
var prompts = {
  txtArtist: ["C'est pour quel artiste ?"],
  chkTBC: ["A confirmer ?"],
  datRunDate: ["C'est pour aujourd'hui ou pour demain ?", "Pour quel jour ?"],
  txtTransport: ["Un numéro de vol, de train ?"],
  telContact: [
    "On peut le/la joindre à quel numéro ?",
    "Un numéro de portable ?",
  ],
  numPax: [
    "Vous serez combien ?",
    "Tout seul ou à plusieurs ?",
    "Y'aura de la compagnie ?",
  ],
  txtContact: [
    "C'est qui le boss ?",
    "Qui contacter en cas de problème ?",
    "Y'a un responsable dans le groupe ?",
  ],
};

// Gather all inputs in the whole page
var inputs = Array.from(document.getElementsByTagName("input"));

// reduce the list to thos we can handle
inputs = inputs.filter((input) => supportedInputTypes.includes(input.type)); // by types
inputs = inputs.filter((input) => input.id in prompts); // by available prompts

// Formulate a question (question bubble + answer field) for the first of the remaining inputs
function askNextQuestion() {
  let input = inputs[0]; // next up, there must be one

  // pick a prompt text at random
  let pick = Math.floor(Math.random() * prompts[input.id].length);
  prompText = prompts[input.id][pick];

  // Question box
  q = document.createElement("div");
  q.classList.add("chatformquestion");
  q.innerText = prompText;
  chatformbox.appendChild(q);

  // Answer box
  a = document.createElement("div");
  a.id = "question_" + input.id;
  a.classList.add("chatformanswer");
  inputCopy = input.cloneNode(); // use a duplicate input field (to keep the original inside the form)
  inputCopy.addEventListener("keydown", (e) => {
    if (e.key === "Tab" || e.key === "Enter") {
      // end of input
      hearAnswer(e.target.parentNode.id, e.target.value, input.id);
    }
  });
  a.appendChild(inputCopy);
  a.tabindex = 0;
  chatformbox.appendChild(a);
  inputCopy.focus();
  inputs.shift(); // get rid of the first input now that we processed it
}

// Process the answer, i.e: turn the input field into a read-only bubble
function hearAnswer(answerDisplay, value, targetInput) {
  document.getElementById(answerDisplay).innerHTML = value;
  document.getElementById(targetInput).value = value;
  if (inputs.length > 0) {
    setTimeout(() => {
      askNextQuestion();
    }, 500);
  } else {
    frmUpdateRun.classList.remove("d-none");
  }
}

// Initiate the dialog
if (inputs.length > 0) askNextQuestion();

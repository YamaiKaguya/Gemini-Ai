document.addEventListener("keydown", function (event) {
	if (event.key === "Enter") {
		sendMessage();
	}
});

document.getElementById("sendButton").addEventListener("click", function () {
	sendMessage();
});

async function sendMessage() {
	const chat = document.getElementById("chat");
	const input = document.getElementById("input").value;

	if (!input) return;

	chat.appendChild(createMessage(input, true));
	document.getElementById("input").focus();
	document.getElementById("input").value = "";

	const res = await fetch("http://localhost:3000/chat", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ message: input }),
	});

	const data = await res.json();
	const respose = data.reply;

	chat.appendChild(createMessage(respose, false));
}

function createMessage(response, is) {
	if (!response) {
		document.getElementById("input").disabled = true;
		document.getElementById("input").classList.add("disabled");
		document.getElementById("sendButton").disabled = true;
		document.getElementById("sendButton").classList.add("disabled");
		document.querySelector(".dimlight").classList.add("true");
	}

	const message = document.createElement("div");
	message.className = (is ? "user-message" : "bot-message") + " message";
	message.textContent = response
		? response
		: "You've used up your free daily quota for this model.";

	const chatBox = document.getElementById("chat");
	chatBox.scrollTop = chatBox.scrollHeight;

	return message;
}

const axios = require('axios')
const express = require('express')
app = express()

const TARGET_URL = process.env.TARGET_URL || null;
const PORT = process.env.PORT || 8080;
const INTERVAL = process.env.INTERVAL || 2000;

let spamStatus = false;

app.use(express.static("public"));

// Endpoint called by other spambots
app.get("/spam", (req, res) => {
	res.sendStatus(200);
})

// Periodic call to spam other bot
spam = () => {
	if (TARGET_URL) {
		axios.get(TARGET_URL, {timeout: 1000})
			.then(response => {
				console.log(response.status)
				spamStatus = true;
			})
			.catch(error => {
				console.log(error.code);
				spamStatus = false;
			});
	} else {
		console.log("doing nothing")
		spamStatus = false;
	}
}

// Ajax status endpoint to get spam status
app.get("/status", (req, res) => {
	res.send({spam: spamStatus});
});

setInterval(spam, INTERVAL);

app.listen(PORT);

process.on('SIGINT', function() {
    process.exit();
});

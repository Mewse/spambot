(function() {
	var update = function() {
		$.get({
			url: "/status",
			success: function(data) {
				var spam = data.spam ? ":D" : "D:";
				$(".spam").html(spam);
				if (data.spam) {
					$("body").css("background-color", "green");
				} else {
					$("body").css("background-color", "red");
				}
			},
			error: function(data) {
				$(".spam").html("X.x")
				$("body").css("background-color", "black");
			}
		});
	}
	setInterval(update, 1000);
})()

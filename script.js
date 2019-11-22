var BUTTON_ID = "btn_search"
var SELECT_ID = "platform"
var USER_ID = "username"
var OUTPUT_ID = "output"

var CODEFORCES_USER_RATING_URL = "https://codeforces.com/api/user.info?handles="
var HANDLE_NOT_FOUND_OUTPUT = "The requested username was not found."

function getCodeforcesUserInfoUrl(username){ return CODEFORCES_USER_RATING_URL + username;}

async function getCodeforcesRating(handle){
	console.log("getCodeforcesRating called")
	let url = getCodeforcesUserInfoUrl(handle)
	return fetch(url)
	.then((res) => res.json())
	.then((out) => {
		if(out.status=="OK"){
			return out.result[0].rating
		}else{
			return HANDLE_NOT_FOUND_OUTPUT
		}
	})
	.catch(err => { throw err })
}

async function getRating(username, platform){
	if(platform == "codeforces"){
		return await getCodeforcesRating(username)
	}
	else{
		return "Invalid Platform."
	}
}

async function initExtracter(){
	var username = document.getElementById(USER_ID).value
	var platform = document.getElementById(SELECT_ID).value
	var outputLocation = document.getElementById(OUTPUT_ID)
	var output=""
	
	if(username==""){
		output = "Please enter username."
	}
	else{
		output = await getRating(username, platform)
	}
	outputLocation.innerHTML = output
}

// event listeners
window.onload = function(){
	document.getElementById(BUTTON_ID).addEventListener("click", initExtracter)
}

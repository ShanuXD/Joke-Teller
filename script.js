const button = document.getElementById('button')
const audioElement = document.getElementById('audio')



//disable/enable Button
function toggleButton(){
    button.disabled = !button.disabled
}


//passing Joke To ViceRss Api
function tellMe(joke){

    console.log("joke:",joke)
    VoiceRSS.speech({
        key:"8d6f3bce82964e38b96dd1cd0955dc3b",
        src:joke,
        hl:"en-us",
        r:0,
        c:0,
        c:"mp3",
        f:"44khz_16bit_stereo",
        ssml:false
    });

}



async function getJoke(){
    try {

        let joke = ''

        apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=twopart'

        const response = await fetch(apiUrl)
        console.log(response)
        const data = await response.json()

        if (data.setup){
             joke = `${data.setup}... ${data.delivery}`
        }else{
            joke = data.joke
        }
        //text to speech
        tellMe(joke)
        //disable button
        toggleButton()
    } catch (error) {
        console.log("Opps",error)
    }
}

//Event Listeners
button.addEventListener("click", getJoke)

audioElement.addEventListener("ended",toggleButton )



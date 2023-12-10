import fs from 'fs';       //To read the file in
import tmi from 'tmi.js';  //Twitch API
import Pokedex from 'pokedex-promise-v2'; //PokeAPI

let botAcct, botToken; // Bot creds
const dex = new Pokedex();

try {
    const content = fs.readFileSync('./botinfo.txt', 'utf-8');

    // Extract name and color using regular expressions
    const idMatch = content.match(/username='(.*?)'/);
    const tokenMatch = content.match(/auth='(.*?)'/);

    if (idMatch && tokenMatch) {
        botAcct = idMatch[1];
        botToken = tokenMatch[1];
    } else {
        console.log("pcg-index.js: ", 'Could not extract name and color from the file content.');
    }
} catch (error) {
    console.error('Error reading the file:', error);
}

// Now you can use botAcct and botToken here
if (botAcct && botToken) {
    console.log("chedgob-index.js: ", "Successfully grabbed vars");
} else {
    console.log("chedgob-index.js: ", "Something went wrong. Bot account and token not available.");
}


//BOT CONNECTION OPTIONS
var options = {
    options: {
        debug: false
    },
    connection: {
        cluster: "aws",
        reconnect: true
    },
    identity: {
        username: botAcct,
        password: botToken
    },
    channels: ["abraxas86"]
};

var client = new tmi.client(options);
client.connect();


client.on('message', (channel, tags, message, self) => {
    if (self) return;

    const options = { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true };
    const timestamp = new Date().toLocaleTimeString('en-US', options);

    console.log("PCG Check: ", `${timestamp} [${channel}] <${tags.username}>: ${message}`);
	
	if (message.match(/^!PCGDemo/i))
	{  
		console.log('Fetching DEMO data...');
		(async () => { // with Async/Await
			try {
				const golduckSpecies = await dex.getPokemonSpeciesByName("golduck")
				const frenchName = golduckSpecies.names.filter(pokeAPIName => pokeAPIName.language.name === 'fr')[0].name
				console.log(frenchName)
			} catch (error) {
				throw error
			}
		})()
	}
	
	if (message.match(/^test/i))
	{ console.log('Received'); }
	
	
	if (message.match(/^!PCGLookup/i))
	{
		let pokeFind = parseMessage(message);
		
		if (pokeFind)
		{
			pokeFind = pokeFind.toLowerCase();
			(async () => { // with Async/Await
			try {
				console.log ('getting PokeSpecies Info...');
				const pokeSpeciesInfo = await dex.getPokemonSpeciesByName(pokeFind);
				const captureRate	= pokeSpeciesInfo.capture_rate; //int 1-255, higher = easier to catch
				console.log(captureRate);
				const isLegendary	= pokeSpeciesInfo.is_legendary; //boolean
				console.log(isLegendary);
				const isMythical	= pokeSpeciesInfo.is_mythical;  //boolean
				console.log(isMythical);
				
				console.log('Grabbing PokeInfo');
				const pokeInfo	= await dex.getPokemonByName(pokeFind);
				const pokeTypesRaw  = pokeInfo.types;
				var pokeTypes = [];
				
				for (let i = 0; i <= pokeTypesRaw.length - 1; i++)
				{
					pokeTypes.push(pokeTypesRaw[i].type.name);
				}	
				
				const PD = {
					  capture_rate: captureRate,
					  is_Legendary: isLegendary,
					  is_Mythical: isMythical,
					  pokeTypes: pokeTypes
				};

					console.log (`Info for ${pokeFind}:`)
					console.log (`Capture Rate: ${PD.capture_rate}`);
					console.log (`Legendary?  : ${PD.is_Legendary}`);
					console.log (`Mythical?   : ${PD.is_Mythical}`);
					console.log (`Type        : ${PD.pokeTypes}`);
					console.log ("-----------------------------------------------------");
		
				}
			catch (error) {
				throw error;
			}
			})();	
		}
		else
		{ client.say(channel, `@${tags.username} - you seem to have forgotten to include a Pokemon after the command.`); }

	}
		
});

function parseMessage(data)
{
    const regex = /^![^\s]+(.*)$/; // Matches everything after "!word"
    const match = data.match(regex);

    if (match) 
        { return match[1].trim(); } // Extracted text after "!word"
    else
        { return null;}
};


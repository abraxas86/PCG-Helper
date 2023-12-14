import fs from 'fs';       //To read the file in
import tmi from 'tmi.js';  //Twitch API
import Pokedex from 'pokedex-promise-v2'; //PokeAPI
import { exec } from 'child_process'; //for sending notifications to your phone (via termux api)

let botAcct, botToken, channels; // Bot creds
const dex = new Pokedex();

try {
    const content = fs.readFileSync('./botinfo.txt', 'utf-8');
    const config = JSON.parse(content);

    botAcct = config.username;
    botToken = config.auth;
    channels = config.channels;
    }
catch (error) {
    console.error(`Error reading the file ${botConfigPath}:`, error);
}

if (botAcct && botToken && channels) {
	console. clear();
    console.log("Successfully grabbed vars");
    console.log(`Operating in channels: ${channels}`);
} else {
    console.log("Something went wrong. Bot account, token, or channels not available.");
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
    channels: channels
};

var client = new tmi.client(options);
client.connect();

	const pokeballArt = `⠀⠀⠀⠀⠀⠀⠀⠀⣀⣤⣴⣶⣿⣿⣿⣿⣿⣿⣶⣦⣤⣀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⣠⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⣄⠀⠀⠀⠀⠀
⠀⠀⠀⣠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣄⠀⠀⠀
⠀⠀⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⠀⠀
⠀⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠋⠁⠀⠀⠀⠉⠻⣿⣿⣿⣿⣿⣿⣿⣿⣧⠀
⢰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠁⠀⢠⣶⣶⣦⠀⠀⠸⣿⣿⣿⣿⣿⣿⣿⣿⡆
⣿⣿⣿⣿⣿⣿⣿⣿⡿⠿⢻⣿⠀⠀⠸⣿⣿⡿⠁⠀⢀⣿⠈⠉⠙⠛⠿⢿⣿⣷
⣿⣿⣿⣿⣿⠿⠋⠁⠀⠀⠈⢿⣦⡀⠀⠈⠉⠀⠀⢀⣾⠏⠀⠀⠀⠀⠀⠀⢸⣿
⢿⣿⣿⠟⠁⠀⠀⠀⠀⠀⠀⠀⠙⠿⣶⣤⣤⣴⡾⠟⠃⠀⠀⠀⠀⠀⠀⠀⢸⣿
⠸⣿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣾⠇
⠀⢻⣧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⡟⠀
⠀⠀⠻⣧⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣼⠟⠀⠀
⠀⠀⠀⠙⢿⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⡿⠋⠀⠀⠀
⠀⠀⠀⠀⠀⠙⠻⣶⣤⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣤⣶⠟⠋⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠉⠛⠻⠷⣶⣶⣶⣶⣶⣶⠾⠟⠛⠉⠀⠀⠀⠀⠀⠀⠀⠀`


console.clear();
console.log(`\n\n${pokeballArt}`);
console.log('\n\nPokemonCommunityAugmentation: Awaiting next spawn...');


const userTimers = {}; // Object to store per-user timers
const userPokemonNames = {}; // Store pokemonName for each user



client.on('message', async(channel, tags, message, self) => {
    if (self) return;
    if (channel.toLowerCase() === '#deemonrider') return;

	console.log(`[${channel}] ${tags.username}: ${message}`);

    const options = { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true };
    const timestamp = new Date().toLocaleTimeString('en-US', options);
    const sender = tags.username;

    // Check for pingback of
    const pokeCheckRegex = /@(\S+) ((?:\S+\s?)+) is not registered in your Pokédex: :x:/;
    const pokeCheckResponse = message.match(pokeCheckRegex);
	
	//PCG Bot Messages
	if (tags['user-id'] === '519435394' || tags['user-id'] === '71635907')
	{ 
		const spawnEvent = /A wild (.*?) appears/ig.exec(message);

		if (spawnEvent) 
		{
			const spawned = spawnEvent[1];
			
			const spawnInfo = await getPokeInfo(spawned);
			const useBalls  = ballChecker(spawnInfo);

			// Android notification setup
			const notificationTitle  = `Pokemon Spanwed! ${spawned}!`;
			const notificationText   = `Capture Rate: ${spawnInfo.capture_rate}. Suggested balls: ${useBalls}`;
			const notificationAction = `termux-open "twitch://stream/deemonrider"`
			
			if (spawnInfo === null)
			{ 
				// client.say(channel, 'Unable to find information on that pokemon');
				return;
			}

			let LegendOrMyth = 'No';
			
			if (spawnInfo.is_Legendary === true)
			{ LegendOrMyth = 'Legendary!'; }
			if (spawnInfo.is_Mythical === true)
			{ LegendOrMyth = 'Mythical!'; }
			
			console.clear();

			console.log (`  ${timestamp} Pokemon Spawned!  ${spawned}`);
			console.log (`  ------------------------------------------------------`)
			console.log (`  Capture Rate      : ${spawnInfo.capture_rate}`);
			console.log (`  Legendary/Mythical: ${LegendOrMyth}`);
			console.log (`  Types             : ${spawnInfo.types}`);
			console.log (`  Throw List:`);
			console.log();

			useBalls.forEach((ball, index) => {
			  console.log(`!pokecatch ${ball}`);
			});

			// Send notification to phone
			exec(`termux-notification --title "${notificationTitle}" --content "${notificationText}"  --action "${notificationAction}" --priority "max"`, (error, stdout, stderr) => {
			  if (error) {
			    console.error(`Error: ${error.message}`);
			    return;
			  }
			  if (stderr) {
			    console.error(`Error: ${stderr}`);
			    return;
			  }
			});
		}
	}

	// me, for debugging
	if (tags['user-id'] === '71635907')
	{ 
		const xspawnEvent = /A wild (.*?) appears/ig.exec(message);

		if (xspawnEvent) 
		{
			const xspawned = xspawnEvent[1];

			const xspawnInfo = await getPokeInfo(xspawned);
			const xuseBalls  = ballChecker(xspawnInfo);
			
			if (xspawnInfo === null)
			{ 
				// client.say(channel, 'Unable to find information on that pokemon');
				return;
			}

			let xLegendOrMyth = 'No';
			
			if (xspawnInfo.is_Legendary === true)
			{ xLegendOrMyth = 'Legendary!'; }
			if (xspawnInfo.is_Mythical === true)
			{ xLegendOrMyth = 'Mythical!'; }
			
			// client.say(channel, `Pokedex Information about ${xspawned}:`);
			// client.say(channel, `𝙲𝚊𝚝𝚌𝚑 𝚁𝚊𝚝𝚎           : ${xspawnInfo.capture_rate}`);
			// client.say(channel, `𝙻𝚎𝚐𝚎𝚗𝚍𝚊𝚛𝚢 𝚘𝚛 𝙼𝚢𝚝𝚑𝚒𝚌𝚊𝚕?: ${xLegendOrMyth}`);
			// client.say(channel, `𝚃𝚢𝚙𝚎                : ${xspawnInfo.types}`);
			// client.say(channel, `𝙱𝚊𝚕𝚕𝚜				: ${xuseBalls} ( ${xuseBalls.join(' ')} )`);
		}

	}

  /*
	if (message.match(/^!pokecheck/i))
	{
        if (!userTimers[sender]) {
            // Use the user-specific object to store pokemonName
            userPokemonNames[sender] = pokeCheckResponse ? pokeCheckResponse[2] : ''; 

            userTimers[sender] = setTimeout(() => {
                // Use the user-specific pokemonName in the response
                client.say(channel, `@${sender} ${userPokemonNames[sender]} is registered in your pokedex: ✔`);
            }, 1000);
        }
	}
 */

	// Check for the expected response from PokemonCommunityGame
	const expectedResponseRegex = /(@\S+) ((?:\S+\s?)+) registered in/i;
	const matchResult = message.match(expectedResponseRegex);
	const responseFor = matchResult ? matchResult[1].substring(1) : null;
	const pokeFor = matchResult ? matchResult[2] : null;

	if (message.match(expectedResponseRegex) && userTimers[responseFor]) {
		console.log ('detected!')
	    // Clear the timer since the expected response came before the timer expired
	    clearTimeout(userTimers[responseFor]);
	    delete userTimers[responseFor];
	    delete userPokemonNames[responseFor];
	}

	
	
	if (message.match(/^!PCGLookup/i))
	{
		return;
		let pokeFind = parseMessage(message);
		
		if (pokeFind)
		{
			const pokeInfo = await getPokeInfo(pokeFind);
			const bestBalls = ballChecker(pokeFind);
			
			if (pokeInfo === null)
			{ 
				// client.say(channel, 'Unable to find information on that pokemon');
				return;
			}

			let LegendOrMyth = 'No';
			
			if (pokeInfo.is_Legendary === true)
			{ LegendOrMyth = 'Legendary!'; }
			if (pokeInfo.is_Mythical === true)
			{ LegendOrMyth = 'Mythical!'; }
			
			// client.say(channel, `Pokedex Information about ${pokeFind}:`);
			// client.say(channel, `[𝙲𝚊𝚝𝚌𝚑 𝚁𝚊𝚝𝚎: ${pokeInfo.capture_rate}] [𝙻𝚎𝚐𝚎𝚗𝚍𝚊𝚛𝚢/𝙼𝚢𝚝𝚑𝚒𝚌𝚊𝚕: ${LegendOrMyth}] [𝚃𝚢𝚙𝚎: ${pokeInfo.types}] [${bestBalls} ( ${bestBalls.join(' ')} )]`);
		}
		else
		{ 
		// client.say(channel, `@${tags.username} - you need to include a Pokemon name after the command.`); 
		}
	}
			
});

function parseMessage(data)
{
    const regex = /^![^\s]+(.*)$/; // Matches everything after "!word"
    const match = data.match(regex);

    if (match) 
        { return match[1].trim(); } // Extracted text after "!word"
    else
        { return null; }
};

async function getPokeInfo(pokemonName){ // with Async/Await

			//Sanitize variable to meet API requirements
			pokemonName = pokemonName.toLowerCase().replace(/ /g, '-').replace(/\./g, '');

			//MANUAL OVERRIDES FOR STUPID POKEMON NAMES
			// These pokemon names are listed in a weird way in the API.
			// These fixes should help make sure they're properly ID'd.
			
			// Mr Mime
			if (pokemonName.match(/mrmime/ig) || pokemonName.match(/mr.mime/ig))
			{ pokemonName = 'mr-mime' }
			
			// Oricorio
			if (pokemonName.match(/oricorio/ig))
			{ pokemonName = 'oricorio-baile'; }
		
			// Lycanroc
			if (pokemonName.match(/lycanroc/ig))
			{pokemonName = '745'; }

			try 
			{
				//console.log('Grabbing PokeInfo, please wait...');
				const pokeInfo		= await dex.getPokemonByName(pokemonName);
				const pokemonID		= pokeInfo.id;
				const pokeTypesRaw  = pokeInfo.types;
				var pokeTypes 		= [];
				const pokeWeight	= pokeInfo.weight; // 0 to 9999
				const pokeStats		= pokeInfo.stats;
				
				for (let i = 0; i <= pokeTypesRaw.length - 1; i++)
				{
					pokeTypes.push(pokeTypesRaw[i].type.name);
				}
				
				
				//console.log ('getting PokeSpecies Info, please wait...');
				const pokeSpeciesInfo 	= await dex.getPokemonSpeciesByName(pokemonID);
				const captureRate		= pokeSpeciesInfo.capture_rate; //int 1-255, higher = easier to catch
				const isLegendary		= pokeSpeciesInfo.is_legendary; //boolean
				const isMythical		= pokeSpeciesInfo.is_mythical;  //boolean
				
				const PD = {
					  capture_rate: captureRate,
					  is_Legendary: isLegendary,
					  is_Mythical: isMythical,
					  types: pokeTypes,
					  weight: pokeWeight,
					  stats: pokeStats
				};

/*
					console.log (`Info for ${pokemonName}:`);
					console.log (`Capture Rate: ${PD.capture_rate}`);
					console.log (`Legendary?  : ${PD.is_Legendary}`);
					console.log (`Mythical?   : ${PD.is_Mythical}`);
					console.log (`Type        : ${PD.types}`);
					console.log (`Weight 	  : ${PD.weight}`);
					console.log ("-----------------------------------------------------");
*/

				return PD;
			}
			catch (error) 
			{ 
				// console.log(error); 
				return null;
			}
}

function ballChecker(pokemon)
{
	var balls		= [];
	// console.log(pokemon);
	var pokeHP		= getBaseStat(pokemon.stats, 'hp');
	var pokeSpeed	= getBaseStat(pokemon.stats, 'speed');
	
	if (pokemon.capture_rate >= 175)
	{ 
	  balls.push('Pokeball'); 
	  balls.push('Premierball');
	}
	else if (pokemon.capture_rate >= 100)
	{ balls.push('Greatball'); }
	else if (pokemon.capture_rate >= 25)
	{ balls.push('Ultraball'); }
	else
	{ balls.push('Masterball'); }
	
	//Chonker alert!
	if (pokemon.weight >= 2000)
	{ balls.push('Heavyball'); }
	
	//Light bois
	if (pokemon.weight <= 602)
	{ balls.push('Featherball'); }
	
	if (pokemon.types.includes('bug') || pokemon.types.includes('water'))
	{ balls.push('Netball'); }
	
	if (pokemon.types.includes('ghost'))
	{ balls.push('Phantomball'); }

	if (pokemon.types.includes('dark'))
	{ balls.push('Nightball'); }

	if (pokemon.types.includes('ice'))
	{ balls.push('Frozenball'); }

	if (pokemon.types.includes('poison') || pokemon.types.includes('psychic'))
	{ balls.push('Cipherball'); }

	if (pokemon.types.includes('electiric') || pokemon.types.includes('steel'))
	{ balls.push('Magnetball'); }

	if (pokeHP >= 100)
	{ balls.push('Healball'); }

	if (pokeSpeed >= 100)
	{ balls.push('Fastball'); }

	return balls;
}


// Function to get the base_stat for a specific stat name
function getBaseStat(stats, statName)
{
	// console.log(stats);
		const stat = stats.find(stat => stat.stat.name.toLowerCase() === statName.toLowerCase());
		// console.log(`${statName}: ${stat}`);
		return stat ? stat.base_stat : null;

}

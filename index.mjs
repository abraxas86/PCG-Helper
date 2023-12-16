const args = process.argv.slice(2);
const isMobile = args.includes('-mobile'); //Trigger "mobile mode"
const isSilent = args.includes('-silent'); //Trigger "silent mode"

/* Operating Modes:
- Normal: No args, outputs to terminal + chat
- Silent: "-silent" switch.  Terminal output only, nothing sent to chat
- Mobile: "-mobile" switch.  Operates like "silent" but with a recduced column count and will send notifications to your phone via Termux:API
*/

import fs from 'fs';       		    	  //To read the file in
import tmi from 'tmi.js';  		 		  //Twitch API
import Pokedex from 'pokedex-promise-v2'; //PokeAPI

//for sending notifications to your phone (via termux api) 
if (isMobile) {
  import('child_process').then(childProcess => {
    const { exec } = childProcess;
  }).catch(error => {
    console.error('Error importing child_process:', error);
  });
}


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

// Pokecheck Timers
const userTimers = {};
const userPokemonNames = {} ;

// Check for pingback of Pokecheck
const pokeCheckRegex = /@(\S+) ((?:\S+\s?)+) is not registered in your Pokédex: :x:/;
const pokeCheckRegex2 =  /@(\S+) Please choose a valid Pokémon or Pokédex-ID./;


client.on('message', async(channel, tags, message, self) => {
    if (self) return;
   
    const options = { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true };
    const timestamp = new Date().toLocaleTimeString('en-US', options);
    const sender = tags.username;
    const pokeCheckResponse = message.match(pokeCheckRegex); //for pokecheck pingback (pokemon not registered)
    const pokeCheckResponse2 = message.match(pokeCheckRegex2); //for pokecheck pingback (invalid pokemon name)


    //Pokecheck
	if (message.match(/^!pokecheck/i))
	{
        if (!userTimers[sender]) {
            // Use the user-specific object to store pokemonName
            userPokemonNames[sender] = pokeCheckResponse ? pokeCheckResponse[2] : ''; 

            userTimers[sender] = setTimeout(() => {
                // Use the user-specific pokemonName in the response
                if (!channel.toLowerCase().includes("deemonrider")){
	            	if (!isMobile && !isSilent){
               		 client.say(channel, `@${sender} ${userPokemonNames[sender]} is registered in your pokedex: ✔`);
               		}
               	}
            }, 1000);
        }
	}


		// Check for the expected response from PokemonCommunityGame
		const expectedResponseRegex = /(@\S+) ((?:\S+\s?)+) registered in/i;
		const expectedResponseRegex2 = /@(\S+) Please choose a valid Pokémon/i;
		const matchResult = message.match(expectedResponseRegex);
		const responseFor = matchResult ? matchResult[1].substring(1) : null;
		//const pokeFor = matchResult ? matchResult[2] : null;

		if (message.match(expectedResponseRegex) && userTimers[responseFor]) {
		    // Clear the timer since the expected response came before the timer expired
		    clearTimeout(userTimers[responseFor]);
		    delete userTimers[responseFor];
		    delete userPokemonNames[responseFor];
		}
	
	//PCG Bot Messages
	if (tags['user-id'] === '519435394' || tags['user-id'] === '71635907')
	{ 
		const spawnEvent = /A wild (.*?) appears/ig.exec(message);

		if (spawnEvent) 
		{
			const spawned = spawnEvent[1];
			
			const spawnInfo = await getPokeInfo(spawned);
			const useBalls  = ballChecker(spawnInfo);

			if (isMobile){
			// Android notification setup
			const notificationTitle  = `Pokemon Spanwed: ${spawned}!`;
			const notificationText   = `Capture Rate: ${spawnInfo.capture_rate}.\nSuggested balls: ${useBalls.join(', ')}`;
			const notificationAction = `termux-open "twitch://stream/deemonrider"`
			
			const notificationImage = `${process.env.HOME}/storage/downloads/icon.png`;

			const getImage = `wget ${spawnInfo.sprite} -O '${notificationImage}'`; //save sprite locally;

			const downloadImage = () => {
			  return new Promise((resolve, reject) => {
			    exec(getImage, (error, stdout, stderr) => {
			      if (error || stderr) {
			        reject(error || stderr);
			      } else {
			        resolve();
				      }
				    });
				  });
				};
			
				// Use async/await to download the image
				try {
				  await downloadImage();
				  // Send notification only if the image download was successful
				  sendNotification(notificationTitle, notificationText, notificationAction, notificationImage);
				} catch (error) {
				  console.error('Error downloading image:', error);
				}
				
				function sendNotification(title, content, action, imagePath) {
				  // Send notification to phone
				  exec(`termux-notification --title "${title}" --content "${content}" --action "${action}" --priority "high" --channel-id "PCG-spawn-detected" --image-path "${imagePath}"`, (error, stdout, stderr) => {
				    if (error) {
				      console.error(`Error sending notification: ${error.message}`);
				    }
				    if (stderr) {
				      console.error(`Error sending notification: ${stderr}`);
				    }
				  });
				}
			} //end mobile notification setup

			if (spawnInfo === null)
			{ 
				return;
			}

			let LegendOrMyth = 'No';
			
			if (spawnInfo.is_Legendary === true)
			{ LegendOrMyth = 'Legendary!'; }
			if (spawnInfo.is_Mythical === true)
			{ LegendOrMyth = 'Mythical!'; }

			if (!channel.toLowerCase().includes("deemonrider")) {
				if (!isSilent && !isMobile)
				{
					client.say(channel, `Pokedex Information about ${spawned}:`);
					client.say(channel, `[𝙲𝚊𝚝𝚌𝚑 𝚁𝚊𝚝𝚎: ${spawnInfo.capture_rate}] blankSpace [𝚃𝚢𝚙𝚎: ${spawnInfo.types}] blankSpace [ ${useBalls.join(' ')} ]`)
					client.say(channel, `Recommended balls: ${useBalls} ( ${useBalls.join(' ')} )`);

					if (spawnInfo.is_Legendary || spawnInfo.is_Mythical)
						{ client.say(channel, `ALERTA ${LegendOrMyth.toUpperCase()}! ${LegendOrMyth.toUpperCase()}! ${LegendOrMyth.toUpperCase()}! ${LegendOrMyth.toUpperCase()}! ${LegendOrMyth.toUpperCase()}! ALERTA`) }
				}
			}
			
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
		
			if (isMobile){
				// Send notification to phone
				exec(`termux-notification --title "${notificationTitle}" --content "${notificationText}"  --action "${notificationAction}" --priority "high" --image-path "${notificationImage}"`, (error, stdout, stderr) => {
				  if (error) {
				    console.error(`Error: ${error.message}`);
				    return;
				  }
				  if (stderr) {
				    console.error(`Error: ${stderr}`);
				    return;
				  }
				});
			} // end if mobile notification send
		} // end if spawn event	
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
	{ pokemonName = 'mr-mime'; }
	
	// Oricorio
	if (pokemonName.match(/oricorio/ig))
	{ pokemonName = 'oricorio-baile'; }
	
	// Lycanroc
	if (pokemonName.match(/lycanroc/ig))
	{pokemonName = '745'; }
	
	// Nidoran (Female)
	if (pokemonName.match(/Nidoran♀/ig))
	{ pokemonname = 'nidoran-f'; }
	    
	// Nidoran (Male)
	if (pokemonName.match(/Nidoran♂/ig))
	{ pokemonName = 'nidoran-m'; }
	
	
	try 
	{
		const pokeInfo		= await dex.getPokemonByName(pokemonName);
		const pokemonID		= pokeInfo.id;
		const pokeTypesRaw  	= pokeInfo.types;
		var pokeTypes 		= [];
		const pokeWeight	= pokeInfo.weight; // 0 to 9999
		const pokeStats		= pokeInfo.stats;
		const sprite		= pokeInfo.sprites.front_default
		
		for (let i = 0; i <= pokeTypesRaw.length - 1; i++)
		{
			pokeTypes.push(pokeTypesRaw[i].type.name);
		}
		
		
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
			  stats: pokeStats,
			  sprite: sprite
		};
	
		return PD;
	}
	catch (error) 
	{ 
		return null;
	}
}

function ballChecker(pokemon)
{
	var balls 	= [];
	var pokeHP	= getBaseStat(pokemon.stats, 'hp');
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

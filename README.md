# PCG-Lookup

## What's this?
This is a Twitch bot that is meant to augment the PokemonCommunityGame created by @deemonrider and @jonaswagern.  The bot listens to the Twitch chat for spawns from the PCG bot and will provide some information on the pokeon as well as which balls will be best to use.  It also restores the ping-back if you already have the pokemon you're doing a !pokecheck on.

## Features:
- Chat integration. Will provide information in-chat so you viewers can have a better chance at catching their pokemon
- Restores pingback if you !pokecheck a pokemon you already have
- Terminal output shortcuts for each pokeball that you can copy/paste straight into the chat
- `-silent` switch to ONLY output information in the terminal
- `-mobile` switch to run in Termux in Android.  It will display the information in the terminal, but also generate Android notifications when a pokemon spanws.  Clicking the notification will send you to @deemonrider's stream so you can try to catch the pokemon.


## How does that work?
When the Pokemon Community Game bot chats a spawn an encounter, it reaches out to the Poke API (https://pokeapi.co/) to grab some basic stats on the pokemon.  It then uses this information to determine the best ball choices to throw at that pokemon.  The information for that data is based partially on the PCG documentation as well as information on Bulbapedia.



## What you'll need:
Ensure **NodeJS** is installed on your computer.  
***NOTE:*** This bot was developed in Linux and is untested in Windows, I have no idea if it will work there.

 
### Setting it up:
- Clone the git (or just download `botinfo_template.txt` and `index.mjs`
- Edit `botinfo_template.txt` with your bot's _username_, _OAUTH token_, and the _channels_ you want it to sit in
- Rename your modified `botinfo_template.txt` to *botinfo.txt*
- `npm install` to download the dependencies needed:
   -  `tmi.js`: for interfacing with Twitch chat
   -  `fs`: to read in the info from botinfo.txt
   -  `pokedex-promise-v2`: The Pokemon REST API, for grabbing the metadata on the Pokemon
   -  `child_process`: (optional) needed for Android notifications

### Running the bot:
- `node index.mjs`  for the fully-fledged version that outputs to the terminal and chat
- `node index.mjs -silent` for the version that only ouputs to the terminal (no Twitch chat integration)
- `node index.mjs -mobile` for the Android version.  This runs similar to Silent, but generates Android notifictaions, too.
- For your Twitch channel, you'll want to use something like BTTV and/or FFZ to make emotes of each pokeball type.  You'll want them to be triggered by their name with the first letter capitalized (ie: Ultraball, Pokeball, Netball, etc)

## Disclaimer:
The ball predictions probably aren't perfect.  I only had so much to work with so some of my math might be too generous/not generous enough.
I've also done my best to prevent the bot from dropping chats in Deemonrider's chat, however there is always the possibility that I screwed something up.  I'm not responsible if you get banned for spamming that channel.  If you want to be safe, don't put them in your list of channels to connect to.

#### To Do:
[ ] Figure out how to make the chat formatting look nicer.  I really wish Twitch would allow multiline messages...


#### Done:
[X] Fix the !PCGLookup command  
[X] Add the channels to connect to in botinfo.txt instead of hard-coding them.

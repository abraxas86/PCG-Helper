# PCG-Lookup

## What's this?
A Twitch bot that grabs data from the Pokemon REST API.  Meant to be used in conjunction with the Pokemon Community Game (PCG)

## How does that work?
When the Pokemon Community Game chats a spawn an encounter, it reaches out to the Poke API (https://pokeapi.co/) to grab some basic stats on the pokemon.  It then uses this information to determine the best ball choices to throw at that pokemon.  The information for that data is based partially on the PCG documentation as well as information on Bulbapedia.

## How do I use it?
I have no idea what I'm doing, so hopefully I have things set up correctly...  Note that I run this solely on a Linux computer, I have no idea what's required to get this working in Windows.

### What you'll need:
- Nodejs
  - npm packages:
      - *fs*: Used to read the botinfo.txt to get the account name and oauth token for the bot
      - *tmi.js*: Used to connect to Twitch and interface with the chat
      - *pokedex-promise-v2*: Used for connecting with the Poke API
   
### Setting it up:
- Edit ***botinfo.txt*** with your bot's username and OAUTH token
- `node index.js` to start the bot

## Disclaimer
The ball predictions probably aren't perfect.  I only had so much to work with so some of my math might be too generous/not generous enough.

## To Do:
- Fix the !PCGLookup command
- Figure out how to make the chat formatting look nicer.  I really wish Twitch would allow multiline messages...
- I need to add the channels to connect to in botinfo.txt instead of hard-coding it.

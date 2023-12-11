# PCG-Lookup

## What's this?
A Twitch bot that grabs data from the Pokemon REST API.  Meant to be used in conjunction with the Pokemon Community Game (PCG)

## How does that work?
When the Pokemon Community Game chats a spawn an encounter, it reaches out to the Poke API (https://pokeapi.co/) to grab some basic stats on the pokemon.  It then uses this information to determine the best ball choices to throw at that pokemon.  The information for that data is based partially on the PCG documentation as well as information on Bulbapedia.

## Disclaimer
The ball predictions probably aren't perfect.  I only had so much to work with so some of my math might be too generous/not generous enough.

## To Do:
- Fix the !PCGLookup command
- Figure out how to make the chat formatting look nicer.  I really wish Twitch would allow multiline messages...

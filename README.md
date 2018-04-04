## IMPORTANT: Notice on media content...

So most of (if not all) the images and audio files that are included in this project have been taken from somewhere else on the wonderful web, I in no way take any credit for these wonderful works that others have done (except for my awesome map.png) 
<div style="text-align: center;"><img src="media/map.png" title="My sexy map" width="300"></div>
I have only included them as part of the project to give the software the visual and audio elements it needs in order to showcase its abilities. The idea is that when you take the software and use it for your campaign that you would replace the existing 'showcase' media with your own from your campaign... In order to test the software I actually needed an existing campaign to see if it did what I thought it would do so the data that is included is actually the data from my current DnD campaign that I am running, so thats nice.
<br/>Again I do not take credit for the image files or audio files included in this project they are there just to showcase the system...
<br/>
<br/>

# The RPG Recapper
<img style="float: left; margin: 10px;" src="./media/favicon-196x196.png">

<br/>

As a Dungeon master, have you ever wished that there was a more **visual** way that you could recap your RPG adventures to your hereos and with a simple click of a button replay the entire campaign for everyone to see, ranging from the vast distanes travelled to the intense battle encounters to the creative and ridiculous social interactions that the players have with NPCs?

Well look no further as the **RPG Recapper** is the tool for you...
<br/>
<br/>
<br/>


## What is the RPG Recapper?

The RPG Recapper is written in HTML, JS and CSS and is essentially a framework that is driven entirely by user created JSON objects. The RPG Recapper takes in data about your campaign, characters and locations and presents them in a visual way that lets the players and spectators interact with them. It allows you to replay your campaign from session to session to see what happened in a simple animated way.

### This is a WIP (Work in progress)...

This software is currently very much a work in progress. There is a TODO list as long as my arm however I am looking for people to contribute to this in order to get this to be a RPG Tool in every DM's/Player's arsenal.
<br/>
<br/>
This README is also WIP...
<br/>
<br/>
Also mega sorry about the messy state of the code, its currently a mess!

## Installation

## Using it...

The most important folder in this entire system is the folder:

> /data

Inside of that folder you will find a whole bunch of JSON files, the main one being: 

> /data/index.json

This contains all of the information about your campaign overall including, the map to use, the campaign name and the PCs in the campaign. However most importantly it contains data about the individual sessions that your campaign has had and these are consituted as literally sit down sessions from start to finish that you and your party have had. 

```
"sessions":[
    "data/session1.json",
    "data/session2.json",
    "data/session3.json",
    "data/session4.json",
    "data/session5.json"
]
```

As you can see **sessions** is an array of individual sessions and each session points to its own JSON file (also located in the /data folder). The individual session file is covered in a the section below...

## The Session file...




## The story behind the tool




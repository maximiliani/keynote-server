# Keynote server

[![CodeQL](https://github.com/maximiliani/keynote-server/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/maximiliani/keynote-server/actions/workflows/github-code-scanning/codeql)
[![Node.js CI](https://github.com/maximiliani/keynote-server/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/maximiliani/keynote-server/actions/workflows/node.js.yml)

This is a server where you can upload and manage Apple Keynote presentations for a single signage display. 
You have to upload the *.zip* compressed file of the presentation.
To generate the *.zip* file, you have to go to the menu `File > Export to > HTML` and save the directory. 
Then, you have to compress the directory and upload it to the server.

Note: To make a full digital signage experience you have to design your Keynote to automatically advance and loop the slides.

Note: If you change the active presentation, you'll have to refresh the signage view.

## How to install

1. Clone this repository
2. Install dependencies with `npm install`
3. Run the development server with `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the dashboard. Open [http://localhost:3000/present](http://localhost:3000/present) to see the signage view.

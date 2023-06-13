#!/bin/sh

# Start the server
cd /root/keynote-server
npm install
npm run build
npm start
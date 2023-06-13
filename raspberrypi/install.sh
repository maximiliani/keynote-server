#! /bin/bash

# Install the required packages
apt update
apt upgrade -y
apt install nodejs npm  -y

# Install Keynote-Server
#cd /root
#git clone https://github.com/maximiliani/keynote-server.git
echo "KIOSK_RESTART="systemctl restart keynote-server.service"" >> /root/keynote-server/.env
mv /root/keynote-server/raspberrypi/kiosk.service /lib/systemd/system/kiosk.service
mv /root/keynote-server/raspberrypi/keynote-server.service /lib/systemd/system/keynote-server.service
systemctl enable kiosk.service
systemctl enable keynote-server.service
systemctl start kiosk.service
systemctl start keynote-server.service

reboot
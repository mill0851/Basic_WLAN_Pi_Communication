# How to Communicate With a Raspberry Pi over WLAN Using a Web Interface
In this repository I setup a web based connection between my computer and my Raspberry Pi Zero 2 W with the goal of devleoping a starting point for more complicated projects in the future. While I will use a specific hardware setup and tech stack in this tutorial the methods will be quite general and apply to almost any tech/hardware stack. The main things to take away from this tutorial will be the system architecture, headless pi implementation, and a few of the GPIO libraries used.

# Requirements
* Raspberry Pi (Any Model, I will use the Zero 2 W)
* A way to power the Pi (probably came with it)
* A WIFI network which is suitable for use with a headless raspberry pi. I live on a university campus where the network has extra restrictions so I will use a travel router to host my network.
* A breadboard with some periphial device. I will use an LED and modulate its brightness with a PWM signal (See circuit schematic)
* A computer with a linux terminal. If you are on windows I reccomend the Ubuntu WSL from the Microsoft app store

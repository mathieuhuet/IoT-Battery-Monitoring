![](client/public/favicon.png)

# IoT Battery Monitoring

This is an app that monitors the battery data of two IoT devices.

This variable display :
![](client/public/favicon.png)

And this traffic data collector : 
![](client/public/favicon.png)

You can view the live state of the battery and also a graph of past data to monitor the batteries behavior.


## Getting Started

To install the required dependencies, go to `/server` and run `npm install`, after that do the same thing in `/client`.

You need to add this cronjob to be able to use the graph feature if you wanna monitor the batteries behavior over time.
*/10 * * * * `PATH TO cronjob`



## Tech Stack

The front-end framework is React.js

The back-end server is Koa

The database is PortgreSQL

The Map API is Google Map Platform

The Weather data is provided by OpenWeather

The graph component is Chart.js
# Solar Installation Application

##### A basic application to fetch data from Aurora Solar databases.

To setup, simply run
  `npm install` followed by 
  `npm start`
and then navigate to  localhost:5000.

## Features and Instructions

__Fetch Component List:__  This button fetches all components of the specific plant and displays them all as clickable list items.

__Fetch Channel List:__ Clicking a component automatically fetches the channel list for that component.  Alternatively, you can type in a component name into the input box and manually click fetch channel list to receive the same information.  

__Fetch Data Points:__ Lastly, this application makes it easy to fetch data points for a given device and channel.  Simply enter the device name and channel name into input boxes and click on the button, or you can click on a component and a channel from their respective lists and the application will automatically search for the information.  The information will load below the inputs.

Another feature of data point fetching is that if you leave the device name blank, it will search through all devices for the given channel information and return all results.

## Future Directions

If I had more time with this application I would of course style the page better.  I would also add more data analysis logic such as being able to calculate the average value of multiple data points.

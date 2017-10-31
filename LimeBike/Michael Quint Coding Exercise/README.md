## LimeBike Baskets

Item counter reliably processes bike rides and prints out a summary of the items in transit during every given time interval.

I created three separate arrays to hold ride information.  @ride_start and @ride_end hold start and end times respectively, and the @rides array holds the finished sorted hashes to be formatted and printed out.  I used arrays because ordering was critical and most of the computations were pushing and shifting which both run in  O(1) time.  Sorting only happens once before printing.  Ruby implements quicksort which has an average runtime of O(n*log(n)).  This is the overall time complexity for the instance.

The items hash holds references to the rides and the contained items, which saves memory over explicitly listing out each item during processing.

#### Assumptions

For this implementation I assumed the rides were coming in as Ruby hashes with a start_time, end_time, and items.  I assumed the times were integers and the items were an array of strings.

I created format_items and format_times methods to take the inputs and format them for printing.  If the data came in looking a bit differently, only these methods would need to be updated to format the output.  For example, if the ride times had dates associated with them, the processing would function the same since it just uses simple comparison.  The format_times method could be adjusted to output the day, month, and year as well as the time.

#### Applications

Item counting is a useful functionality that could have real world applications and reveal useful information to a business.  In real life, LimeBike cannot know what is being held in their bike baskets (without customer input) but they do know other information about the ride.  For example, maybe the company would be curious to know where the bikes are at different times of day.  Location information can be obtained using the bikes built in GPS.  If we replace items with neighborhoods travelled through, LimeBike could see trends of where their bikes tend to be used and located at different times of the day or different days of the week.

Any other information such as ride length or consumer demographic could be analyzed with a modification of this function and provide good data the company can use for marketing or relocation of bikes.

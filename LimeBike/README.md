
possible uses for this in the real world for the company

Spent a lot of time thinking about data structures, optimizing for space and time

Make sure to make code clean and efficient!

## LimeBike Baskets

Item counter reliably processes bike rides and prints out a summary of the items in transit during every given time interval.

I created three separate arrays to hold ride information.  @ride_start and @ride_end hold start and end times respectively, and the a reference to the items which were carried on that ride. the @rides array holds the finished sorted hashes to be formatted and printed out.  I used arrays because ordering was critical and most of the computations were pushing and shifting which both run in  O(1) time.  Sorting only happens once before printing.  Ruby implements quicksort which has an average runtime of O(n*log(n)).  This is the overall time complexity for the instance.

The items hash holds references to the rides and the contained items, which saves memory over explicitly listing out each item during processing.

#### Assumptions

For this implementation I assumed the rides were coming in as Ruby hashes with a start_time, end_time, and items.  I assumed the times were integers and the items were an array of strings.

I created format_items and format_times methods to take the inputs and format them for printing.  If the data came in looking a bit differently, only these methods would need to be updated to format the output.  For example, if the ride times had dates associated with them the processing would function the same since it just uses simple comparison.  The format_times method could be adjusted to output the day, month, and year as well as the time.

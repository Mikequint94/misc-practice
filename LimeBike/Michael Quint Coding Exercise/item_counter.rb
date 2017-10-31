class ItemCounter

  def initialize
    @ride_start = []
    @ride_end = []
    @rides = []
    @items = {}

    @ride_number = 1
  end

  def process_ride(ride)
    @ride_start.push([ride[:start_time], @ride_number])
    @ride_end.push([ride[:end_time], @ride_number])
    @items[@ride_number] = ride[:items]

    @ride_number +=1
  end

  def print_items_per_interval()
    finish_processing
    @rides.each do |ride|
      start_time = format_times(ride[:start_time])
      end_time = format_times(ride[:end_time])
      items = format_items(ride[:items])
      p "#{start_time}-#{end_time} -> #{items}"
    end
  end

  def finish_processing
    @ride_start.sort!
    @ride_end.sort!
    interval_start = @ride_start.shift
    current_items = [interval_start[1]]
    until @ride_start.empty?
      #compare earliest start and end times
      if @ride_start[0][0] < @ride_end[0][0]
        interval_end = @ride_start.shift
        item_operator = :+
      else
        interval_end = @ride_end.shift
        item_operator = :-
      end
      unless current_items.empty? || (interval_start[0] == interval_end[0])
        @rides.push(start_time: interval_start[0], end_time: interval_end[0], items: current_items)
      end
      interval_start = interval_end
      # add or subtract items based on whether the ride is starting or ending
      current_items = current_items.send(item_operator, [interval_start[1]])
    end
    until @ride_end.empty?
      interval_end = @ride_end.shift
      unless current_items.empty? || (interval_start[0] == interval_end[0])
        @rides.push(start_time: interval_start[0], end_time: interval_end[0], items: current_items)
      end
      interval_start = interval_end
      current_items -= [interval_start[1]]
    end
  end

  def format_times(time)
    time = time.to_s
    time = "0" + time if time.length == 3

    return time[0..1] + ":" + time[2..3]
  end

  def format_items(items)
    item_hash = Hash.new(0)
    items.each do |item_bundle|
      @items[item_bundle].each do |item|
        item_hash[item] += 1
      end
    end
    item_with_count = []
    item_hash.each do |item, count|
      if count > 1
        item_with_count << ["#{count} #{item}s"]
      else
        item_with_count << ["#{count} #{item}"]
      end
    end
    return item_with_count.join(", ")
  end

end

# Testing

# tested for excluding time intervals without any items
# tested for excluding duplicate intervals
ride1 = {start_time: 700, end_time: 730, items: ["apple", "apple", "brownie"]}
ride2 = {start_time: 710, end_time: 800, items: ["apple", "carrot", "carrot", "carrot"]}
ride3 = {start_time: 720, end_time: 745, items: ["apple", "brownie", "brownie", "diamond", "diamond", "diamond", "diamond"]}
ride4 = {start_time: 830, end_time: 900, items: ["pear", "peach", "brownie", "diamond"]}
ride5 = {start_time: 830, end_time: 930, items: ["apple"]}
ride6 = {start_time: 820, end_time: 830, items: ["plum","plum","plum"]}
ride7 = {start_time: 820, end_time: 830, items: ["plum","plum","plum"]}

counter = ItemCounter.new
# tested for processing in non-linear order
counter.process_ride(ride3)
counter.process_ride(ride2)
counter.process_ride(ride1)
counter.process_ride(ride4)
counter.process_ride(ride5)
counter.process_ride(ride6)
counter.process_ride(ride7)

counter.print_items_per_interval

# "07:00-07:10 -> 2 apples, 1 brownie"
# "07:10-07:20 -> 3 apples, 1 brownie, 3 carrots"
# "07:20-07:30 -> 4 apples, 3 brownies, 3 carrots, 4 diamonds"
# "07:30-07:45 -> 2 apples, 3 carrots, 2 brownies, 4 diamonds"
# "07:45-08:00 -> 1 apple, 3 carrots"
# "08:20-08:30 -> 6 plums"
# "08:30-09:00 -> 1 pear, 1 peach, 1 brownie, 1 diamond, 1 apple"
# "09:00-09:30 -> 1 apple"

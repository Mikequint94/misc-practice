require 'byebug'

class ItemCounter

  def initialize
    #ride_start an array of starttimes and items
    @ride_start = []
    @ride_end = []
    #rides a hash of start, end, and items
    @rides = []
    #items an array of hashes to save space and time by not repeating, just referencing
    @items = {}
    @ride_number = 1
  end

  def process_ride(ride)
    #assuming that all rides will be processed then print items happens just once.
    #Therefore sorting only happens once
    #compared to all the inserts so its less time consuming
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
    # debugger
    @ride_start.sort!
    @ride_end.sort!
    interval_start = @ride_start.shift
    current_items = [interval_start[1]]
    until @ride_start.empty?
      if @ride_start[0][0] < @ride_end[0][0]
        interval_end = @ride_start.shift
        item_operator = :+
      else
        interval_end = @ride_end.shift
        item_operator = :-
      end
      @rides.push(start_time: interval_start[0], end_time: interval_end[0], items: current_items) unless current_items.empty? || (interval_start[0] == interval_end[0])
      interval_start = interval_end
      current_items = current_items.send(item_operator, [interval_start[1]])
    end
    until @ride_end.empty?
      interval_end = @ride_end.shift
      @rides.push(start_time: interval_start[0], end_time: interval_end[0], items: current_items) unless current_items.empty? || (interval_start[0] == interval_end[0])
      interval_start = interval_end
      current_items -= [interval_start[1]]
    end
  end

  def format_times(time)
    time = time.to_s
    if time.length == 3
      time = "0" + time
    end
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

ride1 = {start_time: 700, end_time: 730, items: ["apple", "apple", "brownie"]}
ride2 = {start_time: 710, end_time: 800, items: ["apple", "carrot", "carrot", "carrot"]}
ride3 = {start_time: 720, end_time: 745, items: ["apple", "brownie", "brownie", "diamond", "diamond", "diamond", "diamond"]}
ride4 = {start_time: 830, end_time: 900, items: ["pear", "peach", "brownie", "diamond"]}
ride5 = {start_time: 830, end_time: 930, items: ["apple"]}
ride6 = {start_time: 820, end_time: 830, items: ["plum","plum","plum"]}

counter = ItemCounter.new
counter.process_ride(ride3)
counter.process_ride(ride2)
counter.process_ride(ride1)
counter.process_ride(ride4)
counter.process_ride(ride5)
counter.process_ride(ride6)

counter.print_items_per_interval

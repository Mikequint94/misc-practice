class ItemCounter

  def initialize
    #ride_start an array of starttimes and items
    @ride_start = []
    @ride_end = []
    #rides a hash of start, end, and items
    @rides = []
  end

  def process_ride(ride)
    #assuming that all rides will be processed then print items happens just once.
    #Therefore sorting only happens once
    #compared to all the inserts so its less time consuming
    @ride_start.push({ride[:start_time] => ride[:items]})
    @ride_end.push({ride[:end_time] => ride[:items]})
  end

  def print_items_per_interval()
    finish_processing
    @rides[1..-1].each do |ride|
      start_time = format_times(ride[:start_time])
      end_time = format_times(ride[:end_time])
      items = format_items(ride[:items])
      p "#{start_time}-#{end_time} -> #{items}"
    end
  end

  def finish_processing
    @ride_start = @ride_start.sort_by {|ride| ride.keys}
    @ride_end = @ride_end.sort_by {|ride| ride.keys}
    current_items = []
    until @ride_start.empty?
      if @ride_start[0].keys[0] < @ride_end[0].keys[0]
        shift_starting = @ride_start.shift
        shift_ending ||= shift_starting
        current_items += shift_ending.values[0]
      else
        shift_starting = @ride_end.shift
        shift_ending ||= shift_starting
        current_items -= shift_ending.values[0]
      end
      @rides.push(start_time: shift_ending.keys[0], end_time: shift_starting.keys[0], items: current_items)
      if @ride_start.length > 0
        if @ride_start[0].keys[0] < @ride_end[0].keys[0]
          shift_ending = @ride_start.shift
          # current_items += shift_starting.values[0]
        else
          shift_ending = @ride_end.shift
        end
      else
        shift_ending = @ride_end.shift
      end
      @rides.push(start_time: shift_starting.keys[0], end_time: shift_ending.keys[0], items: current_items)
    end
    until @ride_end.empty?
      shift_starting = @ride_end.shift
      current_items -= shift_starting.values[0]
      @rides.push(start_time: shift_ending.keys[0], end_time: shift_starting.keys[0], items: current_items)
      shift_ending = @ride_end.shift
      current_items -= shift_ending.values[0]
      @rides.push(start_time: shift_starting.keys[0], end_time: shift_ending.keys[0], items: current_items)
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
    items.each do |item|
      item_hash[item] += 1
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

counter = ItemCounter.new
counter.process_ride(ride3)
counter.process_ride(ride2)
counter.process_ride(ride1)

counter.print_items_per_interval

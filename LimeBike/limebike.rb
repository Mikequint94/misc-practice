class ItemCounter

  def initialize
    #rides a hash of times and items
    @rides = {}
  end

  def process_ride(ride)
    #maybe make a hash that says which rides are active in each intervals, then merge those items later.
    @rides[[ride[:start_time], ride[:end_time]]] = ride[:items]
  end

  def print_items_per_interval()
    @rides.each do |ride|
      start_time = format_times(ride[0][0])
      end_time = format_times(ride[0][1])
      items = format_items(ride[1])
      p "#{start_time}-#{end_time} -> #{items}"
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
counter.process_ride(ride1)
counter.process_ride(ride2)
counter.process_ride(ride3)

counter.print_items_per_interval

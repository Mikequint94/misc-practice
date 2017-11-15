require 'set'
# Write a method that will sum the digits of a positive integer.
# If it is greater than or equal to 10, sum the digits of the resulting number.
# Keep repeating until there is only one digit in the result.
# The result is called a 'digital root'.
# Do not use string conversion within your method.
def digital_root(number)
  return number if number < 10
  digital_root(number/10 + number %10)
end

# Write a function that takes a message and an increment amount.
# Output the same letters shifted by that amount in the alphabet.
# Assume lowercase and no punctuation.
# Preserve spaces.
def caesar_cipher(string, shift=0)
  alphabet = ("a".."z").to_a
  results = []
  string.each_char do |ch|
    if ch == " "
      results << " "
    else
      results << alphabet[(alphabet.index(ch) + shift) % 26]
    end
  end
  results.join
end

# Write a function that takes two strings.
# Return the longest common substring.
def common_substrings(string_one, string_two)
  cache = Array.new(string_one.length){Array.new(string_two.length, 0)}
  longest = ""
  string_one.each_char.with_index do |ch1, idx1|
    string_two.each_char.with_index do |ch2, idx2|
      if ch1 == ch2
        if idx1 > 0 && idx2 > 0
          cache[idx1][idx2] += cache[idx1 -1][idx2 - 1] + 1
        else
          cache[idx1][idx2] = 1
        end
        if cache[idx1][idx2] > longest.length
          length = cache[idx1][idx2]
          longest = string_one[idx1-length+1..idx1]
        end
      end

    end
  end

  longest
end

# Write a function that takes an array of integers and returns their sum.
# Use recursion.
def sum_rec(numbers)
  return numbers[0] if numbers.length == 1
  return numbers[0] + sum_rec(numbers[1..-1])

end

# Write a function that takes n, the length of the sequence.
# Return the first n elements from the fibonnacci sequence as an array.
def fibs(n)
  cache = {1 => [0], 2 => [0,1], 3 => [0,1,1]}
  return cache[n] if n < 4
  (4..n).each do |num|
    cache[num] = cache[num-1] << (cache[num-1][-2] + cache[num-1][-1])
  end
  return cache[n]


end

# Write a function that takes a string.
# Return true if the string is a palindrome, otherwise return false.
# It should take less time and memory than reversing the string.
def is_palindrome?(string)
  while string.length > 1
    if string[0] == string[-1]
      string = string[1...-1]
    else
      return false
    end
  end
  return true
end

# Write a method that takes a string as input.
# It should return true if the input is a valid IPv4 address.
# Valid IPs are anything between '0.0.0.0' and '255.255.255.255'.
def valid_ip?(string)
  split_string = string.split(".")
  return false if split_string.length != 4
  split_string.each do |el|
    return false unless el.to_i.between?(0,255)
  end
  return true

end

# Implement the Folding Cipher.
# It folds the alphabet in half and uses the adjacent letter.
# a -> z, b -> y, c -> x, m -> n, etc...
def folding_cipher(string)
  alphabet = ("a".."z").to_a
  string.each_char.with_index do |ch, idx|
    string[idx] = alphabet[25-alphabet.index(ch)]
  end
  string
end

# Write a method that finds all the unique substrings for a word.
def uniq_subs(string)
  results = []
  (0...string.length).each do |i|
    (i...string.length).each do |j|
      results << string[i..j]
    end
  end
  results.uniq
end

# Given an array of integers find the largest contiguous subsum.
# You can solve this trivially in O(n**2) time by considering all subarrays.
# Try to solve it in O(n) time with O(1) memory.
def lcs(array)
  #[4, -1, 5, 6, -13, 2]
  largest = 0
  current_sum = 0
  array.each do |n|
    largest = [current_sum, largest].max
    if current_sum + n < 0
      current_sum = 0
    else
      current_sum += n
    end
  end
  largest
end

# Write a function that takes a year as a four digit integer.
# Returns an array of the 10 closest subsequent silly years.
# A silly year's first two digits plus the last two digits equal the middle two.
def silly_years(year)
  results = []
  # ab + cd = bc
  until results.length == 10
    year += 1
    ab = year/ 100
    cd = year % 100
    bc = (year % 1000) / 10
    results << year if ab + cd == bc
  end
  results
end

# Take an array of integers, and integer k.
# Return all pairs that sum to k exactly.
# List the pairs in [min, max] order.
# Time complexity: O(n).
# Return a set.
def pair_sum(array, k)
  set = Set.new
  hash = Hash.new
  array.each do |el|
    hash[el] = true
  end
  array.each do |el|
    if hash[k-el] == true
      smallest = [el, k - el].min
      set.add([smallest, k-smallest])
      hash[el] = false
    end
  end

  set
end

# Take a matrix of integers and coordinates.
# The coordinates represent a rectangular region within the matrix
# Find the sum of numbers falling inside the rectangle.
# Time complexity: O(number of rows * number of columns).
def matrix_region_sum(matrix, top_left_coords, bottom_right_coords)
  sum = 0
  (top_left_coords[0]..bottom_right_coords[0]).each do |i|
    (top_left_coords[1]..bottom_right_coords[1]).each do |j|
      sum += matrix[j][i]
    end
  end
  sum


end

# Implement Merge Sort
# Hint: This typically involves a helper function.
def merge_sort(array)
  return array if array.length < 2
  mdpt = array.length / 2
  left_sorted = merge_sort(array.take(mdpt))
  right_sorted = merge_sort(array.drop(mdpt))

  merge(left_sorted, right_sorted)

end

def merge(left, right)
  sorted = []
  until left.empty? || right.empty?
    case left <=> right
    when -1 || 0
      sorted << left.shift
    else
      sorted << right.shift
    end
  end
  sorted.concat(left)
  sorted.concat(right)

  sorted


end

# Implement binary search.
# Return nil if the target isn't found.
def binary_search(array, target)
  return nil unless array.include?(target)
  midpt = array.length / 2
  pivot = array[midpt]

  case pivot <=> target
  when 0
    return midpt
  when 1
    return binary_search(array[0...midpt], target)
  when -1
    return binary_search(array[(midpt + 1) ..-1], target) + midpt + 1
  end
end

# You are given a list of numbers in an array.
# Replace all the numbers with the product of all other numbers.
# Do this in O(n) time without using division.
def productify(array)
  products_before = 1
  results = []
  array.each do |num|
    results << products_before
    products_before *= num
  end
  products_after = 1
  array.each_with_index do |num, idx|
    results[array.length - idx - 1] *= products_after
    products_after *= array[array.length - idx - 1]
  end
  results
end

# Write a function that takes an array and returns all of its subsets.
def subsets(array)
  return [[]] if array.empty?
  prev_subs = subsets(array.drop(1))
  current_subs = []
  prev_subs.each do |sub|
    current_subs << sub + [array[0]]
  end
  prev_subs + current_subs
end

# Return the indices of the start/end of the longest palindrome in the string.
# You could reverse the string and compare it to the original, but that is slow.
# Instead, you should be able to solve the problem with O(1) memory.
def longest_palindrome(string)
    search = string.length
    while search > 0
      start_idx = 0
      while start_idx + search <= string.length
        return [start_idx, start_idx+ search - 1] if is_palindrome?(string[start_idx,search])
        start_idx += 1
      end
      search -= 1
    end
end

# Given two arrays, find the intersection of both sets.
# It should be trivial to write an O(n**2) solution.
# Use sorting to solve in O(nlog(n)).
# Next, improve this to O(n) time (maybe use a non-array datastructure).
def fast_intersection(array_one, array_two)
  set1 = Set.new
  set2 = Set.new
  array_one.each do |n|
    set1.add(n)
  end
  array_two.each do |n|
    set2.add(n)
  end
  results = []
  set1.each do |n|
    results << n if set2.include?(n)
  end
  results
end

# Write a function that takes two arrays of integers
# Returns an array with all the subsets commmon to both arrays.
# Don't generate all subsets of both arrays, which would be exponential time.
# Instead, directly generate the subsets of both.
def common_subsets(array_one, array_two)
  intersection = fast_intersection(array_one, array_two)
  return subsets(intersection)
end

# You are given an array and index.
# Find if it's possible to reach 0 by starting at the index.
# You can only move left or right by the distance found at array[index].
def can_win?(array, index, visited = Array.new(array.length){false})
    return true if index == 0
    visited[index] = true
    if (index + array[index] >=0) && visited[index+array[index]] == false
      return true if can_win?(array, index + array[index], visited)
    end
    if (index - array[index] >=0) && visited[index-array[index]] == false
      return true if can_win?(array, index - array[index], visited)
    end
    return false

end

# Assume an array of length n, containing the numbers 1..n in jumbled order.
# "Sort" this array in O(n) time.
# Hint: You should be able to do this without looking at the input.
def sort1(array)
  (1..array.length).to_a
end

# Assume an array of length n with numbers in the range 1..N (N >= n).
# Sort this array in O(n + N) time.
# You may use O(N) memory.
def sort2(array, max_value)
  set = Set.new
  array.each do |n|
    set.add(n)
  end
  max_n = 0
  array.each_index do |idx|
    until set.include?(max_n)
      max_n +=1
    end
    array[idx] = max_n
  end
  array


end

# Say I give you an array of n strings, each of length k.
# Merge sort can sort this in O(knlog(n)).
# Sort the strings in O(kn).
# Hint: Do not compare any two strings.
# All strings contain only lowercase letters without whitespace or punctuation.
def sort3(array, length)
  # k = 0
  # (a..z).each do |ch|
  #   array.each do |word|
  #
end

# Given an array, write a function that will return a random index of the array.
# The chance of returning a given index will vary with the value of the element.
# Probability of i should be the ith element divided by the sum of all elements.
def weighted_random_index(array)


end

# Given an array, move all zeros to the end.
# The order of non-zero elements does not matter.
# Try to accomplish this in O(n) time and O(1) space.
def move_zeros(array)
  num_zeroes = 0
  array.each_with_index do |n, idx|
    if n == 0 && idx < array.length - num_zeroes
      while array[-1 -num_zeroes] == 0
        num_zeroes +=1
      end
      array[idx], array[-1 - num_zeroes] = array[-1 - num_zeroes], array[idx]
      num_zeroes +=1
    end
  end
  array
end

# Implement the 'look and say' function.
#'Look and say' takes an input array and outputs an array.
# The output describes the count of the elements in the input.

def look_and_say(array)
  current_num = array.shift
  current_count = 1
  results = []
  array.each do |n|
    if current_num == n
      current_count +=1
    else
      results << [current_count, current_num]
      current_count = 1
      current_num = n
    end
  end
  results << [current_count, current_num]

end

# I give you a scrambled list of n unique integers between 0 and n.
# Tell me what number is missing?
# How could you solve the problem in O(n), and also O(1) space?
def sum_upon_sums(array)
  total_sum = array.length * (array.length + 1) / 2
  missing_num = total_sum - array.reduce(:+)

end

# Implement a stack with a max method that returns the maximum value.
# It should run in O(1) time.
class MaxStack

  def initialize
    @stack = []
  end

  def push(num)
    if @stack.empty?
      @current_max = num
    else
      @current_max = num if num > max
    end
    @stack.push([num, @current_max])
  end

  def pop
    @stack.pop
  end

  def max
    @stack[-1][1]
  end

end

# Implement a queue using stacks.
# That is, write enqueue and dequeue using only push and pop operations.
# In terms of performance, enqueue should be O(1).
# Dequeue may be worst-case O(n).
# In terms of ammortized time, dequeue should be O(1).
# Prove that your solution accomplishes this.
class StackQueue

end

# Take an array, and a window size w.
# Find the maximum max - min within a range of w elements.
# First solve MaxStack.
# Write a MinMaxStack to track both the min and the max in a stack.
# Next, solve StackQueue.
# Write a MinMaxStackQueue which tracks both the min and max.
# Last, use MinMaxStackQueue to solve the problem.
class MinMaxStack

end

class MinMaxStackQueue

end

def windowed_max_range(array, w)

end

# Suppose a hash representing a directory.
# All keys are strings with names for either folders or files.
# Keys that are folders point to nested hashes.
# Keys that are files point to "true".
# Write a function that takes such a hash.
# Return an array of strings with the path to each file in the hash.
def file_list(hash)

end

# Assume an array of non-negative integers.
# A second array is made by shuffling the first and deleting a random element.
# Given these two arrays, find which element is missing in the second array.
# Do this in linear time with constant memory use.
def find_missing_number(array_one, array_two)

end

# Create a function that takes three strings.
# Return whether the third is an interleaving of the first two.
# Interleaving means it contains the same characters and preserves their order.
def is_shuffle?(string_one, string_two, string_three)
  string_one = string_one.split("")
  string_two = string_two.split("")
  string_three.each_char do |ch|
    if string_one[0] == ch
      string_one = string_one.drop(1)
    elsif string_two[0] == ch
      string_two = string_two.drop(1)
    else
      return false
    end
  end
  true
      
end

# Write a function that takes an integer and returns it in binary form.
def binary(integer)
  
end

# Write a recursive function that takes a number and returns its factorial.
def recursive_factorial(number)
  return 1 if number < 2
  return number * recursive_factorial(number - 1)
end

# Write an iterative function that takes a number and returns its factorial.
def iterative_factorial(number)
  result = 1
  return result if number < 2
  while number > 1
    result *= number
    number -= 1
  end
  return result
end

# Write a method that takes an array and returns all its permutations.
def permutations(array)

end

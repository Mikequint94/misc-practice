# Review Rails!
start: rails new my_project_name --database=postgresql
routes:  resources :cats
rails g model User
rails g controller User

# Ruby Blocks
anonymous functions passed into methods.  anything with a do/end statement or between {|arg| brackets + arg}
Can make a method with yield inside, and call it passing in a block.
`def print_once
  yield ##can also add arguments to yield
end

print_once { puts "Block is being run" }`
You can also do
`def print_once(&block)
  block.call ##same as yield
end

print_once { puts "Block is being run" }`
# Procs and Lambdas
A lambda is a type of proc.  Use = -> {to define}.  then need to call later.
`say_something = -> { puts "This is a lambda" }
say_something.call `# or .(), or .[]
Can also take an arg like `say_something = -> (a) {puts a}
say_something.call(a)`
It will raise exception if you pass the wrong number of args.

Procs don't care.  Make with `t = Proc.new {|args| stuff}. t.call`

Also lambdas return normally like a method.  Procs return from current context.
SO. can't have procs in outer scope or else will make error cause can only return inside something.

# Closures
Procs capture current scope (local variables, methods) when you make them from the context they are made in.  Lock that in with them wherever they go.

In summation, Procs are blocks of code that are bound to local variables
Lambdas are like anonymous functions

# Ways to call a method
Normal way:  `jack.say`
Send the method name:  `jack.send(:say), jack.public_send(:say)`
Or, grab method and call as proc: `jack.method(:say).call`

# N+1 Queries and how to optimize
N+1 queries slow databases as scaling up.  A request that does a request for each object + 1.  
`builds = Build.order(:finished_at).limit(10)

builds.each do |build|
  puts "#{build.branch.name} build number #{build.number}"
end`  is 11 queries.
To fix, do includes at first, only counts as 1 more query. and it prefetches all the data together.
`builds = Build.order(:finished_at).includes(:branches).limit(10)

builds.each do |build|
  puts "#{build.branch.name} build number #{build.number}"
end`

# Public / Private / Protected Methods
## Public:  
can call whenever. Default.

## Private:
method can only be called within a class where it was defined. Like from another method within the class.

## Protected:
 same.  Only used internally within object.
 can do self.method_name and it will work.  or call that method on other instances of the same class.

# Object Oriented Programming
 Programming Paradigm based on the concept of objects. class based, objects are instances of classes.  Java, Python, Ruby, etc.

# What is a load balancer?
Distributing incoming network traffic across multiple backend servers.
Efficiently reroutes traffic only to servers that are online and aren't overworked.
Could distribute round robin, or by least connections, or by hashing IP address.

# How do shards work?
Sharding is database partitioning to separate large databases into smaller faster shards.
Data is not repeated across shards and spread across different servers.
Split maybe based on geographic data or something concrete is easier.

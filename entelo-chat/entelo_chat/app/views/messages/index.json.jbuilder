@messages.each do |message|
  json.set! message.id do
    json.body message.body
    json.user message.user
  end
end

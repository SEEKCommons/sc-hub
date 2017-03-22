json.key_format! camelize: :lower
json.extract! podcast, *%i(id position title audio_url artwork_url photo_credit)
json.credits podcast.credits_list.to_sentence
json.card_id podcast.card.id
json.icon_slug "toc-podcast"
json.case_element do
  json.partial! podcast.case_element
end
json.partial! 'trackable/statistics', locals: {trackable: podcast}

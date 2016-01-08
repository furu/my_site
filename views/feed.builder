xml.instruct! :xml, version: '1.0'
xml.feed(xmlns: 'http://www.w3.org/2005/Atom') do
  xml.id url('/log')
  xml.title "log - #{settings.site_title}"
  xml.author do
    xml.name 'furu'
    xml.email 'ba09219@gmail.com'
  end
  xml.updated Date.parse(settings.articles.first.date.to_s).rfc3339
  xml.link type: 'application/atom+xml', rel: 'self', href: url('/log/feed.atom')
  xml.link rel: 'hub', href: 'http://log-tfrkd.superfeedr.com/'

  settings.articles.take(5).each do |article|
    xml.entry do
      xml.id url("/log/#{article.slug}")
      xml.title article.title
      xml.link type: 'text/html', rel: 'alternate', href: url("log/#{article.slug}")
      xml.updated Date.parse(article.date.to_s).rfc3339
      xml.content markdown(article.content), type: 'html'
    end
  end
end

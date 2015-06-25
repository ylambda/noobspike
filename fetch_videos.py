import praw
import requests
from noobspike.models import User, Video
from urlparse import urlsplit, parse_qs
from datetime import datetime


user_agent = "Tagpro gfycat scrapper"
r = praw.Reddit(user_agent=user_agent)

search_url = "http://www.reddit.com/r/%s/search/"

def search(query, subreddit=None, sort=None, syntax=None,
           period=None, after=None, *args, **kwargs):
    """Return a generator for submissions that match the search query.
    :param query: The query string to search for. If query is a URL only
        submissions which link to that URL will be returned.
    :param subreddit: Limit search results to the subreddit if provided.
    :param sort: The sort order of the results.
    :param syntax: The syntax of the search query.
    :param period: The time period of the results.
    The additional parameters are passed directly into
    :meth:`.get_content`. Note: the `url` and `param` parameters cannot be
    altered.
    See https://www.reddit.com/wiki/search for more information on how to
    build a search query.
    """
    params = {'q': query}
    if sort:
        params['sort'] = sort
    if syntax:
        params['syntax'] = syntax
    if period:
        params['t'] = period
    if after:
        params['after'] = after
    if subreddit:
        params['restrict_sr'] = 'on'
        url = search_url % subreddit
    else:
        url = search_url % 'all'

    depth = 2
    while depth > 0:
        depth -= 1
        for item in r.get_content(url, params=params, *args, **kwargs):
            yield item

def store_result(result):
    gfyid = urlsplit(result.url)[2][1:]
    gfycat_query = "http://gfycat.com/cajax/get/%s" % gfyid

    thumbnail = "//thumbs.gfycat.com/%s-poster.jpg"
    small_thumbnail = "//thumbs.gfycat.com/%s-thumb100.jpg"

    response = requests.get(gfycat_query)
    gfycat_data = response.json()

    model = {
        'title': result.title,
        'created': result.created,
        'domain': result.domain,
        'author': result.author.name,
        'upvotes': result.ups,
        'downvotes': result.downs,
        'thing_id': result.id,
        'url': result.url,
        'source_webm': gfycat_data.get('gfyItem').get('webmUrl'),
        'source_mp4': gfycat_data.get('gfyItem').get('mp4Url'),
        'thumbnail': thumbnail % gfyid,
        'small_thumbnail': small_thumbnail % gfyid,
        'video_id': gfyid,
    }

    print model

after = None
depth = 1
while depth > 0:
    depth -= 1
    results = search("site:gfycat.com", subreddit="tagpro",
                                        sort="top",
                                        after=after)
    for result in results:
        after = result.name
        store_result(result)

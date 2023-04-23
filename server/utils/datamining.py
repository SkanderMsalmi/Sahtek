#!/usr/bin/env python
# coding: utf-8

# In[2]:


import requests
from bs4 import BeautifulSoup
import pandas as pd
from time import sleep

def profanity_filter(text):
    profanity_list = ['fuck','unfuck' , 'shit', 'asshole', 'bitch', 'damn', 'dick']
    
    words = text.split()
    
    for i, word in enumerate(words):
        if word.lower() in profanity_list:
            words[i] = words[i][0]+'*' * (len(word)-2)+words[i][len(word)-1]
    
    filtered_text = ' '.join(words)
    
    return filtered_text
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:94.0) Gecko/20100101 Firefox/94.0',
    'Accept-Language': 'en-US, en;q=0.5'
}

search_query = 'mental health'.replace(' ', '+')
base_url = 'https://www.amazon.com/s?k={0}'.format(search_query)

items = []
response = requests.get(base_url + '&page={0}'.format("1"), headers=headers)
soup = BeautifulSoup(response.content, 'html.parser')
    
results = soup.find_all('div', {'class': 's-result-item', 'data-component-type': 's-search-result'})
for result in results:
    product_name = result.h2.text
    try:
        rating = result.find('i', {'class': 'a-icon'}).text
        rating_count = result.find('span', {'class': 'a-size-base s-underline-text'}).text.replace("(", "", 1).replace(")","",-1)
        image = result.find('img',{'class': 's-image'})['src']
    except AttributeError:
        continue

    try:
        price1 = result.find('span', {'class': 'a-price-whole'}).text
        price2 = result.find('span', {'class': 'a-price-fraction'}).text
        price = price1+price2
        product_url = 'https://amazon.com' + result.h2.a['href']
        # print(rating_count, product_url)
        items.append([profanity_filter(product_name), rating, rating_count, price, image, product_url])
    except AttributeError:
        continue
    
df = pd.DataFrame(items, columns=['product', 'rating', 'ratingCount', 'price', 'image', 'productUrl'])
df.to_csv('amazonProds.csv'.format(search_query), index=False)








# In[ ]:





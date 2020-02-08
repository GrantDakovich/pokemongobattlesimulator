# WEBSITE NAME: https://dominikzen.com/

import scrapy
from scrapy import Selector
from selenium import webdriver
import time
import pandas as pd
import re
import pymongo

def cleanText(regexpr, text):
    new_text = text
    new_text = re.sub(regexpr,'',new_text)
    return new_text
    
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["pokemon_db"]
mycol = mydb["pokemon_collection_feb"]


driver = webdriver.Chrome('./chromedriver')
URL = "https://dominikzen.com/pokemon"
driver.get(URL)

time.sleep(4)

print("done")
sel = Selector(text=driver.page_source)

poke_list = []



#/html/body/main/div/table/tbody/tr[1]/td/div/div[1]/div/div
i = 2
while True:
    poke_obj = {}
    
    
    poke_name_obj = sel.xpath('//html/body/main/div/table/tbody/tr[' + str(i) + ']/td[1]/div/a').extract()
    if (len(poke_name_obj) == 0):
        break
    poke_name = poke_name_obj[0]
    poke_name = cleanText('<a href="/pokemon/[^>]*>', poke_name)
    poke_name = cleanText('</a>', poke_name).strip().lower()

    print("##############")    
    print(poke_name)
    print("-----")
    
    
    types = sel.xpath('//html/body/main/div/table/tbody/tr[' + str(i) + ']/td[1]/div/div').extract()[0]
    types = cleanText('</div>',types)
    types = cleanText('<div class="type-wrapper">',types)
    types = cleanText('<div class="type-[^"]*">',types)
    types_arr = types.split()
    #print(types)
    print(types_arr)
    
    
    atk_ = sel.xpath('//html/body/main/div/table/tbody/tr[2]/td[2]').extract()[0]
    atk_ = cleanText('<td>', atk_)
    atk_ = cleanText('</td>', atk_)
    def_ = sel.xpath('//html/body/main/div/table/tbody/tr[2]/td[3]').extract()[0]
    def_ = cleanText('<td>', def_)
    def_ = cleanText('</td>', def_)
    sta_ = sel.xpath('//html/body/main/div/table/tbody/tr[2]/td[4]').extract()[0]
    sta_ = cleanText('<td>', sta_)
    sta_ = cleanText('</td>', sta_)
    prod_ = sel.xpath('//html/body/main/div/table/tbody/tr[2]/td[5]').extract()[0]
    prod_ = cleanText('<td>', prod_)
    prod_ = cleanText('</td>', prod_)
    cp_ = sel.xpath('//html/body/main/div/table/tbody/tr[2]/td[6]').extract()[0]
    cp_ = cleanText('<td>', cp_)
    cp_ = cleanText('</td>', cp_)
    
    poke_button = driver.find_element_by_xpath('//html/body/main/div/table/tbody/tr[' + str(i) + ']/td[1]/div/a')
    poke_button.click()
    
    time.sleep(4)
    
    pve_button = driver.find_element_by_xpath('//html/body/main/div[2]/table/tbody/tr[1]/td/a/span[2]')
    pve_button.click()
    
    time.sleep(4)
    
    print(atk_)
    print(def_)
    print(sta_)
    print(prod_)
    print(cp_)
    
    
    move_table = driver.find_elements_by_xpath('//html/body/main/div[2]/table/tbody/tr')
    m = 3
    
    quick_moves = []
    charge_moves = []
    
    while m <= len(move_table):
        
        # Attack details
        attack_name = driver.find_element_by_xpath('//html/body/main/div[2]/table/tbody/tr[' + str(m) + ']/td[1]/div/a/div').text
        attack_type = driver.find_element_by_xpath('//html/body/main/div[2]/table/tbody/tr[' + str(m) + ']/td[1]/div/div/div').text
        attack_power = driver.find_element_by_xpath('//html/body/main/div[2]/table/tbody/tr[' + str(m) + ']/td[2]').text
        attack_energy = driver.find_element_by_xpath('//html/body/main/div[2]/table/tbody/tr[' + str(m) + ']/td[3]').text
        attack_time = driver.find_element_by_xpath('//html/body/main/div[2]/table/tbody/tr[' + str(m) + ']/td[4]').text
        attack_dps = driver.find_element_by_xpath('//html/body/main/div[2]/table/tbody/tr[' + str(m) + ']/td[5]').text
        attack_eps = driver.find_element_by_xpath('//html/body/main/div[2]/table/tbody/tr[' + str(m) + ']/td[6]').text

        #######
        print(attack_name)
        print(attack_type)
        print(attack_power)
        print(attack_energy)
        print(attack_time)
        print(attack_dps)
        print(attack_eps)
        
        move_obj = {}
        move_obj["name"] = attack_name
        move_obj["type"] = attack_type
        move_obj["power"] = int(attack_power)
        move_obj["energy"] = int(attack_energy)
        move_obj["time"] = int(attack_time)
        move_obj["dps"] = float(attack_dps)
        move_obj["eps"] = float(attack_eps)
        move_obj["type_bonus"] = 1
        
        if attack_type in types_arr:
            move_obj["type_bonus"] = 1.2
        
        if ("-" in attack_energy):
            charge_moves.append(move_obj)
        else:
            quick_moves.append(move_obj)
        
        m = m + 1
      
    
    
    
    # Resistances
    resistances_list = driver.find_elements_by_xpath('//html/body/main/div[3]/div[1]/table[1]/tbody/tr')
    resistance_table = {}
    r = 2

    while r <= len(resistances_list):
        type_res = driver.find_element_by_xpath('//html/body/main/div[3]/div[1]/table[1]/tbody/tr[' + str(r) + ']/td[1]').text
        percent_res = driver.find_element_by_xpath('//html/body/main/div[3]/div[1]/table[1]/tbody/tr[' + str(r) + ']/td[2]').text
        resistance_table[type_res] = percent_res
        r = r + 1
        
    # Weaknesses
    weaknesses_list = driver.find_elements_by_xpath('//html/body/main/div[3]/div[1]/table[2]/tbody/tr')
    weakness_table = {}
    w = 2
    while w <= len(weaknesses_list):
        type_weak = driver.find_element_by_xpath('//html/body/main/div[3]/div[1]/table[2]/tbody/tr[' + str(w) + ']/td[1]').text
        percent_weak = driver.find_element_by_xpath('//html/body/main/div[3]/div[1]/table[2]/tbody/tr[' + str(w) + ']/td[2]').text
        weakness_table[type_weak] = percent_weak
        w = w + 1
    
    print(resistance_table)
    print(weakness_table)
    
    
    poke_obj["name"] = poke_name
    poke_obj["types"] = types_arr
    poke_obj["attack"] = int(atk_)
    poke_obj["defense"] = int(def_)
    poke_obj["stamina"] = int(sta_)
    poke_obj["prod"] = prod_
    poke_obj["max_cp"] = int(cp_)
    poke_obj["quick_moves"] = quick_moves
    poke_obj["charge_moves"] = charge_moves
    poke_obj["resistances"] = resistance_table
    poke_obj["weaknesses"] = weakness_table
       
    poke_list.append(poke_obj)
    
    mycol.insert_one(poke_obj)
    
    # Go back to pokemon list
    back_button = driver.find_element_by_xpath('//html/body/main/a')
    back_button.click()
    time.sleep(4)
    
    print("##############")    
    
    i = i + 1
    

# Go to next page
#next_button = driver.find_element_by_xpath('/html/body/main/ul/li[10]/a')

#next_button.click()


driver.quit()
















from flask import Flask,jsonify,request,redirect
import requests
from bson import json_util
import pymongo

app=Flask(__name__)
client=pymongo.MongoClient("mongodb+srv://ratnesh:ratnesh@cluster0.3ka0uom.mongodb.net/")
db=client['Rehabify']
# collections=db.list_collection_names()
# col1=db['rehabify']
ngo=db['NGO']
nmk=db['NMK']
col_all=db['All']
user=db['User_NMD']


#end point for user details
@app.route('/owner_details/<string:section>', methods=["GET"])
def owner_details_by_section(section):
    if section.upper() == "NGO":
        data_ngo = list(col_all.find({"Section": section}))
        all_data = []
        for i in data_ngo:
            single = {
                "Name": i['Name'],
                "Age": i['Age'],
                "Gender": i["Gender"],
                "Section": section
            }
            all_data.append(single)
        return {"data": all_data}
    elif section.upper() == "NMK":
        data_nmk = list(col_all.find({"Section": section}))
        all_data = []
        for i in data_nmk:
            single = {
                "Name": i['Name'],
                "Age": i['Age'],
                "Gender": i["Gender"],
                "Section": section
            }
            all_data.append(single)
        return {"data": all_data}
    else:
        return "Section not found"

# Endpoint for fetching all owner details
@app.route('/owner_details', methods=["GET"])
def owner_details_all():
    data_all = list(col_all.find())
    all_data = []
    for i in data_all:
        single = {
            "Name": i['Name'],
            "Age": i['Age'],
            "Gender": i["Gender"],
            "Section": i["Section"]
        }
        all_data.append(single)
    return {"data": all_data}


if __name__ == "__main__":
    app.run(debug=True)



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
@app.route('/user_details/<string:section>', methods=["GET"])
def user_details_by_section(section):
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

# Endpoint for fetching all user details
@app.route('/user_details', methods=["GET"])
def user_details_all():
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




# @app.route('/user_details/<str:Section>',methods=["GET"])
# def user_details():
    
#         if section=="NGO":
#             data_ngo=list(col_all.find({"Section":section}))
#             all_data=[]
#             for i in data_ngo:
#                 single={
#                         "Name":i['Name'] ,
#                         "Age":i['Age'],
#                         "Gender":i["Gender"],
#                         "Section":section
#                         # "State": i["State"],
#                         # "District":i["District"]
#                         # "Owner":i['Owner']
#                     }    
#                 all_data.append(single)
#             return all_data
        
#         elif section == "NMK":
#             data_nmk=list(col_all.find({"Section":section}))
#             all_data=[]
#             for i in data_nmk:
#                 single={

#                         "Name":i['Name'] ,
#                         "Age":i['Age'],
#                         "Gender":i["Gender"],
#                         "Section":section

#                         # "Name":i['Name'] ,
#                         # "Age":i['age'],
#                         # "State": i["State"],
#                         # "District":i["District"],
#                         # "Owner":i['Owner']
#                     }    
#                 all_data.append(single)
#             return all_data
        
#         else:
#             section="User"
#             state=body['State']
#             district=body['District']
#             if state==None and district==None:
#                 data_user=list(col_all.find({"Section":section}))
#             elif state!=None:
#                 if district==None:
#                     data_user=list(col_all.find({"Section":section,"State":state}))
#                 else:
#                     data_user=list(col_all.find({"Section":section,"State":state,"District":district}))
#             else:
#                 data_user=list(col_all.find({"Section":section,"District":district}))

#             all_data=[]
#             for i in data_user:
#                 single={
#                         "Name":i['Name'] ,
#                         "Age": i["Age"],
#                         "Gender": i["Gender"],
#                         "Section":section
#                         # "State": i["State"],
#                         # "District": i["District"],
#                         # "Guardian Name": i["Guardian Name"],
#                         # "Addiction Type": i["Addiction Type"],
#                         # "Addiction Duration": i["Addiction Duration"],
#                         # "Duration of Treatment": i["Duration of Treatment"],
#                         # "Is Treatment Completed": i["Is Treatment Completed"],
#                         # "Under Treatment": i["Under Treatment"],
#                         # "Employment Status": i["Employment Status"],
#                         # "Nasha Mukti Centre Name": i["Nasha Mukti Centre Name"],
#                         # "Nasha Mukti Centre Address":i["Nasha Mukti Centre Address"],
#                         # "Nasha Mukti Centre Code": i["Nasha Mukti Centre Code"],
#                         # "Joining Date": i["Joining Date"],
#                         # "Counselling Count": i["Counselling Count"],
#                         # "Counsellor Name": i["Counsellor Name"]
#                     }
#                 all_data.append(single)
#             return all_data
#     else:
#         return "Method not allowed"
    
    

# if __name__=="__main__":
#     app.run(debug=True)
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


@app.route("/",methods=["GET"])
def home():
    return "Welcome to rehabify"

@app.route('/user_details',methods=["POST"])
def user_details():
    if request.method=="POST":
        body=request.get_json()
        section=body['Section']

        if section=="NGO":
            data_ngo=list(col_all.find({"Section":section}))
            all_data=[]
            for i in data_ngo:
                single={
                        "Name":i['Name'] ,
                        "Age":i['Age'],
                        "Gender":i["Gender"],
                        "Section":section
                        # "State": i["State"],
                        # "District":i["District"]
                        # "Owner":i['Owner']
                    }    
                all_data.append(single)
            return all_data
        
        elif section == "NMK":
            data_nmk=list(col_all.find({"Section":section}))
            all_data=[]
            for i in data_nmk:
                single={

                        "Name":i['Name'] ,
                        "Age":i['Age'],
                        "Gender":i["Gender"],
                        "Section":section

                        # "Name":i['Name'] ,
                        # "Age":i['age'],
                        # "State": i["State"],
                        # "District":i["District"],
                        # "Owner":i['Owner']
                    }    
                all_data.append(single)
            return all_data
        
        else:
            section="User"
            state=body['State']
            district=body['District']
            if state==None and district==None:
                data_user=list(col_all.find({"Section":section}))
            elif state!=None:
                if district==None:
                    data_user=list(col_all.find({"Section":section,"State":state}))
                else:
                    data_user=list(col_all.find({"Section":section,"State":state,"District":district}))
            else:
                data_user=list(col_all.find({"Section":section,"District":district}))

            all_data=[]
            for i in data_user:
                single={
                        "Name":i['Name'] ,
                        "Age": i["Age"],
                        "Gender": i["Gender"],
                        "Section":section
                        # "State": i["State"],
                        # "District": i["District"],
                        # "Guardian Name": i["Guardian Name"],
                        # "Addiction Type": i["Addiction Type"],
                        # "Addiction Duration": i["Addiction Duration"],
                        # "Duration of Treatment": i["Duration of Treatment"],
                        # "Is Treatment Completed": i["Is Treatment Completed"],
                        # "Under Treatment": i["Under Treatment"],
                        # "Employment Status": i["Employment Status"],
                        # "Nasha Mukti Centre Name": i["Nasha Mukti Centre Name"],
                        # "Nasha Mukti Centre Address":i["Nasha Mukti Centre Address"],
                        # "Nasha Mukti Centre Code": i["Nasha Mukti Centre Code"],
                        # "Joining Date": i["Joining Date"],
                        # "Counselling Count": i["Counselling Count"],
                        # "Counsellor Name": i["Counsellor Name"]
                    }
                all_data.append(single)
            return all_data
    else:
        return "Method not allowed"
    

@app.route("/submit",methods=['POST'])
def submit_form():
    section=request.form.get("Section")
    if section=="User":
        form_data={}
        for field_name in request.form:
            form_data[field_name] = request.form[field_name]
        user.insert_one(form_data)
        col_all.insert_one(form_data)
        print("data inserted")
    else:
        name=request.form.get("name")
        age=request.form.get("age")
        gender=request.form.get("gender")
        section=request.form.get("section")
        form_data = {
            "Name": name,
            "Age": age,
            "Gender": gender,
            "Section":section
        }
        if section=="NGO":
            ngo.insert_one(form_data)
        else:
            nmk.insert_one(form_data)
        col_all.insert_one(form_data)
        print("data inserted")
    



if __name__=="__main__":
    app.run(debug=True)
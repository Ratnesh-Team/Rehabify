from flask import Flask, request, jsonify
import pymongo

app = Flask(__name__)

# MongoDB connection
client = pymongo.MongoClient("mongodb+srv://ratnesh:ratnesh@cluster0.3ka0uom.mongodb.net/")
db = client['Rehabify']
col_all = db['All'] #need to be replaced later



@app.route('/user_details/<str:state>/<str:district>', methods=['GET'])
def get_user_details():
    section = "User"
    state = request.args.get('state')
    district = request.args.get('district')

    query = {"Section": section}

    if state:
        query["State"] = state
        if district:
            query["District"] = district

    data_user = list(col_all.find(query))

    all_data = []
    for i in data_user:
        single = {
            "Name": i['Name'],
            "Age": i['Age'],
            "Gender": i["Gender"],
            "Section": section,
            # Add more fields as needed
        }
        all_data.append(single)

    return jsonify({"data": all_data})

if __name__ == '__main__':
    app.run(debug=True)

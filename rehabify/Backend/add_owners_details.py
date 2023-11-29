from flask import Flask, jsonify, request
import pymongo

app = Flask(__name__)
client = pymongo.MongoClient("mongodb+srv://ratnesh:ratnesh@cluster0.3ka0uom.mongodb.net/")
db = client['Rehabify']
col_all = db['All']

# Endpoint for inserting owner details
@app.route('/owner_details', methods=["POST"])
def insert_owner_details():
    if request.method == "POST":
        data = request.json  # Assuming JSON data is sent in the request body

        # Validate that required fields are present in the data
        required_fields = ["Name", "Age", "Gender", "Section"]
        if not all(field in data for field in required_fields):
            return {"error": "Missing required fields"}

        # Insert the data into the database
        col_all.insert_one(data)

        return {"message": "Data inserted successfully"}

    else:
        return "Method not allowed"


if __name__ == "__main__":
    app.run(debug=True)

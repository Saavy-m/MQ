from flask import Flask, request, jsonify
import pandas as pd
from flask_cors import CORS
from Student_Scolarship import predict_scholarship

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

@app.route('/hello', methods=['GET', 'POST'])
def hello():
    return jsonify({"message": "Hello world"})

@app.route('/weights', methods=['POST'])
def run_scholarship():
    try:
        # Debug: Log the incoming request body
        print("Received request data:", request.json)
        
        # Get weightings from the request body
        weightings = request.json.get('weightings', {})
        marks = request.json.get('marks', {})
        
        # Debug: Log the received weightings
        student_data = [
            marks['Household Income'],
            marks['Maths'],
            marks['Science'],
            marks['Geography'],
            marks['History'],
            marks['English'],
            marks['Sports']
        ]

        # Total score 
        total_score = (marks['Maths'] * weightings['Maths'] +
                       marks['Science'] * weightings['Science'] +
                       marks['Science'] * weightings['English'] +
                       marks['Geography'] * weightings['Geography'] +
                       marks['History'] * weightings['History'] +
                       marks['Sports'] * weightings['Sports'])

        # Debug: Log the calculated total score


        # Call the prediction function
        scholarship_risk = predict_scholarship(student_data)
        total_score = float(total_score)

        print(f"Total Score calculated for the student: {total_score} and risk is {scholarship_risk}")
        # Respond with the prediction result
        return jsonify({
            "status": "success",
            "message": "Scholarship prediction calculated",
            "scholarshipRisk": int(scholarship_risk),
            "totalScore": total_score
        })

    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({"status": "error", "message": str(e) }), 500


if __name__ == "__main__":
    app.run(debug=True, port=8000)




# shubh's logic here


# # Load the data from the Excel file
#         file_path = './student scholarship.xlsx'
#         import os
#         if os.path.exists(file_path):
#             print(f"Excel file found at: {file_path}")
#         else:
#             raise FileNotFoundError(f"Excel file not found at {file_path}")
        
#         df = pd.read_excel(file_path)
    
#         # Normalize household income
#         df['Normalized Income'] = (df['Household Income'].max() - df['Household Income']) / (df['Household Income'].max() - df['Household Income'].min())
        
#         # Debug: Check the normalization
#         print("Normalized Income column after processing:\n", df['Normalized Income'].head())
        
#         # Calculate total score based on weightings
#         df['Total Score'] = (df['Maths'] * weightings['Maths'] +
#                              df['Science'] * weightings['Science'] +
#                              df['English'] * weightings['English'] +
#                              df['Normalized Income'] * weightings['Household Income'] +
#                              df['Sports'] * weightings['Sports'])

#         # Debug: Log the calculated total scores
#         print("Total Scores calculated:\n", df[['Name', 'Total Score']].head())

#         # Save the results to an Excel file
#         df.to_excel('scholarship_results.xlsx', index=False)
        
#         # Debug: Confirm saving of the file
#         print("Scholarship results saved to 'scholarship_results.xlsx'.")
        
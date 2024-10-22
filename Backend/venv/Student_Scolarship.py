#!/usr/bin/env python
# coding: utf-8

# ## SCHOLARSHIP RISK
# This workbook demonstrates usage of ML to assess whether depending on certain student attributes will it be beneficial
# for both the granting institute & student to give and avail a scholarship of a specified amount.

import pandas as pd
import numpy as np
import os

os.listdir()

student_df=pd.read_excel('student_data.xlsx')
student_df.head()


# #### CHECK DATA DISTRIBUTION OF DIFFERENT "SCHOLARSHIP GIVEN CATEGORIES"

student_df.columns


student_df['Can Scholarship be Given'].value_counts()

import matplotlib.pyplot as plt
is_scolarship_given=dict(student_df['Can Scholarship be Given'].value_counts())

type(is_scolarship_given)


x=list(is_scolarship_given.keys())
y=list(is_scolarship_given.values())
plt.bar(x,y)
plt.xlabel('Scolarship Grant Risks')
plt.ylabel('Number of students')
plt.title('Distribution of Scolarship Grants Across Students')


from sklearn.model_selection import train_test_split


from sklearn.preprocessing import LabelEncoder

le=LabelEncoder()
student_df['Risk']=le.fit_transform(student_df['Can Scholarship be Given'])

student_df.head(10)

student_df.rename(columns={'Math Score':'Math','Science Score':'Science','History Score':'History','English Score':'English','Sports Score':'Sports'},inplace=True)
student_df.columns


# ### PREPARE DATA
# Data is prepared basis household income and scores in various subjects.`

def PrepareData(df):
    x=[]
    y=[]
    for i in range(len(df)):
        l=[df['Household Income'][i],df.Math[i],df.Science[i],df['Geography Score'][i],df.History[i],df.English[i],df.Sports[i]]
        x.append(l)
        y.append(df.Risk[i])
    return x,y


X,y=PrepareData(student_df)


y[:5]


import numpy as np

X=np.array(X)
y=np.array(y)

from sklearn.preprocessing import StandardScaler

scaler=StandardScaler()
X_scaled=scaler.fit_transform(X)

type(X_scaled)

X_scaled[:3]
y.shape


# ### MODELS

from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC


X_train,X_test,y_train,y_test=train_test_split(X_scaled,y,test_size=0.2)


svm=SVC()
svm.fit(X_train,y_train)
svm.score(X_test,y_test)


# ### PERFORM K-FOLD CV

from sklearn.model_selection import KFold
kf=KFold(n_splits=3)



def Get_Score(model,X_train,X_test,y_train,y_test):
    model.fit(X_train,y_train)
    return model.score(X_test,y_test)


scores_rf=[]
scores_svm=[]

for train_index,test_index in kf.split(X_scaled):
    X_train,X_test,y_train,y_test=X[train_index],X[test_index],y[train_index],y[test_index]
    
    scores_rf.append(Get_Score(RandomForestClassifier(),X_train,X_test,y_train,y_test))
    scores_svm.append(Get_Score(SVC(),X_train,X_test,y_train,y_test))


print(f"Random Forest: Mean:- {sum(scores_rf)/len(scores_rf)}, Std:- {np.std(scores_rf)}")
print(f"SVM: Mean:- {sum(scores_svm)/len(scores_svm)}, Std:- {np.std(scores_svm)}")

# student_data=[[70000,90,90,90,90,90,90]]
# svm.predict(student_data)

def predict_scholarship(data):
    # Data is expected to be in the format [Household Income, Maths, Science, Geography, History, English, Sports]
    scaled_data = scaler.transform([data])
    prediction = svm.predict(scaled_data)
    return prediction[0]  # Return the predicted class (e.g., '1' for Risk, '0' for No Risk)

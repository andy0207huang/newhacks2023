import os.path

from datetime import datetime
from dateutil.parser import parse

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError



def createEvent(datas: list):

    SCOPES = ['https://www.googleapis.com/auth/calendar']

    creds = None
        # The file token.json stores the user's access and refresh tokens, and is
        # created automatically when the authorization flow completes for the first
        # time.
    if os.path.exists('token.json'):
            creds = Credentials.from_authorized_user_file('token.json', SCOPES)
        # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                'credentials.json', SCOPES)
            creds = flow.run_local_server(port=8000)
        # Save the credentials for the next run
        with open('token.json', 'w') as token:
            token.write(creds.to_json())

    service = build('calendar', 'v3', credentials=creds)

    months = {
        'Jan': 1,
        'Feb': 2,
        'Mar': 3,
        'Apr': 4,
        'May': 5,
        'Jun': 6,
        'Jul': 7,
        'Aug': 8,
        'Sep': 9,
        'Oct': 10,
        'Nov': 11,
        'Dec': 12
    }

    

    for data in datas:

        # startList = data['Starttime'].split(' ')
        
        # if len(startList[0]) > 2:
        #     startList[0] = startList[0][:3]

        
        # startMonth = months[startList[0]]

        # startDay = startList[1].replace(',', '').zfill(2)

        # startYear = startList[2]
        # endList = data['Deadline'].split(' ')

        

        # if len(endList[0]) > 2:
        #     endList[0] = endList[0][:3]

        # endMonth = months[endList[0]]

        # if endList[1].endswith('th'):

        #     endList[1] = endList[1].replace('th','')

        # elif endList[1].endswith('st'):
        #     endList[1] = endList[1].replace('st','')

        # if len(endList[1]) > 2:
        #     endList[1] = endList[1][:3]


        # endDay = endList[1].replace(',', '').zfill(2)

        # print(endDay)

        # endYear = endList[2]

        # startDate = f"{startYear}-{startMonth}-{startDay}"

        # endDate = f"{endYear}-{endMonth}-{endDay}"


        dateFormat = "%Y-%m-%d"

        startDate = parse(data['Starttime']).date()
        endDate = parse(data['Deadline']).date()
    
        event = {
            'summary': data['Task'],
            'description': data['Description'],
            'start':{
                'date': datetime.strftime(startDate, dateFormat)
            },
            'end':{
                'date': datetime.strftime(endDate, dateFormat)
            }
        }

        print(event)

        event = service.events().insert(calendarId='primary', body=event).execute()


if __name__ == "__main__":
    data = [{
        'Task': 'Test',
        'Description': 'Testing Test Code',
        'Status': 'Not Started',
        'Starttime': 'November 4, 2023',
        'Deadline': 'November 6, 2023'
    }]

    createEvent(data)
import os
import openai
import json
import ast


from dotenv import load_dotenv

load_dotenv('.env')

openai.api_key = os.environ.get("API_KEY")


def getTaskList(doc: str, start: str, end: str) -> list:
  """Turns the text of a assignment doc into a timeline of tasks for it

  Args:
      doc (str): text from the document
      start (str): start date
      end (str): end date

  Returns:
      (list): a list of sub tasks 
  """
  prompt = f"""
  Assuming the start date is {start}, and the final deadline is {end}, generate a general timeline with recommended deadlines for each task in the following text delimited by three backticks. Add a description and Not Started status for each task and output the whole thing as a JSON file. The format of the JSON should match the example delimited by three single quotation.
  '''
  {{
    'Task': 'task title',
    'Description': 'task description',
    'Status': 'Not Started',
    'Deadline': 'task deadline'
  }}
  '''
"""


  text = f"{prompt}\n```\n{doc}\n```"

  completion = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "user", "content": text}
    ],
    temperature=0
  )

  tasks =  completion.choices[0].message["content"]

  # tasks = tasks.replace("```", "").replace("\n", "").replace("\\", "").replace('json', '')

  # tasks = tasks[:tasks.rfind('}') + 1]
  tasks = [i+'}' for i in tasks.split("}")]

  tasks = tasks[:len(tasks)-1]

  taskList = []

  for task in tasks:

    task = ast.literal_eval(task)

    taskList.append(task)

  return taskList


if __name__ == "__main__":

  file = open('./test/test.txt', 'r', encoding="utf-8")

  tasks = getTaskList(file.read(), 'Nov. 4, 2023', 'Dec. 7, 2023')

  print(tasks)

  
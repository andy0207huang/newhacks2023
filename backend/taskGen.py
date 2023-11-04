import os
import openai
import json
import ast


from dotenv import load_dotenv

load_dotenv('.env')

openai.api_key = os.environ.get("API_KEY")


def getTaskList(doc, start, end):
  prompt = f"Assuming the start date is {start}, and the final deadline is {end}, generate a general timeline with recommended deadlines for each task in the following text delimited by three backticks. Add a description and Not Started status for each task and output the whole thing as a JSON file"


  text = f"{prompt}\n```\n{doc}\n```"

  completion = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "user", "content": text}
    ]
  )

  tasks =  completion.choices[0].message["content"]

  tasks = tasks.replace("```", "").replace("\n", "").replace("\\", "").replace('json', '')

  tasks = tasks[:tasks.rfind('}') + 1]

  tasks = ast.literal_eval(tasks)

  tasksJson = json.dumps(tasks, indent=4)

  return tasksJson


if __name__ == "__main__":

  file = open('./test/test.txt', 'r')

  tasks = getTaskList(file, 'Nov. 4, 2023', 'Dec. 7, 2023')

  print(tasks)

  

import redis
import os

from dotenv import load_dotenv

load_dotenv('backend/.env')

r = redis.Redis(
  host=os.environ.get("HOST"),
  port=os.environ.get("PORT"),
  password=os.environ.get("PSW"))


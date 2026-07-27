import os
import requests
from dotenv import load_dotenv

load_dotenv()

API_TOKEN = os.getenv("MONDAY_API_TOKEN")

URL = "https://api.monday.com/v2"

HEADERS = {
    "Authorization": API_TOKEN,
    "Content-Type": "application/json"
}

QUERY = """
{
  boards(ids: [5030220480, 5030220080]) {
    id
    name

    items_page(limit: 500) {
      items {
        id
        name

        column_values {
          text

          column {
            title
          }
        }
      }
    }
  }
}
"""


def get_monday_data():
    """
    Fetch latest data from Monday.com.
    """

    try:

        response = requests.post(
            URL,
            json={"query": QUERY},
            headers=HEADERS,
            timeout=30
        )

        response.raise_for_status()

        data = response.json()

        if "errors" in data:
            raise Exception(data["errors"])

        return data

    except requests.exceptions.Timeout:
        raise Exception("Monday API request timed out.")

    except requests.exceptions.RequestException as e:
        raise Exception(f"Monday API Error: {e}")
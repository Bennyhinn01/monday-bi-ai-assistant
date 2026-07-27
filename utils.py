def parse_monday_data(data):
    """
    Converts Monday.com API response into a list of dictionaries.
    """

    parsed_items = []

    boards = data.get("data", {}).get("boards", [])

    for board in boards:

        board_name = board.get("name", "")

        items = board.get("items_page", {}).get("items", [])

        for item in items:

            item_dict = {
                "Board": board_name,
                "Item Name": item.get("name", "")
            }

            for column in item.get("column_values", []):

                column_name = ""

                if column.get("column"):
                    column_name = column["column"].get("title", "")

                column_value = column.get("text", "")

                item_dict[column_name] = column_value

            parsed_items.append(item_dict)

    return parsed_items
import csv
import os
import math
import tsp

DATA_PATH = os.path.join(os.getcwd(), "Data", "DistanceMatrix.csv")
BAR_NAMES = [
    "Collingwood",
    "Grey",
    "Hatfield",
    "John Snow",
    "Josephine Butler",
    "St Aidan's",
    "St Chad's",
    "St Cuthbert's",
    "Stephenson",
    "St Hild & St Bede",
    "St John's",
    "St Mary's",
    "Trevelyan",
    "University",
    "Van Mildert"
]

NAMES = []
VALUES = []


def parse_csv():
    with open(DATA_PATH, 'r') as csv_file:
        spam_reader = csv.reader(csv_file, delimiter=',')
        for row_index, row in enumerate(spam_reader):
            if row_index == 0:
                continue

            this_row = []

            for index, item in enumerate(row):
                if index == 0:
                    NAMES.append(item)

                else:
                    if item == "99999":
                        # this_row.append(math.inf)
                        this_row.append(0)

                    else:
                        this_row.append(int(item))

            VALUES.append(this_row)


def solve_tsp():
    r = range(len(VALUES))
    dist = {(i, j): VALUES[i][j] for i in r for j in r}
    return tsp.tsp(r, dist)


def main():
    parse_csv()

    route = solve_tsp()
    route_time = route[0]

    print("Total Walking Time: {0} minutes\n".format(route_time))
    for bar in route[1]:
        print(NAMES[bar])


if __name__ == '__main__':
    main()

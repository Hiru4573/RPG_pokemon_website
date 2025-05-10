import os
import re

# Regular expression to extract numbers from filenames
number_pattern = re.compile(r'\b(\d{1,3})\b')

# Use the current directory
directory = os.getcwd()

# Set to store found numbers
found_numbers = set()

# Recursively walk through all files in the directory and its subdirectories
for root, _, files in os.walk(directory):
    for filename in files:
        match = number_pattern.findall(filename)
        for num_str in match:
            num = int(num_str)
            if 1 <= num <= 720:
                found_numbers.add(num)

# Identify and print missing numbers
expected_numbers = set(range(1, 721))
missing_numbers = sorted(expected_numbers - found_numbers)

print("Missing numbers:")
print(missing_numbers)

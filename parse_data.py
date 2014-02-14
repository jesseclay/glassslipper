import re
import sys
import collections
import json

def is_number(s):
    try:
        float(s)
        return True
    except ValueError:
        return False

if __name__ == '__main__':
	sizes_list = []
	sizes = []
	sizes_repo = collections.defaultdict(lambda: collections.defaultdict(lambda: []))

	csv_file = sys.argv[1]
	f = open(csv_file, 'r')
	for line in f:			# currently there is only one line
		data = re.findall("[^,]+", line)
		for elem in data:
			if elem.startswith('\r'):	# newline
				sizes_list.append(sizes)
				sizes = []
				currSize = float(elem.lstrip('\r'))
			elif is_number(elem):
				currSize = float(elem)
			else:
				sizes.append(elem + "," + str(currSize))

	for sizes in sizes_list:
		for size1 in sizes:
			for size2 in sizes:
				if size2 != size1:
					size2 = size2.split(',')
					sizes_repo[size1][size2[0]].append(size2[1])

	print json.dumps(sizes_repo)
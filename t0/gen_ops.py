import json
from pprint import pprint

with open('p.json') as data_file:
    data = json.load(data_file)

ops = set()

for d in data["plotdata"]:
    ops.add(d[0])

template = "function op_%s(data) {\nconsole.log(data);\n}\n"
mtemplate = "op_functions[\"{name}\"] = op_{name};\n"

for op in sorted(list(ops)):
    print template % op

for op in sorted(list(ops)):
    print mtemplate.format(name=op),

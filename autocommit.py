import os,time
t = time.strftime('%Y-%m-%d %H:%M:%S',time.localtime(time.time()))
res = os.popen('git status').readlines()
if res:
	for i in res:
		print i
print '^before--------------------------'
res = os.popen('git add *').readlines()
if res:
	for i in res:
		print i
print '^add--------------------------'
m = raw_input('please insert commit description:')
res = os.popen('git commit -m "auto:%s[%s]"' %(m,t)).readlines()
if res:
	for i in res:
		print i
print '^after--------------------------'
while 1:
	command = raw_input()
	if int(command) == 1:
		res = os.popen('git push origin').readlines()
		if res:
			for i in res:
				print i
	if command == 'exit':
		break
from flask import Flask, request
from flask.ext.pymongo import PyMongo
from auth import Auth

app = Flask(__name__)
mongo = PyMongo(app)

@app.route('/api/<api_string>/<api_key>', methods=['POST'])
def api(api_string, api_key):
	auth = Auth(api_string, api_key, mongo)
	if auth.isAuthenticated():
		api_call = json.loads(request.form['call'])

		if api_call['function'] == 'login':
			user = mongo.db.users.find_one_or_404({'username': api_call['username'], 'password': api_call['password']})
			return '{"error": "username or password incorrect"}'  if user == 404 else user
		elif api_call['function'] == 'signup':
			new_user = mongo.db.users.insert({'first_name': first_name, 'last_name': last_name, 'username': username, 'email': email, 'password': password})
			return '{"error": "falied to create new user"}' if new_user != 1 else new_user 
		elif api_call['function'] == 'forgot':
			return 'forgot'
		elif api_call['function'] == 'tickets':
			return 'tickets'
		else:
			return '{"error": "invalid function"}'
	else:
		return '{"error": "failed to authenticate api"}'


if __name__ == '__main__':
	app.run( 
	    host="0.0.0.0",
	    port=int("5000")
	)

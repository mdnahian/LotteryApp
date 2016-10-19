class Auth:	
	def __init__(self, api_string, api_key, mongo):
		self.auth = False

		auth_status = mongo.db.api.find_one_or_404({api_string: api_key})
		if auth_status != 404:
			self.auth = True

	def isAuthenticated(self):
		return self.auth

class Auth:	
	def __init__(self, api_string, api_key, mongo):
		self.apy_key = api_key
		self.api_string = api_string
		self.mongo = mongo
		self.auth = False

		auth_status = self.mongo.db.api.find_one_or_404({self.api_string: self.api_key})
		if auth_status != 404:
			self.auth = True

	def isAuthenticated(self):
		return self.auth
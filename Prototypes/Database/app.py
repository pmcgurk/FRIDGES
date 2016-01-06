from flask import Flask, render_template, send_from_directory
import datetime
from flaskext.mysql import MySQL
app = Flask(__name__)

mysql = MySQL()
app = Flask(__name__)
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = ''
app.config['MYSQL_DATABASE_DB'] = 'FRIDGES'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
mysql.init_app(app)

@app.route('/')
def mypisite(name=None):
	return render_template('/static/index.html')

@app.route('/SQL')
def SQL():
	cursor = mysql.connect().cursor()
	cursor.execute("SELECT * from Products")
	data = cursor.fetchone()
	if data is None:
		return "Logged in wrong"
	else:
		return str(data)

if __name__ == "__main__":

	app.run('0.0.0.0')

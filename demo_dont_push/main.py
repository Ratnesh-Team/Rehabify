import os
from flask import Flask, render_template, redirect, url_for, flash
from flask_login import LoginManager, login_user, login_required
from forms import UserRegistrationForm, NGORegistrationForm, NMKRegistrationForm, LoginForm
from models import User, NGO, NMK, db
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')
db.init_app(app=app)
login_manager = LoginManager()
login_manager.init_app(app)


@app.route('/',methods=['GET'])
@login_required
def withoutlogin():
    return "Please Login"

@login_manager.unauthorized_handler     
def unauthorized_callback():
       return redirect(url_for('login'))


@app.route('/home')
@login_required
def home():
    return "Welcome to Rehabify after login"

@app.route('/register/user', methods=['GET', 'POST'])
def register_user():
    form = UserRegistrationForm()
    if form.validate_on_submit():
        user = User(email=form.email.data)
        user.set_password(form.password.data)
        db.session.add(user)
        db.session.commit()
        return redirect(url_for('login'))
    return render_template('register_user.html', form=form)

@app.route('/register/ngo', methods=['GET', 'POST'])
def register_ngo():
    form = NGORegistrationForm()
    if form.validate_on_submit():
        ngo = NGO(email=form.email.data, ngo_name=form.ngo_name.data)
        ngo.set_password(form.password.data)
        db.session.add(ngo)
        db.session.commit()
        return redirect(url_for('login'))
    return render_template('register_ngo.html', form=form)

@app.route('/register/nmk', methods=['GET', 'POST'])
def register_nmk():
    form = NMKRegistrationForm()
    if form.validate_on_submit():
        nmk = NMK(email=form.email.data, nmk_name=form.nmk_name.data)
        nmk.set_password(form.password.data)
        db.session.add(nmk)
        db.session.commit()
        return redirect(url_for('login'))
    return render_template('register_nmk.html', form=form)

@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        if form.user_type.data == 'user':
            user = User.query.filter_by(email=form.email.data).first()
        elif form.user_type.data == 'ngo':
            user = NGO.query.filter_by(email=form.email.data).first()
        elif form.user_type.data == 'nmk':
            user = NMK.query.filter_by(email=form.email.data).first()
        if user and user.check_password(form.password.data):
            login_user(user)
            return redirect(url_for('home'))
        flash("Error logging in !!! Please check credentials","error")
    return render_template('login.html', form=form)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


if __name__=='__main__':
    with app.app_context():
        db.create_all()

    app.run(debug=True)
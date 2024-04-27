package models

type  SignIn  struct {
	Email    string `json:"Email" bson:"Email"`
	Password string `json:"Password" bson:"Password"`
}

type SignInResponse struct {
	Token     string   `json:"token"`
	User      UserInfo `json:"user"`
}

type UserInfo struct {
	Avatar   string `json:"avatar"`
	Email    string `json:"email"`
	UserName string `json:"userName"`
	Authority []string `json:"authority"`
}
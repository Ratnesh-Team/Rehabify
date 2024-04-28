package models

type Homeremedies struct {
	ID       int    `bson:"id,omitempty"`
	Category string `bson:"category,omitempty"`
	Title    string `bson:"title,omitempty"`
	Content  string `bson:"content,omitempty"`
	Body     string `json:"body" bson:"body"`
	Image    string `bson:"image,omitempty"`
	Author   string `bson:"author,omitempty"`
	Date     string `bson:"date,omitempty"`
}

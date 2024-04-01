package repository

import (
	"context"
	"errors"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type MongoRepository interface {
	FindOne(filter primitive.M) *mongo.SingleResult
	InsertOne(document interface{}) (interface{}, error)
	DeleteMany(filter primitive.M)
	UpdateOne(filter primitive.M, update primitive.M, updateOptions *options.UpdateOptions) error
	Find(filter primitive.M) (*mongo.Cursor, error)
}
type MongoUserRepository struct {
	Collection *mongo.Collection
}

func (m *MongoUserRepository) FindOne(filter primitive.M) *mongo.SingleResult {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	result := m.Collection.FindOne(ctx, filter)
	return result
}

func (m *MongoUserRepository) InsertOne(document interface{}) (interface{}, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	id, err := m.Collection.InsertOne(ctx, document)
	if err != nil {
		log.Printf("Error inserting document %v", err)
		return nil, errors.New("error inserting document ")
	}
	return id.InsertedID, nil
}

func (m *MongoUserRepository) DeleteMany(filter primitive.M) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	m.Collection.DeleteMany(ctx, filter)
}

func (m *MongoUserRepository) UpdateOne(filter primitive.M, update primitive.M, updateOptions *options.UpdateOptions) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	_, err := m.Collection.UpdateOne(ctx, filter, update, updateOptions)
	if err != nil {
		log.Printf("Error updating document")
		return errors.New("error updating document")
	}
	return nil
}

func (m *MongoUserRepository) Find(filter primitive.M) (*mongo.Cursor, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	result, err := m.Collection.Find(ctx, filter)
	if err != nil {
		return nil, err
	}
	return result, nil
}

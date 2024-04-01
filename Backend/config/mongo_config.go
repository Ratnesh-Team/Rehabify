// ConnecpalMongotDB function is used to instantiate MongoDB Connection
package config

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/Ratnesh-Team/Rehabify/repository"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func ConnectMongoDB() {

	mongoURI := os.Getenv("MONGOURI")
	client, err := mongo.NewClient(options.Client().ApplyURI(mongoURI))

	if err != nil {
		log.Fatal(err)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	err = client.Connect(ctx)
	if err != nil {
		log.Fatal(err)
	}

	//ping the database
	err = client.Ping(ctx, nil)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Connected to MongoDB")
	MongoDB = client
}

// GetCollection function helps in getting database collections
func GetCollection(client *mongo.Client, collectionName string) *mongo.Collection {
	collection := client.Database("Initializ").Collection(collectionName)
	return collection
}
func GetRepoCollection(collectionName string) repository.MongoRepository {
	repo := repository.MongoUserRepository{
		Collection: GetCollection(MongoDB, collectionName),
	}
	return &repo
}

// MongoDB Client instance
var MongoDB *mongo.Client

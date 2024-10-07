package repository

import (
	"context"
	"log"

	project "github.com/Ratnesh-Team/Rehabify/projects"
	"github.com/google/uuid"
)

type PostgresUserRepository struct {
	Queries *project.Queries
}

func NewPostgresUserRepository(queries *project.Queries) *PostgresUserRepository {
	return &PostgresUserRepository{
		Queries: queries,
	}
}

// CreateUser creates a new user in the database
func (repo *PostgresUserRepository) CreateUser(ctx context.Context, user project.CreateUserParams) (project.User, error) {
	createdUser, err := repo.Queries.CreateUser(ctx, user)
	if err != nil {
		log.Println("Error creating user:", err)
		return project.User{}, err
	}
	return createdUser, nil
}

// GetUser retrieves a user by ID
func (repo *PostgresUserRepository) GetUser(ctx context.Context, id uuid.UUID) (project.User, error) {
	user, err := repo.Queries.GetUser(ctx, id)
	if err != nil {
		log.Println("Error retrieving user:", err)
		return project.User{}, err
	}
	return user, nil
}

// DeleteUser removes a user by ID
func (repo *PostgresUserRepository) DeleteUser(ctx context.Context, id uuid.UUID) error {
	err := repo.Queries.DeleteUser(ctx, id)
	if err != nil {
		log.Println("Error deleting user:", err)
		return err
	}
	return nil
}

// ListUsers lists all users in the database
func (repo *PostgresUserRepository) ListUsers(ctx context.Context) ([]project.User, error) {
	users, err := repo.Queries.ListUsers(ctx)
	if err != nil {
		log.Println("Error listing users:", err)
		return nil, err
	}
	return users, nil
}

// UpdateUser updates a user in the database
func (repo *PostgresUserRepository) UpdateUser(ctx context.Context, user project.UpdateUserParams) error {
	err := repo.Queries.UpdateUser(ctx, user)
	if err != nil {
		log.Println("Error updating user:", err)
		return err
	}
	return nil
}

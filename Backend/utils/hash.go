package utils

import (
	"crypto/sha256"
	"encoding/hex"
)

func Hash(data string, salt string) string {
	hasher := sha256.New()
	hasher.Write([]byte(data + salt))
	hashString := hex.EncodeToString(hasher.Sum(nil))
	return hashString
}
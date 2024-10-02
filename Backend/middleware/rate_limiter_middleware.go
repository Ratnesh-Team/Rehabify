package middleware

import (
	"sync"

	"github.com/gin-gonic/gin"
)

// map for monitering number of request.
var limiterMap map[string]chan struct{}
var mu sync.Mutex // ensures that rate limiter is thread safe.

// Limits number of request by specific ip address at a time.
func RateLimiterMiddlware() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		if limiterMap == nil {
			limiterMap = make(map[string]chan struct{})
		}
		clientIP := ctx.ClientIP()
		mu.Lock()
		if _, ok := limiterMap[clientIP]; !ok {
			// 20 will be the limit a client and sent request at a time.
			limiterMap[clientIP] = make(chan struct{}, 20)
		}
		mu.Unlock()
		// feed the chan with empty struct representing a req
		limiterMap[clientIP] <- struct{}{}
		defer func() {
			<-limiterMap[clientIP]
		}()
		// now execute the next handler in chain.
		ctx.Next()
	}
}

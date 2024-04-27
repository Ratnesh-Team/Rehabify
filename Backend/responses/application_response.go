package responses

// ApplicationResponse Model
type ApplicationResponse struct {
	Status  any         `json:"status"`
	Message string      `json:"message"`
	Data    interface{} `json:"data,omitempty"`
}

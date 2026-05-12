package entities

type Ticket struct {
	ID          int    `json:"id"`
	UserID      int    `json:"user_id"`

	Exhibition  string `json:"exhibition"`
	Museum      string `json:"museum"`

	Title       string `json:"title"`
	Place       string `json:"place"`

	Date        string `json:"date"`
	Time        string `json:"time"`

	Count       int    `json:"count"`
	Price       int    `json:"price"`

	Status      string `json:"status"`

	UserEmail   string `json:"userEmail"`
	Name        string `json:"name"`
}